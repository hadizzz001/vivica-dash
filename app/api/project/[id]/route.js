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
   
    const categories1 = await prisma.project.findUnique({
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




// Update Project API
export async function PATCH(request, { params }) {
  const { id } = params;
  const { title, description, img, video, archive } = await request.json();

  console.log("imgs are: ", img);

  try {
    const updatedProject = await prisma.project.update({
      where: { id },
      data: { title, description, img, video, archive },
    });

    return new Response(JSON.stringify(updatedProject), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error('Error updating project:', error);
    return new Response(JSON.stringify({ error: 'Failed to update project' }), {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }
}

// Delete Project API
export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await prisma.project.delete({ where: { id } });

    return new Response(JSON.stringify({ message: 'Project deleted successfully' }), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete project' }), {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }
}
