import Link from 'next/link';
import { getPosts } from '@/lib/getPosts';

export default async function CategoriesPage() {
  const posts = await getPosts();

  // Extract unique categories
  const categories = Array.from(
    new Set(posts.map(post => post.frontmatter.category).filter(Boolean))
  ).sort();

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 min-h-screen font-montserrat">
      <h1 className="text-4xl font-bold mb-8 text-emerald-600 dark:text-emerald-400">
        Blog Categories
      </h1>

      {categories.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          No categories found.
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <li key={category} className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition p-6 cursor-pointer">
              <Link href={`/blog/categories/${encodeURIComponent(category.toLowerCase())}`} className="text-lg font-semibold text-emerald-700 dark:text-emerald-300 hover:underline">
                {category}
              </Link>
              <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                {
                  posts.filter(p => p.frontmatter.category === category).length
                } posts
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
