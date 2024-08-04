import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match only request paths starting with:
     * - /profile
     * - /create
     */
    '/profile/:path*',
    '/create/:path*',
  ],
}