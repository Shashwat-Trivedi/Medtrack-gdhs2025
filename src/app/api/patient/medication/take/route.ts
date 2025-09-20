// app/api/patient/medications/take/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { connectDB } from '@/lib/db';
import { DailyLog } from '@/models/DailyLog';
const SECRET = new TextEncoder().encode('dsjfbdshgfadskjgfkjadgsfgakjgehjbjsdbgafgeibasdbfjagyu4gkjb');
function ymd(d: Date){ return d.toISOString().slice(0,10); }
async function uid(){ const t=cookies().get('auth')?.value; if(!t) return null; try{const {payload}=await jwtVerify(t,SECRET); return String(payload.sub||'');}catch{return null;} }

export async function POST(req: NextRequest) {
  await connectDB();
  const id = await uid();
  if (!id) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  const { name } = await req.json();
  const key = ymd(new Date());
  await DailyLog.updateOne(
    { patient: id, date: key },
    { $setOnInsert: { patient: id, date: key }, $addToSet: { medicationsTaken: name } },
    { upsert: true }
  );
  return NextResponse.json({ ok: true }, { status: 201 });
}
