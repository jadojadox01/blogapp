'use client';

import React from 'react';

interface ShareButtonsProps {
  shareUrl: string;
  title: string;
}

export default function ShareButtons({ shareUrl, title }: ShareButtonsProps) {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-4">
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
        onClick={() => {
          if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(shareUrl);
            alert('Link copied to clipboard!');
          }
        }}
        className="underline cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
      >
        Copy Link
      </button>
    </div>
  );
}
