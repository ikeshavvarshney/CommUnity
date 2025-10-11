'use client';
import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router=useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          firstName,
          lastName,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || 'Something went wrong');
        throw new Error(data.message || 'Something went wrong');
      }

      toast.success('Registered Successfully');
      localStorage.setItem('accToken', data.token);
      router.push("/")

    } catch (e) {
      console.error(e);
    }
  };

  const handleGoogleSignup = () => {
    // Implement Google signup logic here or redirect to OAuth flow
    toast.info('Google Signup clicked (Not implemented)');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <img
        src="/assets/logo.svg"
        alt="CommUnity Logo"
        width={200}
        className="mb-8"
      />

      <div className="max-w-md w-full space-y-8 p-8 border border-gray-200 rounded-lg shadow-sm">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>


        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400
                  focus:outline-none focus:ring-[#2E4156] focus:border-[#2E4156] focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="firstName" className="sr-only">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400
                    focus:outline-none focus:ring-[#2E4156] focus:border-[#2E4156] focus:z-10 sm:text-sm"
                  placeholder="First Name"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="lastName" className="sr-only">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400
                    focus:outline-none focus:ring-[#2E4156] focus:border-[#2E4156] focus:z-10 sm:text-sm"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400
                  focus:outline-none focus:ring-[#2E4156] focus:border-[#2E4156] focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400
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
              Sign Up
            </button>
          </div>
          {/* Google Signup Button */}
        <button
          onClick={handleGoogleSignup}
          type="button"
          className="w-full flex items-center justify-center gap-3 py-2 px-4 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition"
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
            fill="currentColor"
          >
            <path d="M488 261.8c0-17.3-1.6-34-4.6-50.2H249v95.1h134.6c-5.8 31.3-23.8 57.7-50.7 75.5v62.7h81.9c47.9-44.2 75.2-109 75.2-183.1z" />
            <path d="M249 492c67.8 0 124.7-22.3 166.3-60.5l-81.9-62.7c-22.6 15.1-51.6 24-84.4 24-64.9 0-120-43.9-139.7-103.2H25.7v64.8C66 440.7 151.9 492 249 492z" />
            <path d="M109.3 289.6c-4.9-14.5-7.7-30-7.7-45.6s2.8-31.1 7.7-45.6v-64.8H25.7c-15.9 32.3-25 68.8-25 110.4s9.1 78.1 25 110.4l83.6-64.8z" />
            <path d="M249 100.7c35.9 0 68.2 12.3 93.6 36.6l70.1-70.1C373.6 24.6 313 0 249 0 151.9 0 66 51.3 25.7 132.3l83.6 64.8C129 144.6 184.1 100.7 249 100.7z" />
          </svg>
          Sign up with Google
        </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-[#2E4156] hover:text-[#1A2D42]">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
