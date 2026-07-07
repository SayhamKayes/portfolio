import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Testimonials } from "@/components/testimonials";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { CursorGlow, ScrollProgress } from "@/components/effects";
import WorldMap from "@/components/worldMap";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sayham Kayes — Full Stack & AI/ML Developer" },
      {
        name: "description",
        content:
          "Premium portfolio of Sayham Kayes — Full Stack, Python, and AI/ML developer crafting award-winning digital experiences.",
      },
      { property: "og:title", content: "Sayham Kayes — Full Stack & AI/ML Developer" },
      {
        property: "og:description",
        content: "Premium portfolio showcasing full stack, Python, and AI/ML projects.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      <ScrollProgress />
      <CursorGlow />
      <Navbar />

      <main className="w-full overflow-x-hidden">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Testimonials />
        <WorldMap />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
