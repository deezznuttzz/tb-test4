import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const secid = searchParams.get('secid');

  try {
    const user = await prisma.bussiness.findFirst({
        where: {
          id: parseInt(userId),
          secid,
        },
      });
      

    if (user) {
      return new Response(
        JSON.stringify({ valid: true }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ valid: false }),
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