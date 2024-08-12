"use server"

import { cookies } from "next/headers"

export const setCookies = async (key: string, value: string): Promise<void> => { 
    await cookies().set(key, value);
}

export const getCookies = async (key: string): Promise<string | undefined> => { 
    const value = await cookies().get(key);
    return value?.value;
}

export const deleteCookies = async (key: string): Promise<void> => {
    await cookies().delete(key);
}