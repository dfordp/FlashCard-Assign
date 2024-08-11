"use server"

import { cookies } from "next/headers"

export const setCookies = async(key,value) => { 
    await cookies().set(key,value);
}

export const getCookies = async(key) => { 
    const value = await cookies().get(key);
    return value;
}

export const deleteCookies = async(key) => {
    await cookies().delete(key);
}