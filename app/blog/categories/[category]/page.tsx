import Link from 'next/link';
import { getPosts } from '@/lib/getPosts';

interface Params {
  category: string;
}

export default async function CategoryPostsPage({ params }: { params: Params }) {
  const { category } = params;
  const posts = await getPosts();

  // Filter posts by category (case insensitive)
  const filteredPosts = posts.filter(
    (post) => post.frontmatter.category?.toLowerCase() === category.toLowerCase()
  );

  if (filteredPosts.length === 0) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">
          No posts found in "{category}"
        </h1>
        <Link href="/blog/categories" className="text-emerald-600 dark:text-emerald-400 hover:underline">
          Back to categories
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-emerald-600 dark:text-emerald-400">
        Posts in "{category}"
      </h1>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map(({ slug, frontmatter }) => (
          <Link
            key={slug}
            href={`/blog/${slug}`}
            className="group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition border dark:border-gray-700 bg-white dark:bg-gray-900"
          >
            <img
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
          </Link>
        ))}
      </div>
    </main>
  );
}
