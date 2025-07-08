import { getPosts } from '@/lib/getPosts';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface SearchParams {
  page?: string;
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedSearchParams = await searchParams;

  const posts = await getPosts();

  const page = parseInt(resolvedSearchParams.page || '1');
  const postsPerPage = 6;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  if (page < 1 || page > totalPages) notFound();

  const start = (page - 1) * postsPerPage;
  const paginatedPosts = posts.slice(start, start + postsPerPage);

  return (
    <main className="max-w-7xl mx-auto px-4 py-16 min-h-screen font-montserrat">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
          Latest Blog Posts
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Explore tutorials, stories & insights from Jean’s Blog
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-12">
        {paginatedPosts.map(({ slug, frontmatter }) => (
          <Link key={slug} href={`/blog/${slug}`} className="group">
            <div className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all border dark:border-gray-700 bg-white dark:bg-gray-900">
              <Image
                src={frontmatter.coverImage}
                alt={frontmatter.title}
                width={800}
                height={400}
                className="w-full h-48 object-cover group-hover:scale-[1.02] transition-transform"
              />
              <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                  {frontmatter.title}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  {frontmatter.date}
                </p>
                <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
                  {frontmatter.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 text-sm">
        {page > 1 && (
          <Link
            href={`/blog?page=${page - 1}`}
            className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 transition"
          >
            ← Previous
          </Link>
        )}

        <span className="text-gray-700 dark:text-gray-300">
          Page {page} of {totalPages}
        </span>

        {page < totalPages && (
          <Link
            href={`/blog?page=${page + 1}`}
            className="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 transition"
          >
            Next →
          </Link>
        )}
      </div>
    </main>
  );
}
