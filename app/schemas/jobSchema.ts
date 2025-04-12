import { z } from "zod";

export const jobSchema = z.object({
  job_title: z
    .string()
    .min(1, "Job title is required")
    .max(25, "Maximum 25 character allowed"),
  company: z.string().min(1, "Company name is required"),
  city: z.string().min(1, "City is required"),
  date_applied: z.string().min(1, "Date applied is required"),
  location_type: z.enum(["remote", "on site", "hybrid"], {
    errorMap: () => ({ message: "Please select remote | hybrid | on-site." }),
  }),
  status: z.enum(["applied", "interview", "on hold", "unsuccessful"], {
    errorMap: () => ({ message: "Please select the applciation status." }),
  }),
  contract: z.enum(["permanent", "contract", "freelance", "part-time"], {
    errorMap: () => ({ message: "Please select a valid contract type." }),
  }),
});

export const testSchema = z.object({
  firstName: z
    .string()
    .min(1, "first name is required")
    .max(15, "maximum 15 character allowed"),
  lastName: z.string().min(1, "last name is required"),
});
