"use server";

import "reflect-metadata";
import { revalidatePath } from "next/cache";
import { getDatabaseConnection } from "@/lib/db/data-source";
import { BlogPost, BlogPostSchema } from "@/lib/db/entities/BlogPost";
import { FaqItem, FaqItemSchema } from "@/lib/db/entities/FaqItem";
import { ConstructionMilestone, ConstructionMilestoneSchema } from "@/lib/db/entities/ConstructionMilestone";
import { SiteConfig, SiteConfigSchema } from "@/lib/db/entities/SiteConfig";
import { MediaAsset, MediaAssetSchema } from "@/lib/db/entities/MediaAsset";
import { getAdminSession } from "@/lib/auth";
import { deleteFromCloudinary } from "@/lib/cloudinary";
import { ILike } from "typeorm";

function toPlain<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

async function requireAuth() {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Unauthorized. Please log in.");
  }
  return session;
}

/* =========================================================================
 * 1. BLOG POSTS
 * ========================================================================= */

export async function getBlogPosts(search?: string) {
  await requireAuth();
  const ds = await getDatabaseConnection();
  const repo = ds.getRepository(BlogPostSchema);

  const whereClause = search
    ? [{ title: ILike(`%${search}%`) }, { summary: ILike(`%${search}%`) }]
    : {};

  const posts = await repo.find({
    where: whereClause,
    order: { createdAt: "DESC" },
  });

  return toPlain(posts);
}

export async function getBlogPostById(id: string) {
  await requireAuth();
  const ds = await getDatabaseConnection();
  const repo = ds.getRepository(BlogPostSchema);
  const post = await repo.findOne({ where: { id } });
  return post ? toPlain(post) : null;
}

export async function saveBlogPost(data: {
  id?: string;
  title: string;
  summary?: string;
  expandedContent?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageCaption?: string;
  date?: string;
  linkText?: string;
  linkHref?: string;
  published?: boolean;
}) {
  await requireAuth();
  const ds = await getDatabaseConnection();
  const repo = ds.getRepository(BlogPostSchema);

  let post: BlogPost;
  if (data.id) {
    const existing = await repo.findOne({ where: { id: data.id } });
    if (!existing) throw new Error("Blog post not found");
    post = repo.merge(existing, {
      ...data,
      published: data.published ?? true,
    });
  } else {
    post = repo.create({
      ...data,
      summary: data.summary || "",
      expandedContent: data.expandedContent || "",
      imageSrc: data.imageSrc || "",
      imageAlt: data.imageAlt || "",
      imageCaption: data.imageCaption || "",
      date: data.date || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      linkText: data.linkText || "Read Article",
      linkHref: data.linkHref || "#",
      published: data.published ?? true,
    });
  }

  const saved = await repo.save(post);
  revalidatePath("/");
  revalidatePath("/admin/blog");
  return toPlain(saved);
}

export async function deleteBlogPost(id: string) {
  await requireAuth();
  const ds = await getDatabaseConnection();
  const repo = ds.getRepository(BlogPostSchema);
  await repo.delete({ id });
  revalidatePath("/");
  revalidatePath("/admin/blog");
  return { success: true };
}

export async function toggleBlogPostPublished(id: string) {
  await requireAuth();
  const ds = await getDatabaseConnection();
  const repo = ds.getRepository(BlogPostSchema);
  const post = await repo.findOne({ where: { id } });
  if (!post) throw new Error("Blog post not found");

  post.published = !post.published;
  const saved = await repo.save(post);
  revalidatePath("/");
  revalidatePath("/admin/blog");
  return toPlain(saved);
}

/* =========================================================================
 * 2. FAQ ITEMS
 * ========================================================================= */

export async function getFaqItems(search?: string) {
  await requireAuth();
  const ds = await getDatabaseConnection();
  const repo = ds.getRepository(FaqItemSchema);

  const whereClause = search
    ? [{ question: ILike(`%${search}%`) }, { answer: ILike(`%${search}%`) }]
    : {};

  const items = await repo.find({
    where: whereClause,
    order: { sortOrder: "ASC", createdAt: "ASC" },
  });

  return toPlain(items);
}

export async function saveFaqItem(data: {
  id?: string;
  question: string;
  answer: string;
  sortOrder?: number;
  published?: boolean;
}) {
  await requireAuth();
  const ds = await getDatabaseConnection();
  const repo = ds.getRepository(FaqItemSchema);

  let faq: FaqItem;
  if (data.id) {
    const existing = await repo.findOne({ where: { id: data.id } });
    if (!existing) throw new Error("FAQ item not found");
    faq = repo.merge(existing, {
      ...data,
      published: data.published ?? true,
    });
  } else {
    // calculate next sortOrder
    const count = await repo.count();
    faq = repo.create({
      ...data,
      sortOrder: data.sortOrder ?? count,
      published: data.published ?? true,
    });
  }

  const saved = await repo.save(faq);
  revalidatePath("/");
  revalidatePath("/admin/faqs");
  return toPlain(saved);
}

export async function deleteFaqItem(id: string) {
  await requireAuth();
  const ds = await getDatabaseConnection();
  const repo = ds.getRepository(FaqItemSchema);
  await repo.delete({ id });
  revalidatePath("/");
  revalidatePath("/admin/faqs");
  return { success: true };
}

export async function toggleFaqPublished(id: string) {
  await requireAuth();
  const ds = await getDatabaseConnection();
  const repo = ds.getRepository(FaqItemSchema);
  const item = await repo.findOne({ where: { id } });
  if (!item) throw new Error("FAQ item not found");

  item.published = !item.published;
  const saved = await repo.save(item);
  revalidatePath("/");
  revalidatePath("/admin/faqs");
  return toPlain(saved);
}

/* =========================================================================
 * 3. CONSTRUCTION MILESTONES
 * ========================================================================= */

export async function getMilestones() {
  await requireAuth();
  const ds = await getDatabaseConnection();
  const repo = ds.getRepository(ConstructionMilestoneSchema);
  const items = await repo.find({
    order: { phaseNumber: "ASC" },
  });
  return toPlain(items);
}

export async function saveMilestone(data: {
  id?: string;
  phaseNumber: number;
  date: string;
  title: string;
}) {
  await requireAuth();
  const ds = await getDatabaseConnection();
  const repo = ds.getRepository(ConstructionMilestoneSchema);

  let milestone: ConstructionMilestone;
  if (data.id) {
    const existing = await repo.findOne({ where: { id: data.id } });
    if (!existing) throw new Error("Milestone not found");
    milestone = repo.merge(existing, data);
  } else {
    milestone = repo.create(data);
  }

  const saved = await repo.save(milestone);
  revalidatePath("/");
  revalidatePath("/admin/timeline");
  return toPlain(saved);
}

export async function deleteMilestone(id: string) {
  await requireAuth();
  const ds = await getDatabaseConnection();
  const repo = ds.getRepository(ConstructionMilestoneSchema);
  await repo.delete({ id });
  revalidatePath("/");
  revalidatePath("/admin/timeline");
  return { success: true };
}

/* =========================================================================
 * 4. SITE CONFIGURATION
 * ========================================================================= */

export async function getSiteConfigs(): Promise<Record<string, any>> {
  await requireAuth();
  const ds = await getDatabaseConnection();
  const repo = ds.getRepository(SiteConfigSchema);
  const configs = await repo.find();

  const result: Record<string, any> = {};
  for (const item of configs) {
    try {
      result[item.key] = JSON.parse(item.value);
    } catch {
      result[item.key] = item.value;
    }
  }
  return result;
}

export async function saveSiteConfig(key: string, value: any) {
  await requireAuth();
  const ds = await getDatabaseConnection();
  const repo = ds.getRepository(SiteConfigSchema);

  const stringVal = typeof value === "string" ? value : JSON.stringify(value);
  let item = await repo.findOne({ where: { key } });

  if (item) {
    item.value = stringVal;
  } else {
    item = repo.create({ key, value: stringVal });
  }

  await repo.save(item);
  revalidatePath("/");
  revalidatePath("/admin/site-config");
  return { success: true, key, value };
}

export async function saveMultipleSiteConfigs(configs: Record<string, any>) {
  await requireAuth();
  const ds = await getDatabaseConnection();
  const repo = ds.getRepository(SiteConfigSchema);

  for (const [key, val] of Object.entries(configs)) {
    const stringVal = typeof val === "string" ? val : JSON.stringify(val);
    let item = await repo.findOne({ where: { key } });
    if (item) {
      item.value = stringVal;
    } else {
      item = repo.create({ key, value: stringVal });
    }
    await repo.save(item);
  }

  revalidatePath("/");
  revalidatePath("/admin/site-config");
  return { success: true };
}

/* =========================================================================
 * 5. MEDIA ASSETS
 * ========================================================================= */

export async function getMediaAssets(folder?: string, search?: string) {
  await requireAuth();
  const ds = await getDatabaseConnection();
  const repo = ds.getRepository(MediaAssetSchema);

  const where: any = {};
  if (folder && folder !== "all") {
    where.folder = folder;
  }
  if (search) {
    where.name = ILike(`%${search}%`);
  }

  const assets = await repo.find({
    where,
    order: { createdAt: "DESC" },
  });

  return toPlain(assets);
}

export async function deleteMediaAsset(id: string) {
  await requireAuth();
  const ds = await getDatabaseConnection();
  const repo = ds.getRepository(MediaAssetSchema);

  const asset = await repo.findOne({ where: { id } });
  if (!asset) throw new Error("Media asset not found");

  if (asset.cloudinaryPublicId) {
    await deleteFromCloudinary(asset.cloudinaryPublicId);
  }

  await repo.delete({ id });
  revalidatePath("/admin/media");
  return { success: true };
}
