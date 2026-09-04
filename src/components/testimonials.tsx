import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { FadeUp } from "./motion-primitives";

// Desktop Asset Imports
import Review1 from "@/assets/reviews/Review_1.png";
import Review2 from "@/assets/reviews/Review_2.png";
import Review3 from "@/assets/reviews/Review_3.png";
import Review4 from "@/assets/reviews/Review_4.png";
import Review5 from "@/assets/reviews/Review_5.png";
import Review6 from "@/assets/reviews/Review_6.png";
import Review7 from "@/assets/reviews/Review_7.png";
import Review8 from "@/assets/reviews/Review_8.png";
import Review9 from "@/assets/reviews/Review_9.png";
import Review10 from "@/assets/reviews/Review_10.png";
import Review11 from "@/assets/reviews/Review_11.png";
import Review12 from "@/assets/reviews/Review_12.png";
import Review13 from "@/assets/reviews/Review_13.png";
import Review14 from "@/assets/reviews/Review_14.png";
import Review15 from "@/assets/reviews/Review_15.png";
import Review16 from "@/assets/reviews/Review_16.png";
import Review17 from "@/assets/reviews/Review_17.png";

// 1. MOBILE ASSET IMPORTS: Import your mobile review images here
// (Replace these example paths with your actual mobile image filenames)
import ReviewMobile1 from "@/assets/reviews/Review_1_mobile.png";
import ReviewMobile2 from "@/assets/reviews/Review_2_mobile.png";
import ReviewMobile3 from "@/assets/reviews/Review_3_mobile.png";
import ReviewMobile4 from "@/assets/reviews/Review_4_mobile.png";
import ReviewMobile5 from "@/assets/reviews/Review_5_mobile.png";
import ReviewMobile6 from "@/assets/reviews/Review_6_mobile.png";
import ReviewMobile7 from "@/assets/reviews/Review_7_mobile.png";
import ReviewMobile8 from "@/assets/reviews/Review_8_mobile.png";
import ReviewMobile9 from "@/assets/reviews/Review_9_mobile.png";
import ReviewMobile10 from "@/assets/reviews/Review_10_mobile.png";
import ReviewMobile11 from "@/assets/reviews/Review_11_mobile.png";
import ReviewMobile12 from "@/assets/reviews/Review_12_mobile.png";
import ReviewMobile13 from "@/assets/reviews/Review_13_mobile.png";
import ReviewMobile14 from "@/assets/reviews/Review_14_mobile.png";
import ReviewMobile15 from "@/assets/reviews/Review_15_mobile.png";
import ReviewMobile16 from "@/assets/reviews/Review_16_mobile.png";
import ReviewMobile17 from "@/assets/reviews/Review_17_mobile.png";

// 2. DATA STRUCTURE UPDATE: Each item now tracks both image targets
const testimonials = [
  { desktopImage: Review1, mobileImage: ReviewMobile1 },
  { desktopImage: Review2, mobileImage: ReviewMobile2 },
  { desktopImage: Review3, mobileImage: ReviewMobile3 },
  { desktopImage: Review4, mobileImage: ReviewMobile4 },
  { desktopImage: Review5, mobileImage: ReviewMobile5 },
  { desktopImage: Review6, mobileImage: ReviewMobile6 },
  { desktopImage: Review7, mobileImage: ReviewMobile7 },
  { desktopImage: Review8, mobileImage: ReviewMobile8 },
  { desktopImage: Review9, mobileImage: ReviewMobile9 },
  { desktopImage: Review10, mobileImage: ReviewMobile10 },
  { desktopImage: Review11, mobileImage: ReviewMobile11 },
  { desktopImage: Review12, mobileImage: ReviewMobile12 },
  { desktopImage: Review13, mobileImage: ReviewMobile13 },
  { desktopImage: Review14, mobileImage: ReviewMobile14 },
  { desktopImage: Review15, mobileImage: ReviewMobile15 },
  { desktopImage: Review16, mobileImage: ReviewMobile16 },
  { desktopImage: Review17, mobileImage: ReviewMobile17 },
];

export function Testimonials({ items }: { items?: any[] }) {
  const [i, setI] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // 3. RESPONSIVE VIEWPORT DETECTION
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Matches Tailwind's 'md' breakpoint
    };

    handleResize(); // Run check on initial mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const combinedTestimonials: any[] = [
    ...testimonials,
    ...(items || []).map((item) => ({
      desktopImage: item.screenshotUrl,
      mobileImage: item.screenshotUrl,
      isManual: !item.screenshotUrl,
      name: item.name,
      designation: item.designation,
      content: item.content,
      avatarUrl: item.avatarUrl,
    })),
  ];

  // Autoplay loop hook
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % combinedTestimonials.length), 6000);
    return () => clearInterval(id);
  }, [combinedTestimonials.length]);

  const t = combinedTestimonials[i] || combinedTestimonials[0];

  return (
    <section id="testimonials" className="relative py-32">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative mx-auto max-w-5xl px-6">
        <FadeUp className="text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-cyan">Testimonials</p>
          <h2 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Trusted by <span className="text-gradient">teams worldwide</span>.
          </h2>
        </FadeUp>

        <FadeUp delay={0.15} className="mt-16">
          <div className="relative overflow-hidden rounded-3xl glass-strong p-10 sm:p-14">
            <Quote className="absolute right-8 top-8 h-20 w-20 text-white/[0.04]" />
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mt-6 flex justify-center">
                  {t.isManual ? (
                    <div className="flex flex-col items-center text-center max-w-2xl mx-auto py-8">
                      {t.avatarUrl && (
                        <img src={t.avatarUrl} alt={t.name} className="w-20 h-20 rounded-full mb-4 object-cover border-2 border-white/10" />
                      )}
                      <p className="text-xl md:text-2xl font-medium mb-6 leading-relaxed text-white/90">"{t.content}"</p>
                      <div>
                        <h4 className="font-semibold text-lg text-white">{t.name}</h4>
                        <p className="text-cyan text-sm">{t.designation}</p>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={isMobile && t.mobileImage ? t.mobileImage : t.desktopImage}
                      alt={`Review ${i + 1}`}
                      className="h-auto w-full rounded-xl object-contain max-w-4xl mx-auto"
                    />
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => setI((v) => (v - 1 + combinedTestimonials.length) % combinedTestimonials.length)}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-white/70 hover:text-white"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setI((v) => (v + 1) % combinedTestimonials.length)}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-white/70 hover:text-white"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
