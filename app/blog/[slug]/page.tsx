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
import type { Heading as MdastHeading, Literal } from 'mdast';

import PostSidebar from '@/components/PostSidebar';

type Props = {
  params: {
    slug: string;
  };
};

interface Frontmatter {
  title: string;
  date: string;
  description: string;
  coverImage: string;
}

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
    .use(() => (tree) => {
      visit(tree, 'heading', (node: MdastHeading) => {
        if (node.depth >= 2 && node.depth <= 4) {
          const text = (node.children as Literal[])
            .filter((child) => child.type === 'text' || child.type === 'inlineCode')
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

export default async function BlogPost({ params }: Props) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'posts', `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data: frontmatter, content } = matter(fileContent) as unknown as {
    data: Frontmatter;
    content: string;
  };

  const requiredFields: (keyof Frontmatter)[] = ['title', 'date', 'coverImage', 'description'];
  for (const field of requiredFields) {
    if (!frontmatter[field]) {
      throw new Error(`Missing frontmatter field: ${field}`);
    }
  }

  const headings = await extractHeadings(content);

  const processedContent = await remark()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(content);

  const contentHtml = processedContent.toString();
  const shareUrl = `https://yourdomain.com/blog/${slug}`;

  return (
    <main className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-10">
      <aside className="hidden lg:block">
        <PostSidebar headings={headings} shareUrl={shareUrl} title={frontmatter.title} />
      </aside>

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
