import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageCircle, ArrowUpRight } from "lucide-react";

// ============================================
// CONFIGURATION
// ============================================
const WHATSAPP_URL =
  "https://wa.me/5500000000000?text=Ol%C3%A1!%20Quero%20criar%20minha%20pr%C3%B3pria%20marca%20de%20vinhos%20com%20a%20Adega%20Pr%C3%B3pria.";

const EASE = [0.22, 1, 0.36, 1];

const FONT_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,300;1,9..144,400;1,9..144,700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400&display=swap');

  .font-display {
    font-family: "Fraunces", serif;
  }

  .font-body {
    font-family: "DM Sans", sans-serif;
  }

  @keyframes shimmer {
    0% {
      background-position: -100% 0;
    }

    100% {
      background-position: 200% 0;
    }
  }

  .fold4-shimmer {
    padding: 1px;
    background: linear-gradient(
      115deg,
      transparent 0%,
      rgba(217, 187, 169, 0.08) 28%,
      rgba(217, 187, 169, 0.4) 50%,
      rgba(217, 187, 169, 0.08) 72%,
      transparent 100%
    );
    background-size: 220% 100%;
    animation: shimmer 2.4s ease-in-out infinite;
    mix-blend-mode: overlay;
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }

  ::selection {
    background-color: rgba(191, 140, 96, 0.25);
    color: #D9BBA9;
  }
`;

export default function Fold4CtaInterstitial() {
  const sectionRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const isInView = useInView(sectionRef, { once: true, amount: 0.35 });

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateMatches = () => {
      setIsDesktop(desktopQuery.matches);
      setPrefersReducedMotion(motionQuery.matches);
    };

    updateMatches();

    if (desktopQuery.addEventListener) {
      desktopQuery.addEventListener("change", updateMatches);
      motionQuery.addEventListener("change", updateMatches);
    } else {
      desktopQuery.addListener(updateMatches);
      motionQuery.addListener(updateMatches);
    }

    return () => {
      if (desktopQuery.removeEventListener) {
        desktopQuery.removeEventListener("change", updateMatches);
        motionQuery.removeEventListener("change", updateMatches);
      } else {
        desktopQuery.removeListener(updateMatches);
        motionQuery.removeListener(updateMatches);
      }
    };
  }, []);

  const getReveal = (
    delay,
    y = 24,
    duration = 0.9,
    extraInitial = {},
    ease = EASE
  ) => {
    if (prefersReducedMotion) {
      return {
        initial: false,
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0 },
      };
    }

    const initialState = {
      opacity: 0,
      y: isDesktop ? y : 0,
      scale: extraInitial.scale ?? 1,
    };

    return {
      initial: initialState,
      animate: isInView
        ? { opacity: 1, y: 0, scale: 1 }
        : initialState,
      transition: {
        delay,
        duration,
        ease,
      },
    };
  };

  const axisGradient = isDesktop
    ? "linear-gradient(to bottom, rgba(191,140,96,0) 0%, rgba(191,140,96,0.12) 22%, rgba(191,140,96,0.35) 50%, rgba(191,140,96,0.12) 78%, rgba(191,140,96,0) 100%)"
    : "linear-gradient(to bottom, rgba(191,140,96,0) 0%, rgba(191,140,96,0.08) 24%, rgba(191,140,96,0.2) 50%, rgba(191,140,96,0.08) 76%, rgba(191,140,96,0) 100%)";

  return (
    <>
      <style>{FONT_STYLES}</style>

      <section
        id="fold-4"
        ref={sectionRef}
        className="relative isolate flex w-full items-center justify-center overflow-hidden bg-[#1A0F10] py-14 md:py-24 lg:min-h-[90vh] lg:py-40"
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#BF8C60]/20 to-transparent"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at center, transparent 25%, rgba(0,0,0,0.6) 100%)",
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-[60vh] w-[80vw] max-w-[80vw] -translate-x-1/2 -translate-y-1/2 lg:h-[650px] lg:w-[900px] lg:max-w-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(166,44,33,0.09) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-[8%] right-0 h-[36vh] w-[46vw] max-w-[340px] lg:bottom-[6%] lg:right-[4%] lg:h-[320px] lg:w-[30vw] lg:max-w-[440px]"
            style={{
              background:
                "radial-gradient(ellipse at 80% 50%, rgba(140,61,32,0.05) 0%, transparent 65%)",
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,15,16,0.18)_0%,rgba(42,20,22,0.28)_45%,rgba(26,15,16,0.18)_100%)]" />
        </div>

        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.03] mix-blend-overlay"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="fold4Grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#fold4Grain)" />
        </svg>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[14%] left-1/2 top-[24%] z-[4] hidden w-12 -translate-x-1/2 lg:bottom-[10%] lg:top-[18%] lg:block lg:w-24"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(191,140,96,0.07) 50%, transparent 100%)",
          }}
        />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[14%] left-1/2 top-[24%] z-[5] hidden w-px -translate-x-1/2 origin-top lg:bottom-[10%] lg:top-[18%] lg:block"
          style={{ background: axisGradient }}
          initial={prefersReducedMotion ? false : { scaleY: 0, opacity: 0 }}
          animate={
            prefersReducedMotion || isInView
              ? { scaleY: 1, opacity: 1 }
              : { scaleY: 0, opacity: 0 }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { delay: 0.2, duration: 1.4, ease: EASE }
          }
        />

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center lg:px-12">
          <motion.div
            className="relative mb-8 flex flex-col items-center pt-5 lg:mb-14 lg:pt-6"
            {...getReveal(0.4, 12, 0.7)}
          >
            <span
              aria-hidden="true"
              className="absolute top-0 h-2.5 w-px bg-[#BF8C60]/70 sm:h-3"
            />
            <span className="font-body text-[10px] font-medium uppercase tracking-[0.3em] text-[#BF8C60]/70 sm:text-xs md:tracking-[0.35em]">
              A DECISÃO
            </span>
          </motion.div>

          <motion.h2
            className="font-display max-w-[14ch] text-center text-5xl font-normal leading-[0.98] tracking-[-0.03em] text-[#D9BBA9] max-[360px]:text-[2.75rem] sm:max-w-[16ch] sm:text-6xl md:max-w-[18ch] md:text-7xl lg:max-w-4xl lg:text-8xl lg:leading-[0.95] xl:text-[9rem]"
            {...getReveal(0.7, 50, 1.2)}
          >
            A marca que sua história{" "}
            <span className="italic text-[#BF8C60]">merece</span>.
          </motion.h2>

          <motion.p
            className="font-body mt-8 max-w-xl px-2 text-base leading-relaxed text-[#D9BBA9]/60 max-[360px]:text-sm sm:max-w-2xl sm:text-lg lg:mt-14 lg:max-w-3xl lg:text-xl"
            {...getReveal(1.1, 25, 0.9)}
          >
            Nós cuidamos do vinho, do rótulo, do engarrafamento e da entrega.
            Você cuida da história.
          </motion.p>

          <motion.div
            className="mt-10 w-full max-w-md sm:max-w-none lg:mt-16"
            {...getReveal(1.4, 20, 0.9, { scale: 0.95 })}
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Criar minha marca de vinhos no WhatsApp"
              className="group relative inline-flex min-h-14 w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-[#BF8C60] px-8 py-4 text-base font-semibold text-[#1A0F10] ring-1 ring-[#BF8C60]/25 shadow-[0_18px_40px_rgba(0,0,0,0.22)] transition-all duration-500 ease-out active:scale-[0.97] active:bg-[#8C3D20] active:text-[#D9BBA9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BF8C60] focus-visible:ring-offset-4 focus-visible:ring-offset-[#1A0F10] sm:w-auto sm:px-10 sm:py-5 lg:px-12 lg:py-6 lg:text-lg lg:hover:scale-[1.02] lg:hover:bg-[#D9BBA9] lg:hover:shadow-[0_0_50px_rgba(191,140,96,0.3)] lg:hover:ring-[#BF8C60]/50"
            >
              {!prefersReducedMotion ? (
                <span
                  aria-hidden="true"
                  className="fold4-shimmer pointer-events-none absolute inset-0 hidden rounded-full opacity-0 transition-opacity duration-300 lg:block lg:group-hover:opacity-100"
                />
              ) : null}

              <MessageCircle
                strokeWidth={1.5}
                className="relative z-[1] h-[18px] w-[18px] transition-transform duration-500 lg:h-5 lg:w-5 lg:group-hover:scale-110"
              />
              <span className="relative z-[1]">Crie Sua Marca Agora</span>
              <ArrowUpRight
                strokeWidth={1.5}
                className="relative z-[1] h-4 w-4 transition-transform duration-500 lg:h-[18px] lg:w-[18px] lg:group-hover:-translate-y-0.5 lg:group-hover:translate-x-1"
              />
            </a>
          </motion.div>

          <motion.p
            className="font-body mt-4 text-xs tracking-[0.1em] text-[#D9BBA9]/45 sm:mt-5 md:tracking-[0.15em] lg:mt-6 lg:text-sm"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={
              prefersReducedMotion || isInView ? { opacity: 1 } : { opacity: 0 }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { delay: 1.7, duration: 0.7, ease: "easeOut" }
            }
          >
            Resposta em até 2 horas · Segunda a Sábado
          </motion.p>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#BF8C60]/20 to-transparent"
        />
      </section>
    </>
  );
}
