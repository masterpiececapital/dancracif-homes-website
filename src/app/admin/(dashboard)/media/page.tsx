import { redirect } from "next/navigation";

export default function AdminMediaPage() {
  redirect("/admin/site-config?tab=images");
}
