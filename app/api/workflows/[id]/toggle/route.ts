import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const { status } = body;

    return NextResponse.json({
      success: true,
      id: id,
      status
    });
  } catch (error) {
    console.error('Error toggling workflow:', error);
    return NextResponse.json(
      { error: 'Failed to toggle workflow' },
      { status: 500 }
    );
  }
}
