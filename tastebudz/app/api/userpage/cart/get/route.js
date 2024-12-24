import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 });
  }

  try {
    const cart = await prisma.cart.findFirst({
      where: { userId: parseInt(userId) },
      include: {
        cartItems: {
          include: { item: true }, // Include item details
        },
      },
    });

    if (!cart) {
      return new Response(JSON.stringify([]), { status: 200 });
    }

    const cartItems = cart.cartItems.map((cartItem) => ({
      id: cartItem.id,
      name: cartItem.item.name,
      price: cartItem.item.price,
      quantity: cartItem.quantity,
      extras: cartItem.extras,
    }));

    return new Response(JSON.stringify(cartItems), { status: 200 });
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch cart items' }),
      { status: 500 }
    );
  }
}
