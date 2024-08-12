"use client"

import { setCookies } from "@/actions/cookies";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginCompoent = () => {

    const router = useRouter();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = async () => {
        const data = {email,password};

  
        const user = await axios.post('/api/auth/login',data);
        
        await setCookies("token",user.data.token);
        await setCookies("id",user.data.user.id)
        
        router.push('/flashcards')
  
    }

  return (
    <div className="bg-gray-100 rounded-md px-6 py-4">
      <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Login
      </h3>
      <div className="mt-6">
        <div>
          Email
            <div>
                <Input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
        </div>
        <div>
            Password
            <div>
              <Input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
        </div>
        <div className="flex flex-row justify-center mt-4">
            <Button onClick={handleSubmit}>
              Submit
            </Button>
          </div>
      </div>
    </div>
  )
}

export default LoginCompoent
