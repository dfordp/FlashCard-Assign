"use server"

import client from "@/lib/prismadb";
import { getCookies } from "../cookies"


export const getFlashCards = async() => {
    const userId = await getCookies("id");
    const flashCards = await client.flashCard.findMany({
        where:{
            userId : userId
        }
    });

    return flashCards;
    
}