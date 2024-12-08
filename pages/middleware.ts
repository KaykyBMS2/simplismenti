import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Rotas públicas que não exigem autenticação
const isPublicRoute = createRouteMatcher(['/auth/sign-in(.*)', '/auth/sign-up(.*)']);

export default clerkMiddleware((req) => {
  if (isPublicRoute(req)) {
    return;
  }
  // Rotas protegidas serão automaticamente gerenciadas pelo middleware
});

export const config = {
  matcher: [
    '/((?!_next|.*\\.(?:js|css|json|png|jpg|jpeg|gif|ico|woff|woff2|ttf|eot|svg)).*)',
    '/(api|trpc)(.*)',
  ],
};