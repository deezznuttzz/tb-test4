// CLIENT-SIDE COMPONENT
'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function page(){

    const router = useRouter()

    const [name, setName] = useState('')
    const [email , setEmail] = useState('')
    const [password, setPassword] = useState('')

async function createaccount (){
    const newuser = axios.post('/api/userauth/signup', {
        name,
        password,
        email,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      router.push('/userlogin')
}

  return (




    <div><input placeholder='name' value={name} onChange={(e) => setName(e.target.value)}></input>
    <div><input placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
    <div><input placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
    <div><button placeholder='submit' value={name} onClick={createaccount}>create</button>
    </div></div></div></div>
  )
}