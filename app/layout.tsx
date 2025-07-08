// app/layout.tsx
import './globals.css';
import Link from 'next/link';
import DarkModeToggle from '@/components/DarkModeToggle';
import SearchBox from '@/components/SearchBox';
import { getPosts } from '@/lib/getPosts';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const posts = await getPosts();

  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-montserrat min-h-screen flex flex-col transition-colors duration-300">
        
        {/* Header Navigation */}
        <header className="bg-emerald-600 dark:bg-emerald-700 shadow-lg">
          <nav className="max-w-6xl mx-auto flex flex-wrap items-center justify-between px-4 py-4 gap-10 py-6">
            {/* Logo */}
            <Link
              href="/"
              className="text-2xl font-extrabold tracking-tight transition transform hover:scale-105 hover:text-white"
            >
              Jean’s Blog
            </Link>

            {/* Nav + Search */}
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 text-sm font-medium">
              <Link
                href="/"
                className="transition hover:text-white hover:no-underline hover:brightness-110"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="transition hover:text-white hover:no-underline hover:brightness-110"
              >
                About
              </Link>
              <Link
                href="/blog"
                className="transition hover:text-white hover:no-underline hover:brightness-110"
              >
                Blog
              </Link>
              {/* Responsive Search */}
              <div className="w-full sm:w-auto">
                <SearchBox posts={posts} />
              </div>
            </div>

            {/* Dark Mode Toggle (pushed to right on larger screens) */}
            <div className="ml-auto sm:ml-0">
              <DarkModeToggle />
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-grow w-full max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 border-t border-slate-700 text-center py-6 shadow-inner px-4">
          <p className="mb-2 text-gray-300 text-sm sm:text-base">
            © 2025 Jean’s Blog. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 text-sm">
          <Link
  href="/terms"
  className="text-gray-300 transition hover:underline hover:text-white"
>
  Terms & Conditions
</Link>
<Link
  href="/privacy-policy"
  className="text-gray-300 transition hover:underline hover:text-white"
>
  Privacy Policy
</Link>

          </div>
        </footer>
        
      </body>
    </html>
  );
}
