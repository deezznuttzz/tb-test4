'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import VerticalScroller from '../components/bussinesscomp/vieworderitems/VerticalScroller';
import AddMenuItem from '../components/bussinesscomp/makeorderitems/AddMenuItem';


export default function BussinessPage() {

////////////////////auth///////////////////////

  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const secid = localStorage.getItem('secid');

    if (userId && secid) {
      axios
        .get('/api/bussinessauth/validate', { params: { userId, secid } })
        .then((response) => {
          if (!response.data.valid) {
            router.push('/bussinesslogin');
          }
        })
        .catch(() => {
          router.push('/bussinesslogin');
        });
    } else { 
      router.push('/bussinesslogin');
    }
  }, [router]);
  

  return <div>
    <div><AddMenuItem /></div>
  <div><VerticalScroller /></div>
  </div>
  ;
}