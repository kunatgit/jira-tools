import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

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

    // Simulate slight delay
    await new Promise((res) => setTimeout(res, 600));

    const database = neon(process.env.DATABASE_URL);
    const result = await database.query(
      'SELECT * FROM users WHERE username = $1 LIMIT 1',
      [username]
    );

    if (result.length === 0) {
      console.log('No user found with username:', username);
      return NextResponse.json(
        { success: false, message: 'Username หรือ Password ไม่ถูกต้อง' },
        { status: 401 }
      );
    }

    const userDB = result[0];

    // ✅ ใช้ password ที่ user กรอกเทียบกับ hash ใน DB โดยตรง
    const isValid = await bcrypt.compare(password, userDB?.password || '');
    console.log('DB query result:', userDB);
    console.log('Password valid:', isValid);

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: 'Username หรือ Password ไม่ถูกต้อง' },
        { status: 401 }
      );
    }

    const user = {
      username: userDB.username,
      firstname: userDB.firstname,
      lastname: userDB.lastname,
      role: userDB.role,
      email: userDB.email,
      avatar: userDB.avatar,
      position: userDB.position,
      created_at: userDB.created_timestamp,
      updated_at: userDB.updated_timestamp,
    };

    return NextResponse.json({
      success: true,
      message: 'เข้าสู่ระบบสำเร็จ',
      user: user,
    });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json(
      { success: false, message: 'เกิดข้อผิดพลาดในระบบ' },
      { status: 500 }
    );
  }
}