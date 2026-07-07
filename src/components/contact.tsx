import { useState, type FormEvent, useRef } from "react";
import { Mail, Phone, Linkedin, Github, MapPin, Send, Check, Loader2 } from "lucide-react";
import { FadeUp, MagneticButton } from "./motion-primitives";
import emailjs from "@emailjs/browser";

const info = [
  {
    Icon: Mail,
    label: "Email",
    value: "sayhamkayes@gmail.com",
    href: "mailto:sayhamkayes@gmail.com",
    target: "_blank",
  },
  {
    Icon: Phone,
    label: "Phone",
    value: "(+880) 193 957 4147",
    href: "tel:+8801939574147",
    target: "_blank",
  },
  {
    Icon: Linkedin,
    label: "LinkedIn",
    value: "/in/sayhamkayes",
    href: "https://www.linkedin.com/in/sayhamkayes/",
    target: "_blank",
  },
  {
    Icon: Github,
    label: "GitHub",
    value: "@SayhamKayes",
    href: "https://github.com/SayhamKayes",
    target: "_blank",
  },
  {
    Icon: MapPin,
    label: "Location",
    value: "Dhaka, Bangladesh",
    href: "https://maps.app.goo.gl/baGXiKXHwPZuFd6g6",
    target: "_blank",
  },
];

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null); // 1. Created Form Reference
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        e.currentTarget,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      setSent(true);
      e.currentTarget.reset();
      setTimeout(() => setSent(false), 4000);
    } catch (error) {
      console.error("Failed to route contact message:", error);
      alert(
        "Something went wrong while delivering your message. Please reach out directly via email!",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-32">
      <div className="absolute left-1/2 top-1/4 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-purple-glow/15 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <FadeUp className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-cyan">Contact</p>
          <h2 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Let's <span className="text-gradient">Work Together</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            I'm currently accepting select projects and collaborations. Drop a message — I'll get
            back within 24 hours.
          </p>
        </FadeUp>

        <div className="mt-20 grid gap-10 lg:grid-cols-12">
          {/* Direct Sidebar Contacts */}
          <FadeUp className="lg:col-span-5">
            <div className="rounded-3xl glass-strong p-8">
              <h3 className="text-xl font-semibold">Reach out directly</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Prefer email or DMs? Use the channels below.
              </p>
              <ul className="mt-3 space-y-1">
                {info.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      target={c.target}
                      rel="noreferrer"
                      className="group flex items-center gap-4 rounded-2xl border border-transparent p-3 transition-all hover:border-white/10 hover:bg-white/5"
                    >
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl glass text-cyan transition-all group-hover:shadow-[0_0_20px_oklch(0.82_0.13_170/0.4)]">
                        <c.Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-widest text-muted-foreground">
                          {c.label}
                        </p>
                        <p className="text-sm font-medium">{c.value}</p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>

          {/* Interactive Form Component */}
          <FadeUp delay={0.15} className="lg:col-span-7">
            {/* 2. Attached ref={formRef} to your form */}
            <form
              ref={formRef}
              onSubmit={onSubmit}
              className="rounded-3xl glass-strong p-8 sm:p-10"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" name="name" placeholder="Your name" />
                <Field label="Email" name="email" type="email" placeholder="you@domain.com" />
              </div>
              <div className="mt-5">
                <Field
                  label="Subject"
                  name="subject"
                  placeholder="Project, collaboration, hello..."
                />
              </div>
              <div className="mt-5">
                <label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
                  Message
                </label>
                <textarea
                  required
                  name="message"
                  rows={5}
                  placeholder="Tell me about what you're building..."
                  className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-cyan/50 focus:bg-white/[0.05] focus:shadow-[0_0_20px_oklch(0.82_0.13_170/0.2)]"
                />
              </div>

              <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground text-center sm:text-left">
                  I'll reply within 24 hours.
                </p>

                {/* 👈 3. Reconfigured to manually trigger submit on click handler */}
                <MagneticButton
                  className={`w-full sm:w-auto ${isSubmitting ? "opacity-60 cursor-not-allowed" : ""}`}
                  onClick={() => {
                    if (!isSubmitting) {
                      formRef.current?.requestSubmit(); // Triggers html form validation and submission
                    }
                  }}
                >
                  {isSubmitting ? (
                    <div className="flex w-full items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                    </div>
                  ) : sent ? (
                    <div className="flex w-full items-center justify-center gap-2 text-emerald-400">
                      <Check className="h-4 w-4" /> Sent Successfully
                    </div>
                  ) : (
                    <div className="flex w-full items-center justify-center gap-2">
                      Send message <Send className="h-4 w-4" />
                    </div>
                  )}
                </MagneticButton>
              </div>
            </form>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required
        className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-cyan/50 focus:bg-white/[0.05] focus:shadow-[0_0_20px_oklch(0.82_0.13_170/0.2)]"
      />
    </div>
  );
}
