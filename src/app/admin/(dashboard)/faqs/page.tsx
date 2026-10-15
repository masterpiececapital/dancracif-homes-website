import { getFaqItems } from "@/app/actions/admin-content";
import { AdminFaqsClient } from "@/components/admin/admin-faqs-client";

export const metadata = {
  title: "FAQs Management | Dancracif Homes Admin",
};

export default async function AdminFaqsPage() {
  const items = await getFaqItems();
  return <AdminFaqsClient initialItems={items} />;
}
