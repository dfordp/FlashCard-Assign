"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"


const LoginButtons = () => {

  const router = useRouter()
  
  return (
    <div className="flex flex-col w-24 gap-4">
       <Button onClick={()=>(router.push("login"))}>
        Login 
       </Button>
       <Button onClick={()=>(router.push("signup"))}>
        SignUp 
       </Button>

    </div>
  )
}

export default LoginButtons
