import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, ChevronDown } from "lucide-react";
import logo from "./LOGO.png";

const HERO_BG_DESKTOP =
  "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?auto=format&fit=crop&w=1600&q=80";
const HERO_BG_MOBILE =
  "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?auto=format&fit=crop&w=900&q=80";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Ol\u00E1! Gostaria de saber mais sobre criar minha pr\u00F3pria marca de vinhos."
);
const WHATSAPP_URL =
  `https://wa.me/5500000000000?text=${WHATSAPP_MESSAGE}`;

const EASE = [0.22, 1, 0.36, 1];

const FONT_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,300;1,9..144,400;1,9..144,700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400&display=swap');

  .font-display {
    font-family: "Fraunces", serif;
  }

  .font-body {
    font-family: "DM Sans", sans-serif;
  }

  .pb-safe {
    padding-bottom: max(1rem, env(safe-area-inset-bottom));
  }
`;

export default function Fold1Hero() {
  const heroRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [showMobileBar, setShowMobileBar] = useState(false);

  const isHeroInView = useInView(heroRef, {
    amount: 0.2,
  });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const backgroundYRaw = useTransform(
    scrollYProgress,
    [0, 1],
    isDesktop ? ["0%", "18%"] : ["0%", "10%"]
  );
  const backgroundY = useSpring(backgroundYRaw, {
    stiffness: 120,
    damping: 24,
    mass: 0.35,
  });

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateDesktop = () => setIsDesktop(desktopQuery.matches);
    const updateReducedMotion = () =>
      setPrefersReducedMotion(motionQuery.matches);

    updateDesktop();
    updateReducedMotion();

    if (desktopQuery.addEventListener) {
      desktopQuery.addEventListener("change", updateDesktop);
      motionQuery.addEventListener("change", updateReducedMotion);
    } else {
      desktopQuery.addListener(updateDesktop);
      motionQuery.addListener(updateReducedMotion);
    }

    return () => {
      if (desktopQuery.removeEventListener) {
        desktopQuery.removeEventListener("change", updateDesktop);
        motionQuery.removeEventListener("change", updateReducedMotion);
      } else {
        desktopQuery.removeListener(updateDesktop);
        motionQuery.removeListener(updateReducedMotion);
      }
    };
  }, []);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setShowMobileBar(!isDesktop && !isHeroInView && latest > 0.82);
    });

    return () => unsubscribe();
  }, [scrollYProgress, isDesktop, isHeroInView]);

  const scrollToNextFold = useCallback(() => {
    if (typeof window === "undefined") return;

    const nextSection = heroRef.current?.nextElementSibling;

    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
      return;
    }

    window.scrollTo({
      top: window.innerHeight * 0.96,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [prefersReducedMotion]);

  const getReveal = useCallback(
    (delay, y = 24, duration = 0.8, extraInitial = {}) => {
      if (prefersReducedMotion) {
        return {
          initial: false,
          animate: { opacity: 1, y: 0, scale: 1 },
          transition: { duration: 0 },
        };
      }

      return {
        initial: {
          opacity: 0,
          y: isDesktop ? y : 0,
          ...extraInitial,
        },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: {
          delay,
          duration,
          ease: EASE,
        },
      };
    },
    [isDesktop, prefersReducedMotion]
  );

  const backgroundMotionStyle = !prefersReducedMotion
    ? { y: backgroundY }
    : undefined;

  return (
    <>
      <style>{FONT_STYLES}</style>

      <section
        id="hero"
        ref={heroRef}
        className="relative isolate min-h-[100dvh] overflow-hidden bg-[#1A0F10] [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]"
      >
        <div className="absolute inset-0">
          <motion.div
            className={`${
              isDesktop && !prefersReducedMotion ? "fixed" : "absolute"
            } inset-[-10%]`}
            style={backgroundMotionStyle}
          >
            <img
              src={HERO_BG_MOBILE}
              srcSet={`${HERO_BG_MOBILE} 900w, ${HERO_BG_DESKTOP} 1600w`}
              sizes="100vw"
              alt={"Adega de vinhos finos"}
              className="absolute inset-0 h-full w-full object-cover brightness-[0.42] contrast-[1.08] saturate-[0.72] sepia-[0.22]"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              draggable="false"
            />
          </motion.div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F10] via-[#1A0F10]/82 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-[34vh] bg-gradient-to-b from-[#1A0F10]/55 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_44%,rgba(26,15,16,0.84)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(26,15,16,0.78)_0%,rgba(42,20,22,0.3)_42%,rgba(140,61,32,0.16)_100%)]" />
          <div className="absolute left-1/2 top-1/2 h-[22rem] w-[24rem] -translate-x-1/2 -translate-y-[42%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(191,140,96,0.08)_0%,transparent_72%)] blur-3xl md:h-[24rem] md:w-[34rem] xl:h-[32rem] xl:w-[48rem]" />
          <div className="absolute bottom-0 left-0 right-0 h-[15rem] bg-[radial-gradient(ellipse_at_bottom,rgba(166,44,33,0.08)_0%,transparent_72%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(42,20,22,0.12)_65%,rgba(42,20,22,0.34)_100%)]" />
        </div>

        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04] mix-blend-overlay"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="heroNoise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#heroNoise)" />
        </svg>

        <motion.nav
          className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8 md:pt-6"
          {...getReveal(0, -20, 0.8)}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full border border-[#BF8C60]/10 bg-[#1A0F10]/40 px-3 py-2.5 shadow-[0_18px_60px_rgba(0,0,0,0.34)] backdrop-blur-xl md:px-4 md:py-3.5">
            <motion.a
              href="#hero"
              aria-label={"Voltar ao topo"}
              className="group flex min-h-14 items-center"
              whileHover={prefersReducedMotion ? undefined : { y: -1 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <img
                src={logo}
                alt={"Adega Pr\u00F3pria"}
                className="h-14 w-auto object-contain transition-all duration-500 group-hover:drop-shadow-[0_0_12px_rgba(191,140,96,0.2)] md:h-16 lg:h-[4.75rem]"
                draggable="false"
              />
            </motion.a>

            <Button
              asChild
              className="font-body min-h-11 rounded-full border border-[#BF8C60]/20 bg-[#1A0F10]/10 px-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[#BF8C60] shadow-none backdrop-blur-sm transition-all duration-300 hover:bg-[#BF8C60]/10 hover:border-[#BF8C60]/60 hover:text-[#D9BBA9] focus-visible:ring-2 focus-visible:ring-[#BF8C60] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A0F10] md:px-5"
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                aria-label={"Falar com a Adega Pr\u00F3pria no WhatsApp"}
              >
                {"Fale Conosco"}
              </a>
            </Button>
          </div>
        </motion.nav>

        <div className="absolute inset-0 z-20 flex items-center justify-center px-5 pb-28 pt-28 sm:px-6 md:px-8 lg:px-10">
          <div className="flex w-full max-w-5xl flex-col items-center gap-5 text-center lg:gap-8">
            <motion.p
              className="font-body max-w-[24rem] text-[10px] uppercase tracking-[0.32em] text-[#BF8C60] sm:max-w-none sm:text-xs"
              {...getReveal(0.2, 18, 0.7)}
            >
              {"VINHOS FINOS \u00B7 SERRA GA\u00DACHA \u00B7 A PARTIR DE 60 GARRAFAS"}
            </motion.p>

            <motion.h1
              className="font-display max-w-4xl text-4xl leading-[0.95] tracking-[-0.02em] text-[#D9BBA9] sm:text-5xl md:text-6xl lg:text-7xl xl:max-w-5xl xl:text-8xl"
              {...getReveal(0.35, 40, 0.9)}
            >
              {"Sua Pr\u00F3pria Marca de Vinhos "}
              <em className="font-display italic text-[#BF8C60]">{"Finos"}</em>
            </motion.h1>

            <motion.p
              className="font-body max-w-xl text-base leading-relaxed text-[#D9BBA9]/70 md:text-[1.05rem] lg:max-w-2xl lg:text-lg"
              {...getReveal(0.55, 28, 0.7)}
            >
              {
                "Vinhos premium direto das melhores vin\u00EDcolas da Serra Ga\u00FAcha, com r\u00F3tulo exclusivo e a partir de apenas 60 garrafas."
              }
            </motion.p>

            <motion.div
              className="w-full max-w-md pt-2 sm:max-w-none"
              {...getReveal(0.75, 20, 0.7, { scale: 0.96 })}
            >
              <Button
                asChild
                className="font-body group h-14 w-full rounded-full border border-[#BF8C60]/35 bg-[#BF8C60] px-8 text-base font-semibold text-[#1A0F10] shadow-[0_10px_22px_rgba(10,4,5,0.18),0_0_18px_rgba(191,140,96,0.10)] transition-all duration-500 ease-out hover:scale-[1.02] hover:bg-[#D9BBA9] hover:text-[#1A0F10] hover:shadow-[0_14px_30px_rgba(10,4,5,0.24),0_0_22px_rgba(191,140,96,0.18)] active:scale-[0.97] active:bg-[#8C3D20] active:text-[#D9BBA9] focus-visible:ring-2 focus-visible:ring-[#BF8C60] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A0F10] sm:w-auto sm:px-10 lg:h-16 lg:px-12"
              >
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={"Criar minha marca de vinhos pelo WhatsApp"}
                  className="flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-[18px] w-[18px] transition-transform duration-500 group-hover:rotate-12" />
                  <span>{"Crie Sua Marca Agora"}</span>
                </a>
              </Button>
            </motion.div>

            <motion.p
              className="font-body text-xs tracking-[0.14em] text-[#D9BBA9]/40"
              {...getReveal(0.9, 0, 0.6)}
            >
              {"Atendimento personalizado via WhatsApp"}
            </motion.p>
          </div>
        </div>

        <motion.button
          type="button"
          onClick={scrollToNextFold}
          className="font-body absolute inset-x-0 bottom-6 z-20 mx-auto flex w-fit flex-col items-center justify-center gap-2 text-center text-[#BF8C60]/65 transition-opacity duration-300 hover:text-[#BF8C60] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BF8C60] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A0F10] md:bottom-8"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { delay: 1.2, duration: 0.6, ease: "easeOut" }
          }
          aria-label={"Descobrir a pr\u00F3xima se\u00E7\u00E3o"}
        >
          <span className="block w-full text-center text-[10px] uppercase tracking-[0.28em]">
            {"Descubra"}
          </span>
          <motion.span
            animate={prefersReducedMotion ? undefined : { y: [0, 6, 0] }}
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 2.5, ease: "easeInOut", repeat: Infinity }
            }
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </motion.button>

        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 z-20 h-px origin-center bg-gradient-to-r from-transparent via-[#BF8C60]/30 to-transparent"
          initial={prefersReducedMotion ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { delay: 1.4, duration: 0.8, ease: EASE }
          }
        />
      </section>

      <AnimatePresence>
        {showMobileBar ? (
          <motion.div
            className="pb-safe fixed inset-x-0 bottom-0 z-[70] px-4 pt-2 lg:hidden"
            initial={prefersReducedMotion ? false : { y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={
              prefersReducedMotion ? { opacity: 0 } : { y: 120, opacity: 0 }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.4, ease: EASE }
            }
          >
            <div className="rounded-[1.75rem] border border-[#BF8C60]/10 bg-[#1A0F10]/88 p-2 shadow-[0_-20px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl">
              <Button
                asChild
                className="font-body group h-14 w-full rounded-full border border-[#BF8C60]/35 bg-[#BF8C60] text-base font-semibold text-[#1A0F10] transition-all duration-300 active:scale-[0.98] active:bg-[#8C3D20] active:text-[#D9BBA9] focus-visible:ring-2 focus-visible:ring-[#BF8C60] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A0F10]"
              >
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={"Criar minha marca de vinhos pelo WhatsApp"}
                  className="flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-[18px] w-[18px]" />
                  <span>{"Crie Sua Marca Agora"}</span>
                </a>
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
