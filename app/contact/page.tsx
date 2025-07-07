/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // Here you can connect to your backend API or email service
      // For demo, just wait 1 second and simulate success
      await new Promise(res => setTimeout(res, 1000));

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-8 text-emerald-600 dark:text-emerald-400">Contact Us</h1>
      <p className="mb-10 text-gray-700 dark:text-gray-300">
        Have questions, feedback, or want to get in touch? Fill out the form below, and we’ll respond as soon as possible.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <div>
          <label htmlFor="name" className="block mb-2 font-semibold text-gray-800 dark:text-gray-200">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 font-semibold text-gray-800 dark:text-gray-200">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block mb-2 font-semibold text-gray-800 dark:text-gray-200">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Write your message here..."
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded shadow transition"
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>

        {status === 'success' && (
          <p className="mt-4 text-green-600 font-medium">Thank you! Your message has been sent.</p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-red-600 font-medium">Oops! Something went wrong. Please try again later.</p>
        )}
      </form>
    </main>
  );
}
