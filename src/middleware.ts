import { NextRequest, NextResponse } from "next/server";

const publicPaths = ['/sign-in', '/sign-up', '/api/auth'];

export function middleware(request: NextRequest) {
    console.log("Middleware exécuté pour :", request.nextUrl.pathname);
    const isAuthenticated = request.cookies.get("access_token");
    console.log(isAuthenticated, "isAuthenticated")

    const path = request.nextUrl.pathname;

    const isPublicPath = publicPaths.some(publicPath => path.startsWith(publicPath));

    if (!isAuthenticated && !isPublicPath) {

        const signInUrl = new URL('/sign-in', request.url);
        signInUrl.searchParams.set('callbackUrl', path);
        return NextResponse.redirect(signInUrl);
    }

    if (isAuthenticated && isPublicPath && path !== '/auth') {
        // Rediriger vers la page d'accueil ou le tableau de bord
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // '/((?!_next/static|_next/image|favicon.ico|images|public).*)',
        '/dashboard/:path'
    ],
};
