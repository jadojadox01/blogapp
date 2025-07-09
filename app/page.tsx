import { getPosts } from '@/lib/getPosts';
import Link from 'next/link';
import Image from 'next/image';

export default async function HomePage() {
  const posts = await getPosts(); // await here!

  const trendingPosts = posts.slice(0, 3);
  const otherPosts = posts.slice(3);

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
      {/* Hero / CTA Section */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-5xl font-extrabold" style={{ color: 'var(--foreground)' }}>
        Welcome to Skillnest
        </h1>
        <p className="text-lg" style={{ color: 'var(--foreground)' }}>
        Skillnest | Learn, Earn, Grow From Anywhere
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
        {[
          { href: '/about', title: 'About Me', desc: 'About Skillnest' },
          { href: '/blog/categories', title: 'Categories', desc: 'Browse posts by topics.' },
          { href: '/contact', title: 'Contact', desc: 'Get in touch with us.' },
        ].map(({ href, title, desc }) => (
          <Link
            key={href}
            href={href}
            className="p-6 border rounded-lg hover:shadow-lg transition"
            style={{
              background: 'var(--background)',
              color: 'var(--foreground)',
              borderColor: 'rgba(0,0,0,0.1)',
            }}
          >
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p>{desc}</p>
          </Link>
        ))}
      </section>

      {/* Trending Posts */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: 'var(--foreground)' }}>
          🔥 Trending Posts
        </h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-3">
          {trendingPosts.map(({ slug, frontmatter }) => (
            <Link
              key={slug}
              href={`/blog/${slug}`}
              className="group block rounded-xl overflow-hidden shadow-lg border transition-transform hover:-translate-y-1 hover:shadow-2xl"
              style={{
                background: 'var(--background)',
                color: 'var(--foreground)',
                borderColor: 'rgba(0,0,0,0.1)',
              }}
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
                <h3 className="text-xl font-semibold mb-2 line-clamp-2">{frontmatter.title}</h3>
                <time dateTime={frontmatter.date} className="block text-xs mb-3">
                  {new Date(frontmatter.date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
                <p className="text-sm line-clamp-3">{frontmatter.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* All Other Posts */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: 'var(--foreground)' }}>
          Latest Posts
        </h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {otherPosts.map(({ slug, frontmatter }) => (
            <Link
              key={slug}
              href={`/blog/${slug}`}
              className="group block rounded-xl overflow-hidden shadow border hover:shadow-lg transition"
              style={{
                background: 'var(--background)',
                color: 'var(--foreground)',
                borderColor: 'rgba(0,0,0,0.1)',
              }}
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
                <h3 className="text-lg font-semibold line-clamp-2">{frontmatter.title}</h3>
                <time dateTime={frontmatter.date} className="block text-xs mb-2">
                  {new Date(frontmatter.date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
                <p className="text-sm line-clamp-3">{frontmatter.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
