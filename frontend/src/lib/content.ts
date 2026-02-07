import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

marked.setOptions({
  breaks: true,
});

export type SectionContent = {
  data: Record<string, unknown>;
  html: string;
};

export async function getSectionContent(slug: string): Promise<SectionContent> {
  const filePath = path.join(process.cwd(), "content", `${slug}.md`);
  const source = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(source);
  const html = marked.parse(content) as string;

  return { data, html };
}
