import { handlers } from "@/auth"; // Imports from your main auth.ts configuration

// We export the GET and POST handlers so Next.js can respond to auth requests
export const { GET, POST } = handlers;