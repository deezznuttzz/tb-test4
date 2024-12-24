import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    await prisma.$connect();
    console.log('Database connected');

    const formData = await request.formData();
    const name = formData.get('name');
    const details = formData.get('details');
    const extras = formData.get('extras');
    const price = parseFloat(formData.get('price') || '0');
    const bussinessid = parseFloat(formData.get('bussinessid') || '0');
    const image = formData.get('image');


    if (
      !name ||
      !details ||
      !extras ||
      !price ||
      !bussinessid ||
      !image
    ) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

 

    const imageName = `${Date.now()}_${image.name}`;
    const imagePath = path.join(process.cwd(), 'public/uploads', imageName);
    const fileData = Buffer.from(await image.arrayBuffer());
    fs.writeFileSync(imagePath, fileData);

 

 

    const newSpecial = await prisma.orderitems.create({
      data: {
        name,
        details,
        extras,
        price,
        bussinessid,
        imagepath: `/uploads/${imageName}`,

      },
    });

    return NextResponse.json(newSpecial);
  } catch (error) {
    console.error('Error creating special:', error);
    return NextResponse.json({ error: 'An error occurred while creating the special' }, { status: 500 });
  }
}
