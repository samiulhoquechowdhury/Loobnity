// components/sections/contact-form.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email address"),
  company: z.string().optional(),
  budget: z.enum(["under-20k", "20k-50k", "50k-150k", "150k-plus"]).optional(),
  message: z.string().min(20, "Tell us a bit more about the project"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const inputClasses =
  "w-full rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-secondary focus:border-accent transition-colors";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(values: ContactFormValues) {
    // TODO: wire to a real endpoint (API route, form service, or CRM).
    await new Promise((resolve) => setTimeout(resolve, 900));
    console.log(values);
    reset();
  }

  if (isSubmitSuccessful) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-start justify-center rounded-lg border border-border bg-card p-10"
      >
        <CheckCircle2 className="h-8 w-8 text-accent" strokeWidth={1.5} />
        <h2 className="mt-5 text-xl font-medium tracking-tight text-foreground">
          Message sent.
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-secondary">
          Thanks for reaching out. We'll be in touch within one business day.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-lg border border-border bg-card p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm text-secondary">
            Full name
          </label>
          <input
            id="name"
            type="text"
            className={inputClasses}
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm text-secondary">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={inputClasses}
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="company" className="mb-2 block text-sm text-secondary">
          Company (optional)
        </label>
        <input
          id="company"
          type="text"
          className={inputClasses}
          {...register("company")}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="budget" className="mb-2 block text-sm text-secondary">
          Estimated budget (optional)
        </label>
        <select id="budget" className={inputClasses} {...register("budget")}>
          <option value="">Select a range</option>
          <option value="under-20k">Under $20k</option>
          <option value="20k-50k">$20k – $50k</option>
          <option value="50k-150k">$50k – $150k</option>
          <option value="150k-plus">$150k+</option>
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="mb-2 block text-sm text-secondary">
          Project details
        </label>
        <textarea
          id="message"
          rows={5}
          className={`${inputClasses} resize-none`}
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1.5 text-xs text-red-400">
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-7 flex w-full items-center justify-center gap-2 rounded-md bg-accent px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting && (
          <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
        )}
        {isSubmitting ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
