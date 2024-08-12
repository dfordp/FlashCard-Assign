import client from "@/lib/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  id?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }): Promise<NextResponse> {
  try {
    const { id } = params;

    if (!id) {
      return new NextResponse('Missing id', { status: 400 });
    }

    const flashCard = await client.flashCard.findUnique({
      where: { id }
    });

    if (!flashCard) {
      return new NextResponse('No Flashcard Found', { status: 404 });
    }

    const flash = await client.flashCard.delete({
      where: { id }
    });

    return NextResponse.json(flash);
  } catch (error: any) {
    return new NextResponse(error.message, { status: 400 });
  }
}

export async function PATCH(request: Request, { params }: { params: IParams }): Promise<NextResponse> {
  try {
    const { id } = params;
    const { updateQuestion, updateAnswer } = await request.json();

    if (!id || !updateQuestion || !updateAnswer) {
      return new NextResponse('Missing info', { status: 400 });
    }

    const flashCard = await client.flashCard.findUnique({
      where: { id }
    });

    if (!flashCard) {
      return new NextResponse('No Flashcard Found', { status: 404 });
    }

    const updatedFlashCard = await client.flashCard.update({
      where: { id },
      data: {
        question: updateQuestion,
        answer: updateAnswer
      }
    });

    return NextResponse.json(updatedFlashCard);
  } catch (error: any) {
    return new NextResponse(error.message, { status: 400 });
  }
}