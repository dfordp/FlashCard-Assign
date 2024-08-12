import client from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(  request: Request){
    try{
        const body = await request.json();
        const {
            question,
            answer,
            userId,
          } = body;

          if(!question || !answer || !userId ){
            return new NextResponse('Missing info', {status:400})
          }

          const user = await client.user.findUnique({
            where : { 
                id : userId
            }
          })


          if(!user){
            return new NextResponse('No user Found', {status:404})
          }

          const flashCard = await client.flashCard.create({
            data: {
              question,
              answer,
              userId
            }
          });

          return NextResponse.json(flashCard);

    }catch (error:any) {
        return new NextResponse(error , {status : 400})
    }
}