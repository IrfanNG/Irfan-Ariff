import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder',
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
                    supabaseResponse = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // Only call getUser() for admin or login routes to avoid unnecessary overhead on public pages
    if (request.nextUrl.pathname.startsWith('/admin') || request.nextUrl.pathname.startsWith('/login')) {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        // Protect the admin route
        if (request.nextUrl.pathname.startsWith('/admin')) {
            if (!user) {
                const url = request.nextUrl.clone()
                url.pathname = '/login'
                return NextResponse.redirect(url)
            }

            if (process.env.ADMIN_EMAIL && user.email !== process.env.ADMIN_EMAIL) {
                const url = request.nextUrl.clone()
                url.pathname = '/login'
                return NextResponse.redirect(url)
            }
        }

        // Redirect logged-in users away from login page
        if (request.nextUrl.pathname.startsWith('/login')) {
            if (user) {
                const url = request.nextUrl.clone()
                url.pathname = '/admin'
                return NextResponse.redirect(url)
            }
        }
    }

    return supabaseResponse;
}
