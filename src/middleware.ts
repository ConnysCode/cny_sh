import { startsWith } from 'lodash';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { ErrorMessage } from './utils/api-messages/api-message-enums';
import connectMongo from './utils/connect-mongo';

export async function middleware(req: NextRequest) {
  if (startsWith(req.nextUrl.pathname, `/api`)) {
    try {
      await connectMongo();
      return NextResponse.next();
    } catch (error) {
      return NextResponse.json({
        message: ErrorMessage.unknown_error,
        success: false,
      });
    }
  }
  return NextResponse.next();
}
