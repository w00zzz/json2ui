// app/api/users/change-password/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { changePasswordController } from '@/backend/controllers/auth.controller';

export async function PATCH(request: NextRequest) {
  try {
    const { userId, currentPassword, newPassword } = await request.json();

    if (!userId || !currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const result = await changePasswordController(userId, currentPassword, newPassword);
    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
