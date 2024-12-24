import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const orderItems = await prisma.orderitems.findMany(); // Fetch data
    return new Response(JSON.stringify(orderItems), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to fetch order items' }), { status: 500 });
  }
}
