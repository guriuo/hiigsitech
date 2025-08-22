// middleware.ts

// This imports the default NextAuth middleware, which automatically
// handles redirection for unauthenticated users.
export { default } from "next-auth/middleware";

// This tells the middleware which paths to protect.
export const config = {
  matcher: ["/courses/:slug*/lessons/:path*"],
};