import { db } from '@/lib/db';
import { feedback } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';
export const revalidate = 60;

export async function GET() {
  const fbs = await db
    .select()
    .from(feedback)
    .orderBy(desc(feedback.createdAt));
  return Response.json(fbs);
}

export async function POST(request: Request) {
  const { email, content } = await request.json();
  const fb = await db.insert(feedback).values({ email, content });
  return Response.json(fb);
}
