import { NextResponse } from 'next/server';
import { mockUsers } from '@/lib/mock-users';

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'กรุณากรอก Username และ Password' },
        { status: 400 }
      );
    }

    // Simulate slight delay like real API
    await new Promise((res) => setTimeout(res, 600));

    const user = mockUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Username หรือ Password ไม่ถูกต้อง' },
        { status: 401 }
      );
    }

    const { password: _pw, ...safeUser } = user;

    return NextResponse.json({
      success: true,
      message: 'เข้าสู่ระบบสำเร็จ',
      user: safeUser,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'เกิดข้อผิดพลาดในระบบ' },
      { status: 500 }
    );
  }
}
