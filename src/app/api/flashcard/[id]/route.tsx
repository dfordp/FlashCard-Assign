import client from "@/lib/prismadb";
import { NextResponse } from "next/server";


interface IParams {
    id?: string;
  }


export async function DELETE( request: Request,  { params }: { params: IParams }){
    try{
        const { id } = params;
        
        const flashCard = await client.flashCard.findUnique({
            where : {
                id : id
            }
        })

        if(!flashCard){
            return new NextResponse('No Flashcard Found', {status:404})
        }

        const flash = await client.flashCard.delete({
            where:{
                id:id
            }
        });

        return NextResponse.json(flash);
        

    }catch (error:any) {
        return new NextResponse(error , {status : 400})
    }
}


export async function PATCH(request: Request, { params }: { params: IParams }) {
    try {
        const { id } = params;
        const { updateQuestion, updateAnswer } = await request.json();

        const flashCard = await client.flashCard.findUnique({
            where: {
                id: id
            }
        });

        if (!flashCard) {
            return new NextResponse('No Flashcard Found', { status: 404 });
        }

        const updatedFlashCard = await client.flashCard.update({
            where: {
                id: id
            },
            data: {
                question: updateQuestion,
                answer: updateAnswer
            }
        });

        return NextResponse.json(updatedFlashCard);

    } catch (error:any) {
        return new NextResponse(error, { status: 400 });
    }
}