"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'



interface SandboxProps {

}

const Sandbox = (props: SandboxProps) => {
    const router = useRouter()

    const handleSubmit = () => {
        router.push("/")
    }
    return (
        <div className={'w-full flex flex-col justify-center items-center'}>
        </div>
    )
}



export default Sandbox;
