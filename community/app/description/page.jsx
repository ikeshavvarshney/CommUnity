"use client";
import React, { useState } from "react";

export default function CommunityPage() {
  const [isMember, setIsMember] = useState(false);

  const community = {
    name: "EcoWarriors",
    coverImage:
      "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1500&q=80",
    members: 1284,
    description:
      "Welcome to EcoWarriors 🌿 — a community of nature lovers, environmental activists, and sustainability enthusiasts working together to make a greener planet. Share your projects, tips, and eco-friendly ideas!",
    posts: [
      {
        id: 1,
        title: "How I built my own compost bin at home",
        author: "PriyanshuK",
        upvotes: 42,
        comments: 8,
      },
      {
        id: 2,
        title: "Local cleanup drive this Sunday at City Park!",
        author: "AnanyaR",
        upvotes: 67,
        comments: 12,
      },
      {
        id: 3,
        title: "Top 10 sustainable gadgets in 2025 🔋",
        author: "TechForEarth",
        upvotes: 31,
        comments: 5,
      },
    ],
  };

  const handleJoin = () => {
    setIsMember(!isMember);
  };

  return (
    <div className="max-w-5xl mx-auto mt-6 p-4">
      <div className="relative w-full h-48 rounded-xl overflow-hidden shadow-md">
        <img
          src={community.coverImage}
          alt={community.name}
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-4 left-6 bg-white bg-opacity-80 rounded-md px-4 py-2">
          <h1 className="text-2xl font-bold text-gray-800">
            r/{community.name}
          </h1>
          <p className="text-sm text-gray-600">
            {community.members.toLocaleString()} members
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-center">
        <p className="text-gray-700 max-w-3xl">{community.description}</p>
        <button
          onClick={handleJoin}
          className={`mt-3 md:mt-0 px-6 py-2 rounded-full text-white font-semibold transition-all ${
            isMember ? "bg-gray-500 hover:bg-gray-600" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isMember ? "Leave" : "Join"}
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3">Community Posts</h2>
        <div className="space-y-4">
          {community.posts.map((post) => (
            <div
              key={post.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-all"
            >
              <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
              <p className="text-sm text-gray-500">
                Posted by u/{post.author} • {post.upvotes} upvotes • {post.comments} comments
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
