"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function CommunityPage() {
  const [isMember, setIsMember] = useState(false);

  const community = {
    name: "EcoWarriors",
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
    rules: [
      "Be respectful to all members",
      "No spam or self-promotion",
      "Stay on topic",
      "Use proper language",
    ],
    moderators: ["PriyanshuK", "AnanyaR"],
  };

  const handleJoin = () => setIsMember(!isMember);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-6 p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="md:col-span-2 space-y-6">
        {/* Particle Cover */}
        <div className="relative w-full h-48 rounded-xl overflow-hidden shadow-md">
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
              background: { color: { value: "#ffffff" } },
              fpsLimit: 60,
              interactivity: {
                events: { onHover: { enable: true, mode: "repulse" }, resize: true },
              },
              particles: {
                color: { value: "#10B981" },
                links: { enable: true, color: "#10B981", distance: 150 },
                move: { enable: true, speed: 2, outModes: "bounce" },
                number: { value: 50 },
                opacity: { value: 0.6 },
                shape: { type: "circle" },
                size: { value: { min: 2, max: 4 } },
              },
            }}
            className="absolute inset-0"
          />

          <div className="absolute bottom-4 left-6 bg-white bg-opacity-80 rounded-md px-4 py-2">
            <h1 className="text-2xl font-bold text-gray-800">r/{community.name}</h1>
            <p className="text-sm text-gray-600">
              {community.members.toLocaleString()} members
            </p>
          </div>
        </div>

        {/* Description & Join Button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
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

        {/* Posts Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Community Posts</h2>
          <div className="space-y-4">
            {community.posts.map((post) => (
              <motion.div
                key={post.id}
                className="border border-gray-200 rounded-lg p-4 cursor-pointer"
                whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
                <p className="text-sm text-gray-500">
                  Posted by u/{post.author} • {post.upvotes} upvotes • {post.comments} comments
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6 md:col-span-1">
        {/* About Section */}
        <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-2">About Community</h3>
          <p className="text-sm text-gray-600">{community.description}</p>
        </div>

        {/* Rules Section */}
        <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Rules</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            {community.rules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </div>

        {/* Moderators Section */}
        <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Moderators</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            {community.moderators.map((mod, index) => (
              <li key={index}>{mod}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
