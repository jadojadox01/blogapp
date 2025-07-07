import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface Frontmatter {
  category: any;
  title: string;
  date: string;
  description: string;
  coverImage: string;
}

export interface Post {
  slug: string;
  frontmatter: Frontmatter;
}

export function getPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => {
    const slug = filename.replace(/\.md$/, '');
    const filePath = path.join(postsDirectory, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter } = matter(fileContent);
    return {
      slug,
      frontmatter: frontmatter as Frontmatter,
    };
  });
}
