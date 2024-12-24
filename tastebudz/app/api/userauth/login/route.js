import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    const user = await prisma.user.findFirst({
        where: { email, password },
      });
      
      if (user) {
        return new Response(
          JSON.stringify({ userId: user.id, secid: user.secid }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }

    return new Response(
      JSON.stringify({ error: 'Invalid credentials' }),
      { status: 401 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}