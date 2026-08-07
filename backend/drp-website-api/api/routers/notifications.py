"""
Notifications Routes - Handle notifications for verified/rejected activities and governance updates.
"""

import logging
from typing import List, Optional
from datetime import datetime
from uuid import uuid4
from fastapi import APIRouter, HTTPException, Depends, Request, WebSocket
from pydantic import BaseModel, Field

logger = logging.getLogger(__name__)

router = APIRouter()


# Pydantic Models
class Notification(BaseModel):
    """Notification model."""
    notification_id: str
    user_address: str
    type: str = Field(..., description="activity_verified, activity_rejected, proposal_created, vote_required, etc.")
    title: str
    message: str
    read: bool = False
    timestamp: str
    metadata: Optional[dict] = None


class NotificationSettings(BaseModel):
    """Notification settings for a user."""
    user_address: str
    email_enabled: bool = True
    push_enabled: bool = True
    activity_notifications: bool = True
    governance_notifications: bool = True


@router.get("/{user_address}", response_model=List[Notification])
async def get_notifications(
    user_address: str,
    unread_only: bool = False,
    limit: int = 50
):
    """
    Get notifications for a user.
    
    - **user_address**: User's wallet address
    - **unread_only**: Only return unread notifications
    - **limit**: Maximum number of notifications to return
    """
    try:
        # In production, this would query a database
        # For now, return mock data
        notifications = []
        
        # Add example notifications
        notifications.append(Notification(
            notification_id=str(uuid4()),
            user_address=user_address,
            type="activity_verified",
            title="Activity Verified",
            message="Your activity submission has been verified and you've received 50 DERI tokens.",
            read=False,
            timestamp=datetime.utcnow().isoformat(),
            metadata={"submission_id": "123", "reward_amount": 50}
        ))
        
        if unread_only:
            notifications = [n for n in notifications if not n.read]
        
        return notifications[:limit]
    except Exception as e:
        logger.error(f"Error fetching notifications: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch notifications: {str(e)}")


@router.post("/{notification_id}/read")
async def mark_notification_read(notification_id: str):
    """Mark a notification as read."""
    try:
        # In production, update database
        return {"success": True, "message": "Notification marked as read"}
    except Exception as e:
        logger.error(f"Error marking notification as read: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to update notification: {str(e)}")


@router.delete("/{notification_id}")
async def delete_notification(notification_id: str):
    """Delete a notification."""
    try:
        # In production, delete from database
        return {"success": True, "message": "Notification deleted"}
    except Exception as e:
        logger.error(f"Error deleting notification: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to delete notification: {str(e)}")


@router.get("/{user_address}/settings", response_model=NotificationSettings)
async def get_notification_settings(user_address: str):
    """Get notification settings for a user."""
    try:
        # In production, fetch from database
        return NotificationSettings(
            user_address=user_address,
            email_enabled=True,
            push_enabled=True,
            activity_notifications=True,
            governance_notifications=True
        )
    except Exception as e:
        logger.error(f"Error fetching notification settings: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch settings: {str(e)}")


@router.post("/{user_address}/settings", response_model=NotificationSettings)
async def update_notification_settings(
    user_address: str,
    settings: NotificationSettings
):
    """Update notification settings for a user."""
    try:
        # In production, update database
        return settings
    except Exception as e:
        logger.error(f"Error updating notification settings: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to update settings: {str(e)}")


@router.websocket("/ws/{user_address}")
async def websocket_notifications(websocket: WebSocket, user_address: str):
    """WebSocket endpoint for real-time notifications."""
    await websocket.accept()
    
    try:
        while True:
            # In production, this would push notifications from a message queue
            # For now, just keep connection alive
            data = await websocket.receive_text()
            await websocket.send_json({"message": "pong"})
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
        await websocket.close()


