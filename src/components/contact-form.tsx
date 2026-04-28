"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { RevealSubheading } from "@/components/reveal-title";

type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: ContactFormValues) => {
    setServerError(null);
    setSubmitted(false);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const payload = (await res.json().catch(() => ({}))) as {
      error?: string;
    };

    if (!res.ok) {
      setServerError(payload.error ?? "Failed to send. Please try again.");
      return;
    }

    setSubmitted(true);
    reset();
  };

  return (
    <div className="col-span-12 border-t hairline pt-8">
      <div className="mb-6 grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-8">
          <RevealSubheading>
            <p className="max-w-2xl font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-[var(--ash)]">
              Send your project brief here. I usually reply within 24 to 48 hours.
            </p>
          </RevealSubheading>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-12 gap-4 md:gap-5"
        data-no-scramble="true"
      >
        <div className="col-span-12 md:col-span-6">
          <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ash)]">
            Name
          </label>
          <input
            {...register("name", { required: "Please enter your name." })}
            type="text"
            className="w-full border hairline bg-[var(--paper)] px-3 py-3 text-sm outline-none transition-colors focus:border-[var(--foreground)]"
            placeholder="Your name"
          />
          {errors.name ? (
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ash)]">
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div className="col-span-12 md:col-span-6">
          <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ash)]">
            Email
          </label>
          <input
            {...register("email", {
              required: "Please enter your email.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address.",
              },
            })}
            type="email"
            className="w-full border hairline bg-[var(--paper)] px-3 py-3 text-sm outline-none transition-colors focus:border-[var(--foreground)]"
            placeholder="you@email.com"
          />
          {errors.email ? (
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ash)]">
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <div className="col-span-12">
          <label className="mb-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ash)]">
            Message
          </label>
          <textarea
            {...register("message", {
              required: "Share your project details.",
              minLength: {
                value: 20,
                message: "Please provide at least 20 characters.",
              },
            })}
            rows={6}
            className="w-full resize-y border hairline bg-[var(--paper)] px-3 py-3 text-sm outline-none transition-colors focus:border-[var(--foreground)]"
            placeholder="Goals, scope, and references..."
          />
          {errors.message ? (
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ash)]">
              {errors.message.message}
            </p>
          ) : null}
        </div>

        <div className="col-span-12 mt-1 flex items-center justify-between gap-4">
          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className="btn-accent-strong inline-flex items-center border hairline bg-[var(--foreground)] px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--background)] transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
          {submitted ? (
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--ash)]">
              Message sent. I&apos;ll get back to you soon.
            </p>
          ) : null}
        </div>
        {serverError ? (
          <p className="col-span-12 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ash)]">
            {serverError}
          </p>
        ) : null}
        <p className="col-span-12 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ash)]">
          After sending: I review your brief, reply with next steps, then we align on scope and schedule.
        </p>
      </form>
    </div>
  );
}
