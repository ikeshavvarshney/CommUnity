"use client"
import React, { use, useEffect, useState } from 'react';
import EventCard from '../components/EventCard';
import Navbar from '../components/Navbar';

const EventsPage = () => {
  const [token, setToken] = useState('')
  const [events, setEvents] = useState([]);

  useEffect(()=>{
    setToken(localStorage.getItem('accToken'))
  },[])

  useEffect( ()=>{
    const fetch1=async()=>{

      const res = await fetch('http://localhost:8080/events/allEvents',{
        method : 'GET',
        headers : {
          Authorization : `Bearer ${token}`,
          "Content-Type":"application/json"
        }
      })
      const data=await res.json();
      console.log(data)
      setEvents(data);
    }
    fetch1()
  },[])

  return (
    <div>
    <Navbar />
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-center text-3xl font-semibold text-gray-800 mb-10 font-sans">
        Upcoming Events
      </h1>
      <div className="max-w-7xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event, idx) => (
          <EventCard key={idx} {...event} />
        ))}
      </div>
    </div>
    </div>
  );
};

export default EventsPage;
