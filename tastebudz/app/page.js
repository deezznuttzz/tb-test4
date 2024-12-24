'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter()

  function userlogin(){
    router.push('/userlogin')

  }

  function createuseraccount(){
    router.push('/usersignup')
  }

  function bussinesslogin(){
    router.push('/bussinesslogin')
  }

  function createbussinessaccount(){
    router.push('/bussinesssignup')
  }



  return (
    <div>
    <div><button onClick={userlogin}>userlogin</button></div>
    <div><button onClick={createuseraccount} >usersignup</button></div>
    <div><button onClick={bussinesslogin} >bussinesslogin</button></div>
    <div><button onClick={createbussinessaccount} >bussinesssignup</button></div>
    </div>
  );
}
