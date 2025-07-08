import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { visit } from 'unist-util-visit';
import type { Root, Heading as MdastHeading, Text, InlineCode } from 'mdast';

interface Heading {
  id: string;
  text: string;
  level: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

async function extractHeadings(markdown: string): Promise<Heading[]> {
  const headings: Heading[] = [];

  await remark()
    .use(remarkParse)
    .use(() => (tree: Root) => {
      visit(tree, 'heading', (node: MdastHeading) => {
        if (node.depth >= 2 && node.depth <= 4) {
          const text = node.children
            .filter(
              (child): child is Text | InlineCode =>
                child.type === 'text' || child.type === 'inlineCode'
            )
            .map((child) => child.value)
            .join('');
          const id = slugify(text);
          headings.push({ id, text, level: node.depth });
        }
      });
    })
    .process(markdown);

  return headings;
}

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), 'posts');
  const files = fs.readdirSync(postsDir);

  return files.map((filename) => ({
    slug: filename.replace(/\.md$/, ''),
  }));
}

type BlogPostProps = {
  params: {
    slug: string;
  };
};

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;

  const filePath = path.join(process.cwd(), 'posts', `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data: frontmatter, content } = matter(fileContent);

  if (
    !frontmatter.title ||
    !frontmatter.date ||
    !frontmatter.coverImage ||
    !frontmatter.description
  ) {
    throw new Error('Missing required frontmatter fields in markdown.');
  }

  const headings = await extractHeadings(content);

  const processedContent = await remark()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(content);

  const contentHtml = processedContent.toString();

  return (
    <main className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-10">
      {/* Table of Contents Sidebar */}
      <nav
        aria-label="Table of contents"
        className="hidden lg:block sticky top-24 max-h-[calc(100vh-96px)] overflow-auto w-64 flex-shrink-0 border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-900"
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
      </nav>

      {/* Main Article */}
      <article className="prose prose-lg max-w-none flex-grow dark:prose-invert">
        <h1 className="mb-2">{frontmatter.title}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{frontmatter.date}</p>
        <Image
          src={frontmatter.coverImage}
          alt={frontmatter.title}
          width={1200}
          height={600}
          className="rounded-xl mb-8 w-full max-h-96 object-cover"
        />
        <section
          dangerouslySetInnerHTML={{ __html: contentHtml }}
          className="max-w-none"
        />
      </article>
    </main>
  );
}
