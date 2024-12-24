'use server'
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server";


const prisma = new PrismaClient


export async function POST(req) {
    try {
      // Parse the request body
      const body = await req.json();
  
      // Change 'user' to your target table/model in Prisma schema
      const newRecord = await prisma.bussiness.create({
        data: {
          name: body.name,        // Map fields from the request body to your model
          password: body.password, // Add/remove fields as necessary
          email: body.email,      // Ensure the field names match your Prisma schema
        },
      });
  
      // Customize the response message and payload
      return NextResponse.json({
        message: "Record created successfully", // Update message for your use case
        newRecord, // Return the created record or other relevant data
      });
    } catch (error) {
      console.error('Server Error:', error.message);
      return NextResponse.json(
        { message: "Failed to create record", error: error.message }, // Customize the error message
        { status: 500 } // Adjust the HTTP status code as needed
      );
    }
  }