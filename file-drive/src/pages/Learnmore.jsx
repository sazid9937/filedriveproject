/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom'; // Correct import for Link

const Learnmore = () => {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        {/* <div className="mx-auto max-w-2xl py-8">
          <div className="text-center">
            <img
              src="/logo.png"
              width="200"
              height="200"
              alt="file drive logo"
              className="inline-block mb-8"
            />

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              The easiest way to upload and share files with your company
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Make an account and start managing your files in less than a minute.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/file" // Use 'to' instead of 'href' for Link
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div> */}
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>

      {/* Project Details Section */}
      <div className="mx-auto max-w-2xl py-8">
        <h2 className="text-3xl font-bold text-center text-gray-900">Why Choose Our File Management System?</h2>
        <ul className="mt-6 space-y-4 text-lg text-gray-600">
          <li>✔ Easy file uploads and sharing capabilities.</li>
          <li>✔ Secure storage with user-friendly access controls.</li>
          <li>✔ Real-time collaboration features for teams.</li>
          <li>✔ Access your files from anywhere, anytime.</li>
          <li>✔ Organize your files with tags and categories for easy retrieval.</li>
        </ul>
      </div>

      {/* Testimonials Section */}
      <div className="mx-auto max-w-2xl py-8">
        <h2 className="text-3xl font-bold text-center text-gray-900">What Our Users Say</h2>
        <blockquote className="mt-6 text-lg italic text-gray-600 text-center">
          "This file management system has transformed the way our team collaborates. Highly recommend!"
          <br />
          <span className="font-semibold">- Saz, Project Manager</span>
        </blockquote>
      </div>

      {/* FAQs Section */}
      <div className="mx-auto max-w-2xl py-8">
        <h2 className="text-3xl font-bold text-center text-gray-900">Frequently Asked Questions</h2>
        <div className="mt-6 text-lg text-gray-600">
          <p><strong>1. How do I upload files?</strong><br />You can easily upload files by clicking on the 'Upload' button after logging into your account.</p>
          <p><strong>2. Is my data secure?</strong><br />Yes, we prioritize your data security with advanced encryption methods.</p>
          <p><strong>3. Can I access my files on mobile?</strong><br />Absolutely! Our platform is mobile-friendly and allows access from any device.</p>
        </div>
      </div>
    </div>
  );
};

export default Learnmore;
