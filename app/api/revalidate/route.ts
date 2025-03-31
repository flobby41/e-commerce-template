import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path') || '/';
  revalidatePath(path);
  return Response.json({ revalidated: true, now: Date.now() });
}
