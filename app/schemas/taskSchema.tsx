// schemas.ts
import { z } from "zod";

export const taskSchema = z.object({
  id: z.string().optional(),
  task_title: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(["todo", "in progress", "done"]),
  priority: z.enum(["low", "medium", "high"]),
  due_date: z.coerce.date({
    errorMap: () => ({
      message: "Date is required and must be a valid date",
    }),
  }),
});
