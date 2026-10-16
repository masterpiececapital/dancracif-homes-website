"use client";

import * as React from "react";
import { MessageSquare, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UNIT_OPTIONS } from "@/constants/navigation";
import { InspectionFormData } from "@/types";

interface InspectionFormProps {
  onSubmitWhatsApp?: (data: InspectionFormData) => void;
  onSubmitEmail?: (data: InspectionFormData) => void;
}

export const InspectionForm: React.FC<InspectionFormProps> = ({
  onSubmitWhatsApp,
  onSubmitEmail,
}) => {
  const [formData, setFormData] = React.useState<InspectionFormData>({
    fullName: "",
    phone: "",
    email: "",
    unitType: "2-bed",
    preferredDate: "",
    message: "",
  });

  const handleChange = (
    field: keyof InspectionFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmitWhatsApp) {
      onSubmitWhatsApp(formData);
    } else {
      // Default WhatsApp share
      const text = `Hello Dangracif Homes, I would like to book an inspection for Fidelis Court.\n\nName: ${formData.fullName}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nUnit: ${formData.unitType}\nDate: ${formData.preferredDate}\nMessage: ${formData.message || "N/A"}`;
      window.open(
        `https://wa.me/2348000000000?text=${encodeURIComponent(text)}`,
        "_blank"
      );
    }
  };

  const handleEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmitEmail) {
      onSubmitEmail(formData);
    } else {
      const subject = `Inspection Booking - ${formData.fullName} (Fidelis Court)`;
      const body = `Name: ${formData.fullName}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nUnit: ${formData.unitType}\nDate: ${formData.preferredDate}\nMessage: ${formData.message || "N/A"}`;
      window.location.href = `mailto:sales@dangracifhomes.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
    }
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-10 border border-zinc-100 dark:border-zinc-800 shadow-xl shadow-zinc-200/40 dark:shadow-black/20">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Book Inspection
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1.5">
          Choose a date and we&apos;ll confirm your visit to Fidelis Court, Kubwa F01.
        </p>
      </div>

      <form className="space-y-5">
        {/* Full Name */}
        <Input
          label="Full name"
          placeholder="e.g. John Doe"
          value={formData.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
          required
        />

        {/* Phone & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Phone / WhatsApp"
            type="tel"
            placeholder="+234..."
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            required
          />

          <Input
            label="Email"
            type="email"
            placeholder="name@domain.com"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
        </div>

        {/* Unit Type & Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Unit type"
            value={formData.unitType}
            onChange={(e) => handleChange("unitType", e.target.value)}
            options={UNIT_OPTIONS.map((u) => ({
              label: u.label,
              value: u.value,
            }))}
          />

          <Input
            label="Preferred inspection date"
            type="date"
            value={formData.preferredDate}
            onChange={(e) => handleChange("preferredDate", e.target.value)}
            required
          />
        </div>

        {/* Message */}
        <Textarea
          label="Message (optional)"
          placeholder="Any specific questions or request..."
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
        />

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3.5 pt-2">
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={handleWhatsApp}
            leftIcon={<MessageSquare className="h-4 w-4" />}
          >
            Send via WhatsApp
          </Button>

          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={handleEmail}
            leftIcon={<Mail className="h-4 w-4" />}
          >
            Send via Email
          </Button>
        </div>
      </form>
    </div>
  );
};
