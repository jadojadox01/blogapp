'use client'; // This directive makes this a Client Component

import React from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface Props {
  headings: Heading[];
  shareUrl: string;
  title: string;
}

export default function PostSidebar({ headings, shareUrl, title }: Props) {
  // copy link handler
  function copyLink() {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    }
  }

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-24 max-h-[calc(100vh-96px)] overflow-auto w-64 flex-shrink-0 border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-900"
    >
      <h2 className="text-lg font-semibold mb-4">Contents</h2>
      <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
        {headings.map(({ id, text, level }) => (
          <li
            key={id}
            className={`ml-${(level - 2) * 4} hover:text-blue-600 dark:hover:text-blue-400`}
          >
            <a href={`#${id}`} className="block truncate">
              {text}
            </a>
          </li>
        ))}
      </ul>

      {/* Share Buttons */}
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <span className="font-semibold mr-2">Share:</span>

        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
            shareUrl
          )}&text=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700 underline"
        >
          Twitter
        </a>

        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shareUrl
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:text-blue-900 underline"
        >
          Facebook
        </a>

        <button
          onClick={copyLink}
          className="underline cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          type="button"
        >
          Copy Link
        </button>
      </div>
    </nav>
  );
}
