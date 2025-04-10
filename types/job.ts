export type Job = {
  id?: string;
  description: string;
  company: string;
  location: string;
  date_applied: string;
  job_details: string[];
  status: "applied" | "interview" | "on hold" | "failed";
};
