// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {
  createUserController,
  getAllUsersController,
} from '@/backend/controllers/auth.controller';

export async function POST(request: NextRequest) {
  try {
    const { email, username, password, role } = await request.json();

    if (!email || !username || !password) {
      return NextResponse.json({ error: 'Faltan campos' }, { status: 400 });
    }

    const user = await createUserController(email, username, password, role);
    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const users = await getAllUsersController();
    return NextResponse.json(users);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
