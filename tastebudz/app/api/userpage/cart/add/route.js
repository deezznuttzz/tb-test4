import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    // Parse the incoming request body
    const body = await req.json();
    const { userId, itemId, quantity } = body;

    // Validate the input data
    if (!userId || !itemId || quantity === undefined) {
      return new Response(
        JSON.stringify({ error: 'User ID, Item ID, and quantity are required' }),
        { status: 400 }
      );
    }

    // Ensure the IDs and quantity are numbers
    const parsedUserId = parseInt(userId);
    const parsedItemId = parseInt(itemId);
    const parsedQuantity = parseInt(quantity);

    if (isNaN(parsedUserId) || isNaN(parsedItemId) || isNaN(parsedQuantity)) {
      return new Response(
        JSON.stringify({ error: 'User ID, Item ID, and quantity must be valid numbers' }),
        { status: 400 }
      );
    }

    // Find or create a cart for the user
    let cart = await prisma.cart.findFirst({
      where: { userId: parsedUserId },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: parsedUserId },
      });
    }

    // Check if the item is already in the cart
    const existingCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        itemId: parsedItemId,
      },
    });

    if (existingCartItem) {
      // Update the quantity if the item is already in the cart
      await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + parsedQuantity },
      });
    } else {
      // Add the new item to the cart
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          itemId: parsedItemId,
          quantity: parsedQuantity,
        },
      });
    }

    return new Response(
      JSON.stringify({ message: 'Item added to cart successfully.' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error adding to cart:', error);

    // Return a 500 response with error details
    return new Response(
      JSON.stringify({ error: 'Failed to add item to cart.' }),
      { status: 500 }
    );
  }
}
