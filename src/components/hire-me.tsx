import { FadeUp } from "./motion-primitives";
import { ProjectBookingModal } from "./project-booking-modal";
import { Particles } from "./effects";

export function HireMe() {
  return (
    <section id="hire-me" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/10 blur-[120px] pointer-events-none" />
      <Particles count={25} />

      <div className="relative mx-auto max-w-7xl px-6">
        <FadeUp className="mx-auto max-w-4xl rounded-3xl glass-strong p-8 sm:p-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
            Ready to build something <span className="text-gradient">amazing?</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-10">
            Whether you need a high-converting landing page, a complex web application, or a seamless user experience, I'm here to turn your vision into reality. Let's create a digital experience that stands out.
          </p>
          
          <ProjectBookingModal>
            <button className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-cyan px-8 py-4 text-sm font-semibold text-background transition-all hover:scale-105 hover:bg-cyan/90 focus:outline-none focus:ring-2 focus:ring-cyan/50 focus:ring-offset-2 focus:ring-offset-background">
              <span className="relative z-10">Book a Project</span>
              <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 ease-out group-hover:translate-x-0" />
            </button>
          </ProjectBookingModal>
        </FadeUp>
      </div>
    </section>
  );
}
