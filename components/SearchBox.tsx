'use client';

import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';

interface Post {
  slug: string;
  frontmatter: {
    title: string;
    description: string;
    coverImage: string;
  };
}

interface Props {
  posts: Post[];
}

export default function SearchBox({ posts }: Props) {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState<Post[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.trim() === '') {
      setFiltered([]);
      setShowDropdown(false);
      return;
    }
    const q = query.toLowerCase();
    const matches = posts.filter(post =>
      post.frontmatter.title.toLowerCase().includes(q)
    );
    setFiltered(matches.slice(0, 5)); // show top 5 matches
    setShowDropdown(matches.length > 0);
  }, [query, posts]);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-64 text-gray-900 dark:text-gray-100">
      <form onSubmit={e => e.preventDefault()} className="relative">
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
        />
        <input
          type="text"
          ref={inputRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => {
            if (filtered.length > 0) setShowDropdown(true);
          }}
          placeholder="Search posts..."
          className="w-full rounded-full pl-10 pr-4 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
        />
      </form>

      {/* Dropdown suggestions */}
      {showDropdown && (
        <div className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-72 overflow-auto">
          <h3 className="px-4 py-2 font-semibold border-b border-gray-200 dark:border-gray-700 text-sm text-emerald-600 dark:text-emerald-400">
            Must See Results
          </h3>

          {filtered.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              onClick={() => {
                setQuery('');
                setShowDropdown(false);
              }}
              className="flex items-center gap-3 px-4 py-3 hover:bg-emerald-100 dark:hover:bg-emerald-900 transition rounded-lg"
            >
              <Image
                src={post.frontmatter.coverImage}
                alt={post.frontmatter.title}
                width={50}
                height={50}
                className="rounded-md object-cover flex-shrink-0"
              />
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
                  {post.frontmatter.title}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                  {post.frontmatter.description}
                </p>
              </div>
            </Link>
          ))}

          {filtered.length === 0 && (
            <p className="p-4 text-gray-500 dark:text-gray-400 text-center">No results found</p>
          )}
        </div>
      )}
    </div>
  );
}
