// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {
  getUserByIdController,
  updateUserController,
  deleteUserController,
} from '@/backend/controllers/auth.controller';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getUserByIdController(params.id);
    if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(user);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const updated = await updateUserController(params.id, body);
    return NextResponse.json(updated);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deleted = await deleteUserController(params.id);
    return NextResponse.json(deleted);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
