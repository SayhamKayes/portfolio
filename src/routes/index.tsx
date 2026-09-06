import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
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
import { getPortfolioItems, getSkills, getSiteSettings, getTestimonials, getExperiences, getEducations, getGlobalClients } from "@/server/admin";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sayham Kayes | Full Stack & AI/ML Developer" },
      {
        name: "description",
        content:
          "Premium portfolio of Sayham Kayes — Full Stack, Python, and AI/ML developer crafting award-winning digital experiences.",
      },
      { property: "og:title", content: "Sayham Kayes | Full Stack & AI/ML Developer" },
      {
        property: "og:description",
        content: "Premium portfolio showcasing full stack, Python, and AI/ML projects.",
      },
    ],
  }),
  loader: async () => {
    const [portfolioItems, skills, settings, testimonials, experiences, educations, globalClients] = await Promise.all([
      getPortfolioItems(),
      getSkills(),
      getSiteSettings(),
      getTestimonials(),
      getExperiences(),
      getEducations(),
      getGlobalClients()
    ]);
    return { portfolioItems, skills, settings, testimonials, experiences, educations, globalClients };
  },
  component: Index,
});

function Index() {
  const { portfolioItems, skills, settings, testimonials, experiences, educations, globalClients } = Route.useLoaderData();

  const getSetting = (key: string) => settings?.find((s: any) => s.key === key)?.value;

  const primaryColor = getSetting('primaryColor');
  const headerBgColor = getSetting('headerBgColor');
  const headerFontColor = getSetting('headerFontColor');
  const descriptionColor = getSetting('descriptionColor');
  const h1Color = getSetting('h1Color');
  const h2Color = getSetting('h2Color');
  const h3Color = getSetting('h3Color');
  const h4Color = getSetting('h4Color');
  const h5Color = getSetting('h5Color');
  const h6Color = getSetting('h6Color');
  const pColor = getSetting('pColor');

  const globalFont = getSetting('globalFont');
  const headingFont = getSetting('headingFont');
  const pFont = getSetting('pFont');

  // Create inline styles to override the CSS variables if a custom color is set
  const customStyles: Record<string, string> = {};

  if (primaryColor) {
    customStyles['--cyan'] = primaryColor;
    customStyles['--electric'] = primaryColor;
    customStyles['--primary'] = primaryColor;
    customStyles['--gradient-primary'] = `linear-gradient(135deg, ${primaryColor}, ${primaryColor}, ${primaryColor})`;
  }

  if (headerBgColor) customStyles['--header-bg'] = headerBgColor;
  if (headerFontColor) customStyles['--header-font'] = headerFontColor;
  if (descriptionColor) customStyles['--color-muted-foreground'] = descriptionColor;
  if (h1Color) customStyles['--h1-color'] = h1Color;
  if (h2Color) customStyles['--h2-color'] = h2Color;
  if (h3Color) customStyles['--h3-color'] = h3Color;
  if (h4Color) customStyles['--h4-color'] = h4Color;
  if (h5Color) customStyles['--h5-color'] = h5Color;
  if (h6Color) customStyles['--h6-color'] = h6Color;
  if (pColor) customStyles['--p-color'] = pColor;

  useEffect(() => {
    const fontsToLoad = new Set([globalFont, headingFont, pFont].filter(Boolean) as string[]);

    if (fontsToLoad.size > 0) {
      const link = document.createElement('link');
      const fontFamilies = Array.from(fontsToLoad).map(f => `family=${f.replace(/ /g, '+')}:wght@300;400;500;600;700`).join('&');
      link.href = `https://fonts.googleapis.com/css2?${fontFamilies}&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [globalFont, headingFont, pFont]);

  if (globalFont) customStyles['--font-global'] = `"${globalFont}", sans-serif`;
  if (globalFont) customStyles['fontFamily'] = `"${globalFont}", sans-serif`; // fallback
  if (headingFont) {
    customStyles['--font-h1'] = `"${headingFont}", sans-serif`;
    customStyles['--font-h2'] = `"${headingFont}", sans-serif`;
    customStyles['--font-h3'] = `"${headingFont}", sans-serif`;
    customStyles['--font-h4'] = `"${headingFont}", sans-serif`;
    customStyles['--font-h5'] = `"${headingFont}", sans-serif`;
    customStyles['--font-h6'] = `"${headingFont}", sans-serif`;
  }
  if (pFont) customStyles['--font-p'] = `"${pFont}", sans-serif`;

  const generateDynamicStyles = () => {
    let css = '';
    const getVal = (k: string) => settings?.find((s: any) => s.key === k && s.value)?.value;

    const themeMode = getVal('themeMode');

    // Core glow variables for ALL themes
    css += `
      :root, .dark {
        --glow-color: color-mix(in srgb, var(--cyan) 40%, transparent);
        --glow-color-strong: color-mix(in srgb, var(--cyan) 60%, transparent);
      }
    `;

    if (themeMode === 'light') {
      css += `
        :root, .dark {
          --background: oklch(0.98 0 0);
          --foreground: oklch(0.05 0 0);
        }
        .glass {
          background: rgba(255, 255, 255, 0.4) !important;
          border-color: rgba(0, 0, 0, 0.1) !important;
        }
        .glass-strong {
          background: rgba(255, 255, 255, 0.7) !important;
          border-color: rgba(0, 0, 0, 0.15) !important;
          color: var(--foreground) !important;
        }
        /* Fix text elements inside glass-strong in light mode */
        .glass-strong p.text-muted-foreground, .glass p.text-muted-foreground {
          color: oklch(0.3 0 0) !important;
        }
      `;
    } else if (themeMode === 'red-glass') {
      css += `
        :root, .dark {
          --background: oklch(0.1 0.05 20);
          --cyan: oklch(0.7 0.2 20);
          --electric: oklch(0.6 0.2 25);
          --gradient-primary: linear-gradient(135deg, oklch(0.7 0.2 20), oklch(0.6 0.2 25), oklch(0.5 0.2 30));
        }
      `;
    } else if (themeMode === 'blue-glass') {
      css += `
        :root, .dark {
          --background: oklch(0.08 0.04 250);
          --cyan: oklch(0.7 0.15 250);
          --electric: oklch(0.6 0.18 260);
          --gradient-primary: linear-gradient(135deg, oklch(0.7 0.15 250), oklch(0.6 0.18 260), oklch(0.5 0.18 270));
        }
      `;
    } else if (themeMode === 'green-glass') {
      css += `
        :root, .dark {
          --background: oklch(0.08 0.04 140);
          --cyan: oklch(0.7 0.15 140);
          --electric: oklch(0.6 0.18 150);
          --gradient-primary: linear-gradient(135deg, oklch(0.7 0.15 140), oklch(0.6 0.18 150), oklch(0.5 0.18 160));
        }
      `;
    }

    return css;
  };

  const dynamicStyles = generateDynamicStyles();

  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden bg-background text-foreground"
      style={customStyles as React.CSSProperties}
    >
      <style>{dynamicStyles}</style>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />

      <main className="w-full overflow-x-hidden">
        <Hero settings={settings} />
        <About settings={settings} globalClients={globalClients} />
        <Skills items={skills} />
        <Projects items={portfolioItems} />
        <Experience items={experiences} educations={educations} />
        <Testimonials items={testimonials} />
        <WorldMap settings={settings} globalClients={globalClients} />
        <Contact settings={settings} />
      </main>

      <Footer settings={settings} />
    </div>
  );
}
