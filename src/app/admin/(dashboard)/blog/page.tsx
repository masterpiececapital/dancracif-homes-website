import { getBlogPosts } from "@/app/actions/admin-content";
import { AdminBlogClient } from "@/components/admin/admin-blog-client";

export const metadata = {
  title: "Blog Management | Dangracif Homes Admin",
};

export default async function AdminBlogPage() {
  const posts = await getBlogPosts();
  return <AdminBlogClient initialPosts={posts} />;
}
