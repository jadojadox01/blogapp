import { getPosts } from '@/lib/getPosts';
import Link from 'next/link';
import Image from 'next/image';

// For demo, trending posts = latest 3 posts (you can customize)
export default function HomePage() {
  const posts = getPosts();

  const trendingPosts = posts.slice(0, 3); // first 3 as trending
  const otherPosts = posts.slice(3); // rest of the posts

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
      {/* Hero / CTA Section */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-5xl font-extrabold text-blue-700 dark:text-blue-300">
          Welcome to Jean’s Blog
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Discover insightful articles on technology, programming, and more.
        </p>
        <Link
          href="/blog"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Explore All Posts
        </Link>
      </section>

      {/* Quick Links */}
      <section className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <Link
          href="/about"
          className="p-6 border rounded-lg hover:shadow-lg transition bg-white dark:bg-gray-900 dark:border-gray-700"
        >
          <h2 className="text-xl font-semibold mb-2">About Me</h2>
          <p className="text-gray-600 dark:text-gray-400">Learn about Jean&apos;s journey.</p>
        </Link>
        <Link
          href="/blog/categories"
          className="p-6 border rounded-lg hover:shadow-lg transition bg-white dark:bg-gray-900 dark:border-gray-700"
        >
          <h2 className="text-xl font-semibold mb-2">Categories</h2>
          <p className="text-gray-600 dark:text-gray-400">Browse posts by topics.</p>
        </Link>
        <Link
          href="/contact"
          className="p-6 border rounded-lg hover:shadow-lg transition bg-white dark:bg-gray-900 dark:border-gray-700"
        >
          <h2 className="text-xl font-semibold mb-2">Contact</h2>
          <p className="text-gray-600 dark:text-gray-400">Get in touch with me.</p>
        </Link>
      </section>

      {/* Trending Posts */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white text-center">
          🔥 Trending Posts
        </h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-3">
          {trendingPosts.map(({ slug, frontmatter }) => (
            <Link
              key={slug}
              href={`/blog/${slug}`}
              className="group block rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 transition-transform hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={frontmatter.coverImage}
                  alt={frontmatter.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={true}
                />
              </div>

              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {frontmatter.title}
                </h3>
                <time
                  dateTime={frontmatter.date}
                  className="block text-xs text-gray-500 dark:text-gray-400 mb-3"
                >
                  {new Date(frontmatter.date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
                <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
                  {frontmatter.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* All Other Posts */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white text-center">
          Latest Posts
        </h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {otherPosts.map(({ slug, frontmatter }) => (
            <Link
              key={slug}
              href={`/blog/${slug}`}
              className="group block rounded-xl overflow-hidden shadow hover:shadow-lg transition border dark:border-gray-700 bg-white dark:bg-gray-900"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={frontmatter.coverImage}
                  alt={frontmatter.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold dark:text-white line-clamp-2">
                  {frontmatter.title}
                </h3>
                <time
                  dateTime={frontmatter.date}
                  className="block text-xs text-gray-500 dark:text-gray-400 mb-2"
                >
                  {new Date(frontmatter.date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
                <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
                  {frontmatter.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
