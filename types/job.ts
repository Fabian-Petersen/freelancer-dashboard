export type Job = {
  id?: string;
  job_title: string;
  company: string;
  city: string;
  date_applied: string;
  location_type: "" | "remote" | "on site" | "hybrid";
  status: "" | "applied" | "interview" | "on hold" | "unsuccessful";
  contract: "" | "permanent" | "contract" | "freelance" | "part-time";
  // tags?: string[];
};
