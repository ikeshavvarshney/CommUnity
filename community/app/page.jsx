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
     <main className="flex px-8 justify-between gap-6 mt-6">
      <div className="flex-col">
        <h1>profile</h1>
        <Link href="../profile">
          <SmallProfile
            profilePic="https://randomuser.me/api/portraits/women/44.jpg"
            username="Jane Doe"
            bio="Full-stack developer, music lover, and tech enthusiast."
          />
        </Link>
      </div>
      <div className="flex-col">
        <h1>feed</h1>
        <Post 
          title="Introducing Our New Feature" 
          author="Jane Doe" 
          date="2025-10-11" 
          imageUrl="/images/feature.png" 
          content="This is the content of the post. It supports multiple lines and paragraphs." 
        />
      </div>
      <div className="flex-col">
        <h1>messages</h1>
       <h2 style={{ textAlign: 'center', margin: '30px 0' }}>Upcoming Events</h2>
      <EventsSection events={exampleEvents} />
      </div>

     </main>
   </div>
  );
}
