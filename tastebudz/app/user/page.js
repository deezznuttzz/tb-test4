'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Menu from '../components/usercomp/viewmenu/Menu';
import Cart from '../components/usercomp/cart/Cart';

export default function Page() {

////////////////////auth//////////////////////////// 
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const secid = localStorage.getItem('secid');

    if (userId && secid) {
      axios
        .get('/api/userauth/validate', { params: { userId, secid } })
        .then((response) => {
          if (!response.data.valid) {
            router.push('/userlogin');
          }
        })
        .catch(() => {
          router.push('/userlogin');
        });
    } else {
      router.push('/userlogin');
    }
  }, [router]);



  /////////////////////////////////////////////////////////

  return <div><Menu />
  <div></div></div>;
}