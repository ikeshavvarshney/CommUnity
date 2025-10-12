'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'; // Make sure you have this component

const teamMembers = [
  {
    name: "Yash Vardhan Shukla",
    role: "Lead Developer",
    description: "Full-stack developer with 8+ years experience in React, Node.js, and cloud architecture.",
    linkedin: "https://www.linkedin.com/in/yash-vardhan-shukla-b0a71331b",
    github: "https://github.com/Yash-vs9"
  },
  {
    name: "Keshav Varshney",
    role: "Lead Frontend Developer",
    description: "UI/UX specialist focused on creating intuitive user experiences with modern frameworks.",
    linkedin: "https://linkedin.com/in/ikeshavvarshney",
    github: "https://github.com/ikeshavvarshney"
  },
  {
    name: "Lakshya Varshney",
    role: "Backend Developer",
    description: "Infrastructure and deployment specialist ensuring scalable and reliable systems.",
    linkedin: "https://www.linkedin.com/in/lakshya-varshney-621032342",
    github: "https://github.com/Lakshya-Varshney"
  },
  {
    name: "Priyanshu Kumar",
    role: "Frontend Developer",
    description: "Building and nurturing our developer community through events and engagement.",
    linkedin: "https://linkedin.com/in/priyanshu-kumar-9a329b343",
    github: "https://github.com/PriyanshuKK1908"
  }
];

const linkedinProfiles = [
  { vanity: 'yash-vardhan-shukla-b0a71331b', name: 'Yash Vardhan Shukla' },
  { vanity: 'ikeshavvarshney', name: 'Keshav Varshney' },
  { vanity: 'lakshya-varshney-621032342', name: 'Lakshya Varshney' },
  { vanity: 'priyanshu-kumar-9a329b343', name: 'Priyanshu Kumar' },
];

const faqs = [
  {
    question: "How quickly do you respond to inquiries?",
    answer: "We typically respond to all inquiries within 24 hours during business days."
  },
  {
    question: "Can I schedule a call with the team?",
    answer: "Absolutely! Mention your preferred time in your message and we'll coordinate a call."
  },
  {
    question: "Do you offer technical consulting?",
    answer: "Yes, we provide consulting services for web development and technology solutions."
  },
  {
    question: "How can I contribute to the community?",
    answer: "Check out our GitHub repositories and join our Discord server to get started!"
  }
];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    department: 'general',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    const scriptId = 'linkedin-badge-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.src = 'https://platform.linkedin.com/badges/js/profile.js';
      script.async = true;
      script.defer = true;
      script.id = scriptId;
      document.body.appendChild(script);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    setSubmitMessage("Thank you! Your message has been sent successfully.");
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      department: 'general',
    });
    setIsSubmitting(false);

    setTimeout(() => setSubmitMessage(''), 5000);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />

      {/* Header */}
      <header className="bg-gray-50 shadow-sm py-10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We are here to help. Reach out to our team and let's create something great together.
          </p>
        </div>
      </header>

      {/* Contact Info */}
      <section className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
        <div>
          <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-200 text-gray-600 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-1">Email</h3>
          <p className="text-gray-500">hello@devcommunity.io</p>
        </div>
        <div>
          <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-200 text-gray-600 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-1">Phone</h3>
          <p className="text-gray-500">+1 (555) 123-4567</p>
        </div>
        <div>
          <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-200 text-gray-600 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-1">Address</h3>
          <p className="text-gray-500">123 Tech Avenue<br />Silicon Valley, CA 94025</p>
        </div>
        <div>
          <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-200 text-gray-600 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-1">Hours</h3>
          <p className="text-gray-500">Mon - Fri<br />9:00 AM - 6:00 PM PST</p>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Meet Our Team</h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Get to know the passionate individuals behind our community.
        </p>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map(({ name, role, description, linkedin, github }, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 p-6 text-center">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-5 text-2xl font-extrabold text-gray-900">
                {name.split(' ').map(word => word[0]).join('')}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
              <p className="text-indigo-600 font-medium mb-2">{role}</p>
              <p className="text-gray-700 text-sm mb-4">{description}</p>
              <div className="flex justify-center space-x-6 text-gray-600">
                <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${name} LinkedIn`}>
                  <svg className="w-6 h-6 hover:text-indigo-800 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href={github} target="_blank" rel="noopener noreferrer" aria-label={`${name} GitHub`}>
                  <svg className="w-6 h-6 hover:text-indigo-800 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LinkedIn Badges Section */}
      <section className="max-w-6xl mx-auto px-26 py-10 ">
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-8">Connect with us on LinkedIn</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {linkedinProfiles.map(({ vanity, name }) => (
            <div
              key={vanity}
              className="badge-base LI-profile-badge bg-white p-2 rounded shadow-md"
              data-locale="en_US"
              data-size="medium"
              data-theme="light"
              data-type="HORIZONTAL"
              data-vanity={vanity}
              data-version="v1"
              style={{ minWidth: '280px' }}
            >
              <a
                href={`https://linkedin.com/in/${vanity}`}
                className="badge-base__link LI-simple-link text-indigo-600 font-semibold hover:underline"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`LinkedIn profile of ${name}`}
              >
                {name}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Send Us a Message</h2>
        <form onSubmit={handleSubmit} noValidate className="bg-gray-100 rounded-lg shadow-lg p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block mb-2 font-semibold text-gray-700">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 font-semibold text-gray-700">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="subject" className="block mb-2 font-semibold text-gray-700">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="What's this about?"
                required
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="department" className="block mb-2 font-semibold text-gray-700">Department</label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="general">General</option>
                <option value="technical">Technical Support</option>
                <option value="business">Business Inquiries</option>
                <option value="media">Media</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block mb-2 font-semibold text-gray-700">Message *</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              placeholder="Tell us more about your inquiry..."
              required
              value={formData.message}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg transition"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {submitMessage && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md border border-green-300 text-center font-medium">
              {submitMessage}
            </div>
          )}
        </form>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-lg shadow">
              <h3 className="font-semibold text-gray-800 mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-center py-6 border-t border-gray-200">
        <p className="italic text-gray-600 max-w-xl mx-auto">
          &quot;The best way to find yourself is to lose yourself in the service of others.&quot; — Mahatma Gandhi
        </p>
        <p className="mt-4 text-sm text-gray-500">© 2025 Dev Community. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ContactPage;
