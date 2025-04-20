// schemas.ts
import { z } from "zod";

import { jobSchema } from "./jobSchema";
import { projectSchema } from "./projectSchema";
import { loginSchema } from "./loginSchema";
import { taskSchema } from "./taskSchema";
import {
  registerSchema,
  confirmSignUpSchema,
  resendCodeSchema,
} from "./registerSchema";
import { customerSchema } from "./customerSchema";

type Task = z.infer<typeof taskSchema>;
type Job = z.infer<typeof jobSchema>;
type Project = z.infer<typeof projectSchema>;
type Customer = z.infer<typeof customerSchema>;

export {
  taskSchema,
  jobSchema,
  projectSchema,
  loginSchema,
  registerSchema,
  confirmSignUpSchema,
  resendCodeSchema,
};

export type { Task, Job, Project, Customer };
