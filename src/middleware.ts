import { startsWith } from 'lodash';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  console.log(`hello 1`, req.nextUrl.pathname);
  if (startsWith(req.nextUrl.pathname, `/api`)) {
    console.log(`hello 2`);
    return NextResponse.next();
  }
  console.log(`hello 3`);
  return NextResponse.redirect(new URL('/home', req.url));
}
