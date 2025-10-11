"use client";
import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response=await fetch(`http://localhost:8080/user/login`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email:email,
          password:password
        })
      })
      const data=await response.json();
      if(!response.ok){
        toast.error(data.message)
        const errData=data.message;
        throw  Error(errData)
      }
      console.log(data)
      toast.success("Login sucessfully")
    }
    catch(e){
      console.log(e)
    }
    console.log({ email, password });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 p-8 border border-gray-200 rounded-lg shadow-sm">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 
                           focus:outline-none focus:ring-[#2E4156] focus:border-[#2E4156] focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className="pt-4">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 
                           focus:outline-none focus:ring-[#2E4156] focus:border-[#2E4156] focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md
                         text-white bg-[#2E4156] hover:bg-[#1A2D42] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2E4156]"
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/register" className="font-medium text-[#2E4156] hover:text-[#1A2D42]">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
