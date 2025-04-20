import { z } from "zod";
export const customerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone_number: z.string().min(10),
  location: z.string(),
  projects_completed: z.number().min(0),
  total_revenue: z.number().min(0),
  industry: z.string(),
  company_name: z.string().optional(), // Optional: if customer is a business
  preferred_contact_method: z.enum(["email", "phone", "whatsapp"]).optional(),
  notes: z.string().optional(),
  is_active: z.boolean().optional(),
  // Additional notes or history
});
