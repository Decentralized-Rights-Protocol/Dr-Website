from fastapi import FastAPI, HTTPException, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import sqlite3
import json
import os
from datetime import datetime, timedelta
import hashlib
import uuid

# Database setup
DB_PATH = os.getenv("LEARN_DB_PATH", "learn_progress.db")

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Users table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            wallet_address TEXT UNIQUE,
            username TEXT,
            level INTEGER DEFAULT 1,
            total_rewards INTEGER DEFAULT 0,
            streak INTEGER DEFAULT 0,
            last_activity DATE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    # Lessons table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS lessons (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT,
            content TEXT,
            duration INTEGER,
            reward INTEGER,
            level INTEGER,
            module TEXT,
            quiz_data TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    # User progress table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS user_progress (
            id TEXT PRIMARY KEY,
            user_id TEXT,
            lesson_id TEXT,
            completed BOOLEAN DEFAULT FALSE,
            score REAL,
            time_spent INTEGER,
            answers TEXT,
            completed_at TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id),
            FOREIGN KEY (lesson_id) REFERENCES lessons (id)
        )
    """)
    
    # Achievements table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS achievements (
            id TEXT PRIMARY KEY,
            user_id TEXT,
            achievement_type TEXT,
            title TEXT,
            description TEXT,
            earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    """)
    
    # Leaderboard view
    cursor.execute("""
        CREATE VIEW IF NOT EXISTS leaderboard AS
        SELECT 
            u.id,
            u.username,
            u.wallet_address,
            u.level,
            COUNT(up.lesson_id) as lessons_completed,
            u.total_rewards,
            u.streak,
            MAX(up.completed_at) as last_completion
        FROM users u
        LEFT JOIN user_progress up ON u.id = up.user_id AND up.completed = TRUE
        GROUP BY u.id
        ORDER BY lessons_completed DESC, u.total_rewards DESC
    """)
    
    conn.commit()
    conn.close()

# Initialize database
init_db()

app = FastAPI(title="DRP Learn-to-Earn API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class UserCreate(BaseModel):
    wallet_address: str
    username: str

class LessonResponse(BaseModel):
    id: str
    title: str
    description: str
    content: str
    duration: int
    reward: int
    level: int
    module: str
    quiz_data: Dict[str, Any]

class QuizSubmission(BaseModel):
    lesson_id: str
    answers: Dict[str, int]
    time_spent: int

class UserProgress(BaseModel):
    user_id: str
    total_lessons: int
    completed_lessons: int
    total_rewards: int
    current_level: int
    streak: int
    achievements: List[Dict[str, Any]]

class LeaderboardEntry(BaseModel):
    rank: int
    username: str
    level: int
    lessons_completed: int
    total_rewards: int
    streak: int

# Helper functions
def get_user_id_from_wallet(wallet_address: str) -> Optional[str]:
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM users WHERE wallet_address = ?", (wallet_address,))
    result = cursor.fetchone()
    conn.close()
    return result["id"] if result else None

def update_user_streak(user_id: str):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Get last activity
    cursor.execute("SELECT last_activity FROM users WHERE id = ?", (user_id,))
    result = cursor.fetchone()
    
    if result and result["last_activity"]:
        last_activity = datetime.fromisoformat(result["last_activity"])
        today = datetime.now().date()
        yesterday = today - timedelta(days=1)
        
        if last_activity.date() == yesterday:
            # Continue streak
            cursor.execute("UPDATE users SET streak = streak + 1, last_activity = ? WHERE id = ?", 
                         (today.isoformat(), user_id))
        elif last_activity.date() == today:
            # Already updated today
            pass
        else:
            # Reset streak
            cursor.execute("UPDATE users SET streak = 1, last_activity = ? WHERE id = ?", 
                         (today.isoformat(), user_id))
    else:
        # First activity
        cursor.execute("UPDATE users SET streak = 1, last_activity = ? WHERE id = ?", 
                     (datetime.now().date().isoformat(), user_id))
    
    conn.commit()
    conn.close()

# API Endpoints
@app.get("/")
async def root():
    return {"message": "DRP Learn-to-Earn API", "version": "1.0.0"}

@app.post("/users/register")
async def register_user(user_data: UserCreate):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Check if user already exists
    cursor.execute("SELECT id FROM users WHERE wallet_address = ?", (user_data.wallet_address,))
    if cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=400, detail="User already exists")
    
    user_id = str(uuid.uuid4())
    cursor.execute("""
        INSERT INTO users (id, wallet_address, username)
        VALUES (?, ?, ?)
    """, (user_id, user_data.wallet_address, user_data.username))
    
    conn.commit()
    conn.close()
    
    return {"user_id": user_id, "message": "User registered successfully"}

@app.get("/lessons")
async def get_lessons(level: Optional[int] = Query(None)):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    if level:
        cursor.execute("SELECT * FROM lessons WHERE level = ? ORDER BY module", (level,))
    else:
        cursor.execute("SELECT * FROM lessons ORDER BY level, module")
    
    lessons = cursor.fetchall()
    conn.close()
    
    return [
        {
            "id": lesson["id"],
            "title": lesson["title"],
            "description": lesson["description"],
            "content": lesson["content"],
            "duration": lesson["duration"],
            "reward": lesson["reward"],
            "level": lesson["level"],
            "module": lesson["module"],
            "quiz_data": json.loads(lesson["quiz_data"]) if lesson["quiz_data"] else {}
        }
        for lesson in lessons
    ]

@app.get("/lessons/{lesson_id}")
async def get_lesson(lesson_id: str):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM lessons WHERE id = ?", (lesson_id,))
    lesson = cursor.fetchone()
    
    if not lesson:
        conn.close()
        raise HTTPException(status_code=404, detail="Lesson not found")
    
    conn.close()
    
    return {
        "id": lesson["id"],
        "title": lesson["title"],
        "description": lesson["description"],
        "content": lesson["content"],
        "duration": lesson["duration"],
        "reward": lesson["reward"],
        "level": lesson["level"],
        "module": lesson["module"],
        "quiz_data": json.loads(lesson["quiz_data"]) if lesson["quiz_data"] else {}
    }

@app.post("/quiz/submit")
async def submit_quiz(submission: QuizSubmission, wallet_address: str = Query(...)):
    user_id = get_user_id_from_wallet(wallet_address)
    if not user_id:
        raise HTTPException(status_code=404, detail="User not found")
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Get lesson and quiz data
    cursor.execute("SELECT * FROM lessons WHERE id = ?", (submission.lesson_id,))
    lesson = cursor.fetchone()
    
    if not lesson:
        conn.close()
        raise HTTPException(status_code=404, detail="Lesson not found")
    
    quiz_data = json.loads(lesson["quiz_data"])
    questions = quiz_data.get("questions", [])
    
    # Calculate score
    correct_answers = 0
    for question in questions:
        question_id = question["id"]
        correct_answer = question["correct"]
        user_answer = submission.answers.get(question_id)
        
        if user_answer == correct_answer:
            correct_answers += 1
    
    score = (correct_answers / len(questions)) * 100 if questions else 0
    passed = score >= 70  # 70% passing grade
    
    # Save progress
    progress_id = str(uuid.uuid4())
    cursor.execute("""
        INSERT INTO user_progress (id, user_id, lesson_id, completed, score, time_spent, answers, completed_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        progress_id, user_id, submission.lesson_id, passed, score, 
        submission.time_spent, json.dumps(submission.answers), 
        datetime.now().isoformat()
    ))
    
    # Update user rewards and level if passed
    if passed:
        cursor.execute("UPDATE users SET total_rewards = total_rewards + ? WHERE id = ?", 
                     (lesson["reward"], user_id))
        update_user_streak(user_id)
        
        # Check for level up
        cursor.execute("SELECT COUNT(*) as completed FROM user_progress WHERE user_id = ? AND completed = TRUE", (user_id,))
        completed_count = cursor.fetchone()["completed"]
        new_level = min(5, (completed_count // 4) + 1)  # 4 lessons per level
        
        cursor.execute("UPDATE users SET level = ? WHERE id = ?", (new_level, user_id))
    
    conn.commit()
    conn.close()
    
    return {
        "score": score,
        "passed": passed,
        "reward": lesson["reward"] if passed else 0,
        "message": "Quiz submitted successfully" if passed else "Quiz failed. Try again!"
    }

@app.get("/progress/{wallet_address}")
async def get_user_progress(wallet_address: str):
    user_id = get_user_id_from_wallet(wallet_address)
    if not user_id:
        raise HTTPException(status_code=404, detail="User not found")
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Get user stats
    cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
    user = cursor.fetchone()
    
    # Get completed lessons count
    cursor.execute("SELECT COUNT(*) as completed FROM user_progress WHERE user_id = ? AND completed = TRUE", (user_id,))
    completed_count = cursor.fetchone()["completed"]
    
    # Get total lessons count
    cursor.execute("SELECT COUNT(*) as total FROM lessons")
    total_lessons = cursor.fetchone()["total"]
    
    # Get achievements
    cursor.execute("SELECT * FROM achievements WHERE user_id = ?", (user_id,))
    achievements = cursor.fetchall()
    
    conn.close()
    
    return {
        "user_id": user_id,
        "total_lessons": total_lessons,
        "completed_lessons": completed_count,
        "total_rewards": user["total_rewards"],
        "current_level": user["level"],
        "streak": user["streak"],
        "achievements": [
            {
                "id": ach["id"],
                "type": ach["achievement_type"],
                "title": ach["title"],
                "description": ach["description"],
                "earned_at": ach["earned_at"]
            }
            for ach in achievements
        ]
    }

@app.get("/leaderboard")
async def get_leaderboard(limit: int = Query(50, le=100)):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("""
        SELECT * FROM leaderboard 
        ORDER BY lessons_completed DESC, total_rewards DESC 
        LIMIT ?
    """, (limit,))
    
    entries = cursor.fetchall()
    conn.close()
    
    return [
        {
            "rank": idx + 1,
            "username": entry["username"],
            "level": entry["level"],
            "lessons_completed": entry["lessons_completed"],
            "total_rewards": entry["total_rewards"],
            "streak": entry["streak"]
        }
        for idx, entry in enumerate(entries)
    ]

@app.get("/achievements/{wallet_address}")
async def get_user_achievements(wallet_address: str):
    user_id = get_user_id_from_wallet(wallet_address)
    if not user_id:
        raise HTTPException(status_code=404, detail="User not found")
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM achievements WHERE user_id = ? ORDER BY earned_at DESC", (user_id,))
    achievements = cursor.fetchall()
    
    conn.close()
    
    return [
        {
            "id": ach["id"],
            "type": ach["achievement_type"],
            "title": ach["title"],
            "description": ach["description"],
            "earned_at": ach["earned_at"]
        }
        for ach in achievements
    ]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
