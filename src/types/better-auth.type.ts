// types/auth.ts
import { auth } from "@/lib/auth";

export type BetterAuthSession = NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>>;
export type BetterAuthUser = BetterAuthSession['user'];