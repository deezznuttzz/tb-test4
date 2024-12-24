'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AddMenuItem() {
  const router = useRouter();

  /////////////////////////////// State ///////////////////////////////
  const [formData, setFormData] = useState({
    name: '',
    details: '',
    extras: '',
    price: '',
    bussinessid: '', // Added bussinessid here
    image: null,
  });

  /////////////////////////////// Get User ///////////////////////////////
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const secid = localStorage.getItem('secid');

    if (userId && secid) {
      axios
        .get('/api/bussinessauth/validate', { params: { userId, secid } })
        .then((response) => {
          if (!response.data.valid) {
            router.push('/bussinesslogin');
          } else {
            // Set the bussinessid in formData once the user is validated
            setFormData((prevData) => ({ ...prevData, bussinessid: userId }));
          }
        })
        .catch(() => {
          router.push('/bussinesslogin');
        });
    } else {
      router.push('/bussinesslogin');
    }
  }, [router]);

  /////////////////////////////// Handlers ///////////////////////////////
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files?.length) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      if (key === 'image' && value) {
        data.append(key, value);
      } else if (value) {
        data.append(key, value);
      }
    });

    try {
      await axios.post('/api/bussinesspage/addmenuitem', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Special uploaded successfully!');
      setFormData({
        name: '',
        details: '',
        extras: '',
        price: '',
        bussinessid: '', // Reset bussinessid here
        image: null,
      });
    } catch (error) {
      console.error('Error uploading special:', error);
      alert('Failed to upload special.');
    }
  };

  /////////////////////////////// JSX ///////////////////////////////
  return (
    <div>
      <h1>Upload Special Offer</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Place Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="details"
          placeholder="Details"
          value={formData.details}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="extras"
          placeholder="Extras"
          value={formData.extras}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        <button type="submit">Upload Special</button>
      </form>
    </div>
  );
}
