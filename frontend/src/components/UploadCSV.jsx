import React, { useState } from 'react';
import { apiFetch } from '../services/api';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UploadCSV({ onResult }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  async function upload(e) {
    e.preventDefault();
    if (!file) 
      return toast.error('Please Select CSV File' , {
        position: "top-center",
        autoClose: 2000,
      });
      // return alert('Please select a CSV file');
    const form = new FormData();
    form.append('file', file);

    try {
      setLoading(true);
      const res = await apiFetch('/auth/signup', { method: 'POST', body: form });
      const data = await res.json();
      if (!res.ok) throw data;
      onResult(data.result);
    } catch (err) {
      toast.error(err.error || 'Upload failed' , {
        position: "top-center",
        autoClose: 2000,
      })
      // alert(err.error || 'Upload failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={upload}
    className='bg-blue-200 p-5  items-center justify-center text-center rounded-xl '>
      <ToastContainer/>
      <input
      className='bg-blue-400 border-2 border-blue-700 hover:bg-blue-500 text-white p-1.5 mr-4 rounded-lg cursor-pointer'
      type="file" accept=".csv,text/csv" onChange={(e)=>setFile(e.target.files[0])}/>
      <button
      className='bg-blue-400 p-2 rounded-lg hover:bg-blue-500 text-white border-2 border-blue-700 '
      ype="submit" disabled={loading}>{loading ? 'Processing......' : 'Upload & Compute'}</button>
    </form>
  );
}
