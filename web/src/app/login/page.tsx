'use client'

import { InputForm } from '@/components/input-form'
import { Button } from '@/components/ui/button'
import { FcGoogle } from 'react-icons/fc'

export default function LoginPage() {
  async function login() {
    const response = await fetch('http://localhost:3333/auth/google')
    const data = await response.json()
    console.log({ data })
  }

  return (
    <div className="h-screen flex items-center justify-center flex-col gap-10">
      <Button type="button" onClick={login} variant="outline">
        Continue com a Google
        <FcGoogle className="ml-2 h-4 w-4" />
      </Button>
      <Button
        type="button"
        className="bg-white text-gray-800 font-bold"
        variant="outline"
      >
        Continue com a Google
        <FcGoogle className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}
