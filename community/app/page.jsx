import Link from "next/link";
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import EventsSection from "./components/EventsSection";
import SmallProfile from "./components/SmallProfile";

export default function Home() {
  const exampleEvents = [
  {
    eventTitle: 'Tech Innovators Meetup 2025',
    dateTime: 'Oct 25, 2025, 6:00 PM',
    location: '123 Innovation Drive, Silicon Valley, CA',
  },
  {
    eventTitle: 'AI & Machine Learning Conference',
    dateTime: 'Nov 10, 2025, 9:00 AM',
    location: 'Online Webinar',
  },
  {
    eventTitle: 'Startup Pitch Night',
    dateTime: 'Dec 5, 2025, 7:00 PM',
    location: 'Downtown Co-working Space',
  },
];
  return (
   <div>
     <Navbar />
     <main className="flex px-8 justify-between gap-5 mt-6">
      <div className="flex-col max-w-80">
        <h2 className="px-1 text-lg font-bold">Profile</h2>
        <Link href="../profile">
          <SmallProfile
            profilePic="https://randomuser.me/api/portraits/women/44.jpg"
            username="Jane Doe"
            bio="Full-stack developer, music lover, and tech enthusiast."
            about='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
          />
        </Link>
      </div>
      <div className="flex-col">
        <h2 className="px-1 text-lg font-bold">Feed</h2>
        <Post 
          title="Introducing Our New Feature" 
          author="Jane Doe" 
          date="2025-10-11" 
          imageUrl="/images/feature.png" 
          content="This is the content of the post. It supports multiple lines and paragraphs." 
        />
      </div>
      <div className="flex-col">
       <h2 className="px-1 text-lg font-bold">Upcoming Events</h2>
      <EventsSection events={exampleEvents} />
      </div>

     </main>
   </div>
  );
}
