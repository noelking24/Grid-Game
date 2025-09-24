import React, { useEffect, useState } from 'react';
import { apiFetch, clearToken } from '../services/api';
import UploadCSV from '../components/UploadCSV';
import { useNavigate } from 'react-router-dom';

export default function Dashboard(){
  const [user, setUser] = useState(null);
  const [result, setResult] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const res = await apiFetch('/user/profile');
        setUser(res.user);
      } catch (err) {
        alert('Please login');
        nav('/login');
      }
    }
    load();
  },[]);

  function logout(){
    clearToken();
    nav('/login');
  }

  return (
    <div>
      <h2 className='text-green-700 text-center items-center mt-9 text-3xl font-extrabold'>Grid Game Dashboard</h2>
      {/* <p
      className='absolute top-0 right-0 m-10 text-2xl font-bold '
      >Welcome {user?.name?.charAt(0).toUpperCase() + user?.name?.slice(1)} </p> */}
      <div
      className='m-10'
      >
      <button 
      className='absolute top-0 right-0 m-10 text-lg bg-red-500 text-white p-2 rounded-lg hover:bg-red-700 hover:text-red '
      onClick={logout}>Logout</button>
      {user && (
        <div className='py-5'>
          <p className='text-lg'
          ><strong>Name:</strong> {user?.name?.charAt(0).toUpperCase() + user?.name?.slice(1)}</p>
          <p className='text-lg'
          ><strong>Email:</strong> {user.email}</p>
        </div>
      )}

      <section>
        <h2 className='text-center mt-3 mb-5 text-xl font-bold '>Upload game CSV</h2>
        <UploadCSV onResult={(r)=>setResult(r)} />
      </section>

      {result !== null && (
        <div>
          <h3 className='text-2xl mt-5 font-medium'>Result:</h3>
          <p className='text-lg'>Minimum path sum: <strong className='text-green-600'>{result}</strong></p>
        </div>
      )}
      </div>
    </div>
  );
}
