import { getMilestones } from "@/app/actions/admin-content";
import { AdminTimelineClient } from "@/components/admin/admin-timeline-client";

export const metadata = {
  title: "Construction Timeline | Dangracif Homes Admin",
};

export default async function AdminTimelinePage() {
  const milestones = await getMilestones();
  return <AdminTimelineClient initialMilestones={milestones} />;
}
