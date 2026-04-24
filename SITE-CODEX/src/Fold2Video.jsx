import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Play } from "lucide-react";

// ============================================
// VIDEO CONFIGURATION
// ============================================
// Replace YOUTUBE_VIDEO_ID with the real YouTube video ID once available
const YOUTUBE_VIDEO_ID = "dQw4w9WgXcQ";
const VIDEO_START_SECONDS = 0;

// Replace poster with the final branded still when available
const VIDEO_POSTER = {
  desktop:
    "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1600&auto=format&fit=crop&q=80",
  mobile:
    "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=900&auto=format&fit=crop&q=80",
  alt: "Apresentação Adega Própria",
};

const EASE = [0.22, 1, 0.36, 1];
const VIDEO_EMBED_URL = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&controls=1&rel=0&modestbranding=1&playsinline=1&start=${VIDEO_START_SECONDS}`;

const FONT_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,300;1,9..144,400;1,9..144,700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400&display=swap');

  .font-display {
    font-family: "Fraunces", serif;
  }

  .font-body {
    font-family: "DM Sans", sans-serif;
  }

  @keyframes fold2Pulse {
    0%, 100% {
      opacity: 0.3;
      transform: scale(1.25);
    }

    50% {
      opacity: 0.6;
      transform: scale(1.35);
    }
  }

  .fold2-pulse-ring {
    animation: fold2Pulse 3s ease-in-out infinite;
  }

  ::selection {
    background-color: rgba(191, 140, 96, 0.25);
    color: #D9BBA9;
  }
`;

const CORNER_ACCENTS = [
  "-left-px -top-px h-px w-8",
  "-left-px -top-px h-8 w-px",
  "-right-px -top-px h-px w-8",
  "-right-px -top-px h-8 w-px",
  "-left-px -bottom-px h-px w-8",
  "-left-px -bottom-px h-8 w-px",
  "-right-px -bottom-px h-px w-8",
  "-right-px -bottom-px h-8 w-px",
];

export default function Fold2Video() {
  const sectionRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMdUp, setIsMdUp] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const mdQuery = window.matchMedia("(min-width: 768px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateMatches = () => {
      setIsMdUp(mdQuery.matches);
      setPrefersReducedMotion(motionQuery.matches);
    };

    updateMatches();

    if (mdQuery.addEventListener) {
      mdQuery.addEventListener("change", updateMatches);
      motionQuery.addEventListener("change", updateMatches);
    } else {
      mdQuery.addListener(updateMatches);
      motionQuery.addListener(updateMatches);
    }

    return () => {
      if (mdQuery.removeEventListener) {
        mdQuery.removeEventListener("change", updateMatches);
        motionQuery.removeEventListener("change", updateMatches);
      } else {
        mdQuery.removeListener(updateMatches);
        motionQuery.removeListener(updateMatches);
      }
    };
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const getReveal = (delay, y, duration, extraInitial = {}) => {
    if (prefersReducedMotion) {
      return {
        initial: false,
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0 },
      };
    }

    const initialState = {
      opacity: 0,
      y: isMdUp ? y : 0,
      scale: isMdUp ? extraInitial.scale ?? 1 : 1,
    };

    return {
      initial: initialState,
      animate: isInView
        ? { opacity: 1, y: 0, scale: 1 }
        : initialState,
      transition: {
        delay,
        duration,
        ease: EASE,
      },
    };
  };

  return (
    <>
      <style>{FONT_STYLES}</style>

      <section
        id="fold-2"
        ref={sectionRef}
        className="relative w-full max-w-full overflow-hidden bg-[#1A0F10] py-20 md:py-28 lg:py-36"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
        >
          <div
            className="absolute left-1/2 top-1/2 h-[420px] w-[92vw] max-w-[700px] -translate-x-1/2 -translate-y-1/2 lg:h-[600px] lg:w-[88vw] lg:max-w-[1000px]"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(166,44,33,0.08) 0%, transparent 65%)",
            }}
          />
          <div
            className="absolute right-0 top-1/4 h-[320px] w-[52vw] max-w-[320px] lg:h-[400px] lg:w-[34vw] lg:max-w-[400px]"
            style={{
              background:
                "radial-gradient(ellipse at 80% 50%, rgba(140,61,32,0.05) 0%, transparent 60%)",
            }}
          />
          <div
            className="absolute left-0 right-0 top-0 h-[200px]"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(191,140,96,0.06) 0%, transparent 70%)",
            }}
          />
        </div>

        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.03] mix-blend-overlay"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="fold2Grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#fold2Grain)" />
        </svg>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
          <motion.p
            className="font-body mb-6 text-[10px] font-medium uppercase tracking-[0.4em] text-[#BF8C60]/75 sm:text-xs lg:mb-10"
            {...getReveal(0, 15, 0.7)}
          >
            {"— ASSISTA —"}
          </motion.p>

          <motion.h2
            className="font-display max-w-[24ch] text-2xl leading-[1.15] tracking-[-0.015em] text-[#D9BBA9] sm:max-w-[30ch] sm:text-3xl md:text-4xl lg:max-w-3xl lg:text-5xl"
            {...getReveal(0.15, 30, 0.9)}
          >
            {"Em dois minutos, você compreende o que torna a Adega Própria "}
            <span className="italic text-[#BF8C60]">{"única"}</span>
            {"."}
          </motion.h2>

          <motion.div
            className="mx-auto mt-10 w-full max-w-full lg:mt-14 sm:max-w-5xl lg:max-w-6xl"
            {...getReveal(0.4, 40, 1.1, { scale: 0.98 })}
          >
            <div className="group relative w-full max-w-full overflow-hidden">
              <div className="relative overflow-hidden rounded-[0.8rem] bg-[#2A1416] ring-1 ring-[#BF8C60]/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] transition-all duration-500 lg:group-hover:ring-[#BF8C60]/25 lg:group-hover:shadow-[0_34px_88px_-18px_rgba(0,0,0,0.84)]">
                <div className="relative aspect-video ring-1 ring-inset ring-[#BF8C60]/8 transition-all duration-500 lg:group-hover:ring-[#BF8C60]/12">
                  {!isPlaying ? (
                    <div className="absolute inset-0">
                      <img
                        src={VIDEO_POSTER.mobile}
                        srcSet={`${VIDEO_POSTER.mobile} 900w, ${VIDEO_POSTER.desktop} 1600w`}
                        sizes="(max-width: 1024px) calc(100vw - 2rem), 1024px"
                        alt={VIDEO_POSTER.alt}
                        className="absolute inset-0 h-full w-full object-cover brightness-[0.45] lg:brightness-[0.5]"
                        loading="lazy"
                        decoding="async"
                        draggable="false"
                      />

                      <div
                        className="pointer-events-none absolute inset-0 mix-blend-multiply"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(26,15,16,0.45) 0%, rgba(140,61,32,0.3) 100%)",
                        }}
                      />

                      <div
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(26,15,16,0.7) 0%, transparent 100%)",
                        }}
                      />

                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(26,15,16,0.28)_100%)]" />

                      <button
                        type="button"
                        onClick={handlePlay}
                        className="group absolute inset-0 z-20 flex h-full w-full items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BF8C60] focus-visible:ring-offset-4 focus-visible:ring-offset-[#2A1416]"
                        aria-label="Reproduzir vídeo de apresentação"
                      >
                        <div className="relative">
                          <div
                            className={
                              prefersReducedMotion
                                ? "absolute inset-0 rounded-full border border-[#BF8C60]/20 opacity-40"
                                : "fold2-pulse-ring absolute inset-0 rounded-full border border-[#BF8C60]/20"
                            }
                          />

                          <div className="play-core relative flex h-14 w-14 items-center justify-center rounded-full border border-[#BF8C60]/30 bg-[#1A0F10]/60 text-[#BF8C60] backdrop-blur-sm transition-all duration-500 ease-out group-hover:scale-110 group-hover:border-[#BF8C60]/60 group-hover:bg-[#1A0F10]/80 group-hover:shadow-[0_0_40px_rgba(191,140,96,0.28)] group-active:scale-[0.97] md:h-16 md:w-16 lg:h-20 lg:w-20">
                            <Play
                              className="h-5 w-5 translate-x-[1px] transition-transform duration-500 ease-out group-hover:translate-x-1 md:h-6 md:w-6 lg:h-7 lg:w-7"
                              strokeWidth={1.5}
                              fill="currentColor"
                            />
                          </div>
                        </div>
                      </button>

                      <div className="pointer-events-none absolute bottom-4 left-4 lg:bottom-6 lg:left-6">
                        <p className="font-body text-[10px] font-medium uppercase tracking-[0.25em] text-[#D9BBA9]/60 lg:text-xs">
                          {"ADEGA PRÓPRIA · APRESENTAÇÃO"}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0">
                      <iframe
                        className="absolute inset-0 z-10 h-full w-full border-0 pointer-events-auto"
                        src={VIDEO_EMBED_URL}
                        title="Adega Própria - Apresentação"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  )}
                </div>
              </div>

              {CORNER_ACCENTS.map((className, index) => (
                <motion.div
                  key={className}
                  className={`absolute hidden bg-[#BF8C60]/30 lg:block ${className}`}
                  initial={prefersReducedMotion ? false : { opacity: 0 }}
                  animate={
                    prefersReducedMotion || isInView
                      ? { opacity: 1 }
                      : { opacity: 0 }
                  }
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : {
                          duration: 0.6,
                          delay: 1 + index * 0.03,
                          ease: "easeOut",
                        }
                  }
                />
              ))}
            </div>
          </motion.div>

          <motion.p
            className="font-body mt-8 text-[10px] font-medium uppercase tracking-[0.25em] text-[#D9BBA9]/40 lg:mt-12 lg:text-xs"
            {...getReveal(0.8, 15, 0.7)}
          >
            {"2 MIN · PORTUGUÊS · APRESENTADO POR ADEGA PRÓPRIA"}
          </motion.p>
        </div>
      </section>
    </>
  );
}
