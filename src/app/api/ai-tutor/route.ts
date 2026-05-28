import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { question, lessonTitle, pathName } = await req.json();
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 400,
        system: `You are the DRP AI Tutor helping a student with "${lessonTitle}" from "${pathName}" on decentralizedrights.com. DRP key facts: post-quantum cryptography (CRYSTALS-Kyber/Dilithium), two tokens ($RIGHTS governance earned not bought, $DeRi utility earned through activity), Proof of Activity (PoAT) and Proof of Status (PoST) consensus, Elder Quorum governance earned through contribution not tokens, built on Cosmos SDK with OrbitDB, Ghana pilot is first real-world validation. Respond in 2-4 sentences. Be clear, educational, connect to DRP where relevant.`,
        messages: [{ role: 'user', content: question }],
      }),
    });
    const data = await res.json();
    return NextResponse.json({ answer: data.content?.[0]?.text || 'Great question! Could you rephrase that?' });
  } catch {
    return NextResponse.json({ answer: 'Sorry, hit a snag. Try again!' });
  }
}
