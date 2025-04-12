import { useForm } from "react-hook-form";
import { ZodSchema, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export function useZodForm<T extends ZodSchema>(schema: T) {
  return useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });
}
