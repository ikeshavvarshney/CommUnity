import Image from "next/image";
import React from "react";
import Navbar from "../components/Navbar";

const Profile = () => {
  // --- Sample Data ---
  const user = {
    name: "Alex Carter",
    username: "alexcarter",
    bio:
      "Hi! I'm Alex, a passionate developer who loves building music streaming apps and exploring the latest web technologies. Always learning, always sharing, and part of awesome dev communities!",
    title: "Full Stack Developer • Music Enthusiast",
    posts: 214,
    followers: 3100,
    following: 567,
    socials: {
      twitter: "https://twitter.com/alexcarter",
      github: "https://github.com/alexcarter",
      instagram: "https://instagram.com/alexcarter"
    },
    coverImage: "/image.jpg", // Place image.jpg into /public
    avatar: "/image.jpg"
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center">

      {/* Cover Photo */}
      <div className="w-full h-56 relative bg-gradient-to-r from-blue-500 to-teal-400 flex justify-center">
        <Image
          src={user.coverImage}
          alt="Profile Cover"
          fill
          style={{ objectFit: "cover" }}
          className="rounded-b-3xl"
          priority
        />
        {/* Avatar */}
        <div className="absolute left-1/2 -bottom-16 -translate-x-1/2 w-36 h-36">
          <Image
            src={user.avatar}
            alt="Profile avatar"
            width={144}
            height={144}
            className="rounded-full border-4 border-white shadow-md"
            priority
          />
        </div>
      </div>

      {/* Profile Main */}
      <section className="mt-24 w-full max-w-3xl bg-white rounded-2xl shadow-lg px-10 py-8 flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
        <span className="text-sm text-gray-400">@{user.username}</span>
        <p className="text-gray-600 mb-2">{user.title}</p>
        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">Follow</button>
          <button className="px-6 py-2 border border-gray-400 rounded-full text-gray-700 hover:bg-gray-50 transition">Message</button>
        </div>
        {/* Stats */}
        <div className="flex gap-8 my-4">
          <div className="flex flex-col items-center">
            <span className="font-bold text-xl text-gray-800">{user.posts}</span>
            <span className="text-gray-500 text-sm">Posts</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-xl text-gray-800">{user.followers.toLocaleString()}</span>
            <span className="text-gray-500 text-sm">Followers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-xl text-gray-800">{user.following}</span>
            <span className="text-gray-500 text-sm">Following</span>
          </div>
        </div>
        {/* About */}
        <p className="text-center text-gray-700 max-w-lg">{user.bio}</p>
        {/* Social Links */}
        <div className="flex gap-6 mt-3">
          <a href={user.socials.twitter} target="_blank" className="text-gray-400 hover:text-blue-600 transition" aria-label="Twitter">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M21.6 7c.01.15.01.3.01.45 0 4.6-3.48 9.9-9.85 9.9-1.96 0-3.79-.57-5.33-1.55a7 7 0 005.13-1.43c-1.53-.03-2.82-1.04-3.26-2.43.21.03.42.05.65.05.31 0 .61-.05.9-.12-1.64-.33-2.88-1.78-2.88-3.53v-.05c.49.27 1.06.45 1.67.47A3.47 3.47 0 013.56 8c0-.63.17-1.2.47-1.7 1.71 2.1 4.26 3.48 7.16 3.64-.06-.25-.09-.52-.09-.79a3.48 3.48 0 013.48-3.48c1 0 1.89.42 2.52 1.09a6.9 6.9 0 002.21-.84 3.5 3.5 0 01-1.53 1.92 7.01 7.01 0 002-.54A7.58 7.58 0 0121.6 7z"/></svg>
          </a>
          <a href={user.socials.github} target="_blank" className="text-gray-400 hover:text-blue-900 transition" aria-label="GitHub">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.426 2.866 8.184 6.839 9.504.5.09.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.18-1.11-1.495-1.11-1.495-.91-.623.069-.611.069-.611 1.006.07 1.536 1.034 1.536 1.034.892 1.53 2.341 1.089 2.91.834.092-.647.35-1.09.637-1.341-2.221-.252-4.555-1.113-4.555-4.953 0-1.093.39-1.989 1.029-2.689-.103-.253-.447-1.271.097-2.65 0 0 .84-.27 2.75 1.025a9.52 9.52 0 012.5-.337 9.5 9.5 0 012.5.337c1.91-1.296 2.75-1.025 2.75-1.025.545 1.379.201 2.397.098 2.65.64.7 1.028 1.596 1.028 2.689 0 3.849-2.337 4.698-4.566 4.947.358.309.678.919.678 1.852 0 1.336-.012 2.416-.012 2.746 0 .267.18.576.688.479C19.135 20.201 22 16.447 22 12.021 22 6.484 17.522 2 12 2z"/></svg>
          </a>
          <a href={user.socials.instagram} target="_blank" className="text-gray-400 hover:text-pink-600 transition" aria-label="Instagram">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.006 7.277A4.727 4.727 0 0012 16.727a4.727 4.727 0 000-9.45zm8.207-.084a2.315 2.315 0 01.868 1.593c.059.385.057.489.057 1.426s.002 1.041-.057 1.426a2.315 2.315 0 01-.868 1.593 2.32 2.32 0 01-1.593.868c-.385.059-.489.057-1.426.057s-1.041.002-1.426-.057a2.32 2.32 0 01-1.593-.868 2.315 2.315 0 01-.868-1.593c-.059-.385-.057-.489-.057-1.426s-.002-1.041.057-1.426a2.315 2.315 0 01.868-1.593 2.32 2.32 0 011.593-.868c.385-.059.489-.057 1.426-.057s1.041-.002 1.426.057a2.32 2.32 0 011.593.868zm3.587 1.47c-.007-.504-.043-.847-.093-1.158a4.904 4.904 0 00-1.21-2.131 4.908 4.908 0 00-2.131-1.21c-.311-.05-.654-.086-1.158-.093-.513-.007-.669-.009-1.937-.009s-1.424.002-1.937.009c-.504.007-.847.043-1.158.093a4.908 4.908 0 00-2.131 1.21 4.908 4.908 0 00-1.21 2.131c-.05.311-.086.654-.093 1.158-.007.513-.009.669-.009 1.937s.002 1.424.009 1.937c.007.504.043.847.093 1.158a4.908 4.908 0 001.21 2.131 4.904 4.904 0 002.131 1.21c.311.05.654.086 1.158.093.513.007.669.009 1.937.009s1.424-.002 1.937-.009c.504-.007.847-.043 1.158-.093a4.904 4.904 0 002.131-1.21 4.904 4.904 0 001.21-2.131c.05-.311.086-.654.093-1.158.007-.513.009-.669.009-1.937s-.002-1.424-.009-1.937z"/></svg>
          </a>
        </div>
      </section>
      </div>
    </main>
  );
}

export default Profile;