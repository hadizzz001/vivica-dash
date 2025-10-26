import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}


export async function GET(request, { params }) {
  const { id } = params;  
 
  try {
   
    const categories1 = await prisma.blog.findUnique({
      where: { id },
    });

    if (!categories1 || categories1.length === 0) {
      return new Response(JSON.stringify({ message: 'No ids found for the specified type.' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(categories1), { status: 200 });
  } catch (error) {
    console.error('Error fetching ids:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}



// Update Product API
export async function PATCH(request, { params }) {
  const { id } = params;
  const { author, title, description, img, archive } = await request.json();

  try {
    const updatedProduct = await prisma.blog.update({
      where: { id },
      data: { author, title, description, img, archive },
    });

    return new Response(JSON.stringify(updatedProduct), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return new Response(JSON.stringify({ error: 'Failed to update product' }), {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }
}

// Delete Product API
export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await prisma.blog.delete({ where: { id } });

    return new Response(JSON.stringify({ message: 'Product deleted successfully' }), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete product' }), {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }
}
