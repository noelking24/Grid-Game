import React, { useState } from 'react';
import { apiFetch, setToken } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup(){
  const [form,setForm] = useState({name:'', email:'', password:''});
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passError, setPassError] = useState("");
  const nav = useNavigate();

    const handleEmailChange = (e) => {
      const value = e.target.value;
      setForm({ ...form, email: value });

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (value && !emailRegex.test(value)) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError("");
      }
    };

    const handleNameChange = (e) => {
      const value = e.target.value;
      setForm({ ...form, name: value });

      if (value.length < 3) {
        setNameError("Name must be at least 3 characters");
      } else {
        setNameError("");
      }
    };
    const handlePasswordChange = (e) => {
      const value = e.target.value;
      setForm({ ...form, password: value });

      if (value.length < 3) {
        setPassError("Password must be at least 3 characters");
      } else {
        setPassError("");
      }
    };

  async function submit(e){
    e.preventDefault();
    if(!form.name || !form.email || !form.password) 
      return toast.error( 'Please fill all the fields' , {
            position: "top-center",
            autoClose: 2000,
          });
    if (emailError || nameError || passError) {
      if (emailError) {
        toast.error(emailError, {
          position: "top-center",
          autoClose: 2000,
        });
      }

      if (nameError) {
        toast.error(nameError, {
          position: "top-center",
          autoClose: 2000,
        });
      }
      
      if (passError) {
        toast.error(passError, {
          position: "top-center",
          autoClose: 2000,
        });
      }
      
      return;
    }
    try{
      const res = await apiFetch('/auth/signup', { method: 'POST', body: JSON.stringify(form) });
      setToken(res.token);
      nav('/dashboard');
    }catch(err){
      // alert(err.error || 'Signup failed');
        toast.error(err.error || 'Signup failed' , {
        position: "top-center",
        autoClose: 2000,
      })
    }
  }
  return (
    <div className=' bg-gradient-to-b from-white via-blue-100 to-blue-200 min-h-screen '>
      <div className='flex justify-center m-3 mt-10 '>
        <ToastContainer />
        <form onSubmit={submit}
        className='bg-gray-100 p-8 rounded-2xl shadow-lg mb-20 flex flex-col gap-4 w-full max-w-sm'
        >
          <h2 className='text-2xl text-green-700 text-center font-bold mb-5'>Signup</h2>
          <label >Name</label>
          <input 
          placeholder="Enter name" 
          value={form.name} 
          onChange={handleNameChange}
          className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <label >Email</label>
          <input 
          placeholder="Enter email" 
          value={form.email} 
          onChange={handleEmailChange}
          className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <label >Set Password</label>
          <input 
          type="password" 
          placeholder="Set password" 
          value={form.password} 
          onChange={handlePasswordChange}
          className='border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button type="submit"
          className='bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition'
          >Signup</button>
          <div className='flex '>
            <p>Already have an account? </p>
            <a href="/login" className='text-blue-600 hover:underline ml-2'>Login</a>
          </div>
        </form>
      </div>
    </div>
  );
}
