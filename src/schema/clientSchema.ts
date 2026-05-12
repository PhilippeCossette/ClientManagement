import { email, z } from "zod";

export const ClientSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: email("Invalid email address"),
  company: z.string(),
  budget: z.number().positive("Budget must be a positive number"),
  status: z.enum(["new", "contacted", "closed"]),
});
