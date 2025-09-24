import React, { useState } from 'react';
import { apiFetch, setToken } from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../global.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login(){
  const [form,setForm] = useState({email:'', password:''});
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    try{
      const res = await apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(form) });
      setToken(res.token);
      nav('/dashboard');
    }catch(err){
      // alert(err.error || 'Login failed');
      toast.error(err.error || 'Login failed' , {
        position: "top-center",
        autoClose: 2000,
      })
    }
  }
  return (
    <>
    <div className=' bg-gradient-to-b from-white via-blue-100 to-blue-200 min-h-screen '>
      {/* #9cd3eaff */}
        <div className='justify-center flex '>
          <h1 className='text-center mt-10 text-3xl font-bold text-white  bg-red-500 rounded-lg px-[160px] py- '>Grid Game</h1>
        </div>
        <div className='flex justify-center m- mt-10  '>
          <form 
          onSubmit={submit}
          className='bg-gray-100 p-8 rounded-2xl shadow-lg mb-20 flex flex-col gap-4 w-full max-w-sm'
          >
            <h2 className='text-2xl text-green-700 text-center font-bold mb-5'>Login</h2>
            <label >Email</label>
            <input 
            placeholder="Enter email" 
            value={form.email} 
            onChange={e=>setForm({...form, email: e.target.value})}
            className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <label >Password</label>
            <input 
            type="password" 
            placeholder="Enter password" 
            value={form.password} 
            onChange={e=>setForm({...form, password: e.target.value})}
            className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <button type="submit" 
            className='bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition'
            >Login</button>
            <div className='flex '>
              <p>Don't have an account? </p>
              <a href="/signup" className='text-blue-600 hover:underline ml-2'>Signup</a>
            </div>
          </form>
          <ToastContainer />
        </div>
        <h1 className='absolute right-0 mr-20 bottom-9 text-lg underline '><strong className='text-sm font-light '>by</strong> Noel David King </h1>
      </div>
    </>
  );
}
