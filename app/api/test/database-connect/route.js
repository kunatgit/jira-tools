// app/api/test/database-connect/route.js
import { neon } from '@neondatabase/serverless';

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL);

    // ใช้ .query() กับ SELECT 1 แทนการ query table จริง
    const result = await sql.query('SELECT 1');

    return new Response(JSON.stringify({
      status: 'OK',
      message: 'DB connected',
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({
      status: 'FAIL',
      error: err.message
    }), { status: 500 });
  }
}