import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

// ============================================
// IMAGE PLACEHOLDERS - Replace with real brand photography
// ============================================
const MANIFESTO_IMAGES = {
  origem: {
    desktop:
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=1200&auto=format&fit=crop&q=80",
    mobile:
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=700&auto=format&fit=crop&q=80",
    alt: "Vinhedo na Serra Gaucha ao amanhecer",
  },
  exclusividade: {
    desktop:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&auto=format&fit=crop&q=80",
    mobile:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=700&auto=format&fit=crop&q=80",
    alt: "Garrafas de vinho em adega de pedra",
  },
  personalizacao: {
    desktop:
      "https://images.unsplash.com/photo-1569919659476-f0852f6834b7?w=1200&auto=format&fit=crop&q=80",
    mobile:
      "https://images.unsplash.com/photo-1569919659476-f0852f6834b7?w=700&auto=format&fit=crop&q=80",
    alt: "Close em garrafa de vinho com rotulo premium",
  },
};

const DECLARATIONS = [
  {
    numeral: "I",
    title: "Origem que se prova no paladar",
    body:
      "Serra Gaucha, onde a altitude e o clima desenham vinhos de carater unico. Nossos parceiros sao vinicolas premiadas que cultivam uvas nobres ha geracoes — cada garrafa carrega essa historia antes mesmo de carregar o seu nome.",
    metadata: "SERRA GAUCHA · RS · 29°10'S 51°31'W",
    image: MANIFESTO_IMAGES.origem,
    figureClassName: "lg:col-span-7",
    textClassName: "lg:col-span-5 lg:col-start-8 lg:pt-24",
  },
  {
    numeral: "II",
    title: "Raridade por natureza",
    body:
      "Produzimos em pequenos lotes a partir de apenas sessenta garrafas. Sua marca nao sera uma entre mil — sera unica, finita, pensada para quem compreende que valor se mede em presenca, nao em abundancia.",
    metadata: "LOTE MINIMO · 60 GARRAFAS · PRODUCAO LIMITADA",
    image: MANIFESTO_IMAGES.exclusividade,
    figureClassName: "lg:order-2 lg:col-span-6 lg:col-start-7",
    textClassName: "lg:order-1 lg:col-span-5 lg:pt-12",
  },
  {
    numeral: "III",
    title: "Seu nome, sua identidade, seu vinho",
    body:
      "Cuidamos de cada detalhe do rotulo a entrega — do design a impressao, da escolha do papel a curadoria dos vinhos. O resultado e uma marca que parece sempre ter existido, porque foi construida com o tempo e o rigor que uma marca premium merece.",
    metadata: "ROTULO · ENGARRAFAMENTO · ENTREGA",
    image: MANIFESTO_IMAGES.personalizacao,
    figureClassName: "lg:col-span-6",
    textClassName: "lg:col-span-5 lg:col-start-8 lg:pt-20",
  },
];

const FONT_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,300;1,9..144,400;1,9..144,700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400&display=swap');

  .font-display {
    font-family: "Fraunces", serif;
  }

  .font-body {
    font-family: "DM Sans", sans-serif;
  }

  ::selection {
    background-color: rgba(191, 140, 96, 0.25);
    color: #D9BBA9;
  }
`;

function EditorialImage({ image, isDesktop, prefersReducedMotion }) {
  const imageRef = useRef(null);
  const isInView = useInView(imageRef, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  return (
    <motion.figure
      ref={imageRef}
      className="group relative aspect-[4/5] overflow-hidden rounded-[0.65rem] bg-[#2A1416] lg:aspect-[3/4]"
      initial={
        prefersReducedMotion ? false : { opacity: 0, scale: 1.05 }
      }
      animate={
        prefersReducedMotion || isInView
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: 1.05 }
      }
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 1.2, ease: EASE }
      }
    >
      <motion.img
        src={image.mobile}
        srcSet={`${image.mobile} 700w, ${image.desktop} 1200w`}
        sizes="(max-width: 1024px) 100vw, 50vw"
        alt={image.alt}
        className="absolute inset-0 h-full w-full object-cover brightness-[0.5] transition-[filter] duration-1000 ease-out lg:brightness-[0.55] lg:group-hover:brightness-[0.65]"
        loading="lazy"
        decoding="async"
        draggable="false"
        style={
          isDesktop && !prefersReducedMotion
            ? { y: imgY }
            : undefined
        }
        whileHover={
          isDesktop && !prefersReducedMotion ? { scale: 1.02 } : undefined
        }
        transition={{ duration: 1, ease: EASE }}
      />
      <div
        className="pointer-events-none absolute inset-0 mix-blend-multiply"
        style={{
          background:
            "linear-gradient(135deg, rgba(26,15,16,0.4) 0%, rgba(140,61,32,0.25) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background:
            "linear-gradient(to top, rgba(26,15,16,0.5) 0%, transparent 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#BF8C60]/8" />
    </motion.figure>
  );
}

function ManifestoDeclaration({
  numeral,
  title,
  body,
  metadata,
  image,
  figureClassName,
  textClassName,
  isDesktop,
  prefersReducedMotion,
}) {
  const articleRef = useRef(null);
  const isInView = useInView(articleRef, { once: true, amount: 0.3 });

  const textAnimate = (delay, y = 30) => {
    if (prefersReducedMotion) {
      return {
        initial: false,
        animate: { opacity: 1, x: 0, y: 0 },
        transition: { duration: 0 },
      };
    }

    return {
      initial: {
        opacity: 0,
        y: isDesktop ? y : 0,
        x: 0,
      },
      animate: isInView
        ? { opacity: 1, x: 0, y: 0 }
        : {
            opacity: 0,
            y: isDesktop ? y : 0,
            x: 0,
          },
      transition: {
        duration: 0.8,
        delay,
        ease: EASE,
      },
    };
  };

  return (
    <article
      ref={articleRef}
      className="group mt-16 grid grid-cols-1 gap-6 lg:mt-40 lg:grid-cols-12 lg:gap-16"
    >
      <div className={figureClassName}>
        <EditorialImage
          image={image}
          isDesktop={isDesktop}
          prefersReducedMotion={prefersReducedMotion}
        />
      </div>

      <motion.div
        className={`flex flex-col items-start text-left ${textClassName}`}
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={isInView || prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
        transition={
          prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: EASE }
        }
      >
        <motion.span
          className="font-display text-4xl italic text-[#BF8C60]/60 transition-colors duration-700 group-hover:text-[#BF8C60]/90 lg:text-7xl"
          initial={
            prefersReducedMotion
              ? false
              : { opacity: 0, x: isDesktop ? -20 : 0 }
          }
          animate={
            isInView || prefersReducedMotion
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: isDesktop ? -20 : 0 }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.7, delay: 0.1, ease: EASE }
          }
        >
          {numeral}
        </motion.span>

        <motion.h3
          className="font-display mt-4 max-w-[14ch] text-2xl leading-tight tracking-[-0.01em] text-[#D9BBA9] sm:text-3xl lg:text-4xl"
          {...textAnimate(0.2, 30)}
        >
          {title}
        </motion.h3>

        <motion.p
          className="font-body mt-5 max-w-md text-sm leading-relaxed text-[#D9BBA9]/70 lg:text-base"
          {...textAnimate(0.35, 20)}
        >
          {body}
        </motion.p>

        <motion.p
          className="font-body mt-6 text-[10px] font-medium uppercase tracking-[0.25em] text-[#D9BBA9]/40 lg:text-xs"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={isInView || prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.6, delay: 0.55, ease: EASE }
          }
        >
          {metadata}
        </motion.p>
      </motion.div>
    </article>
  );
}

export default function Fold3Manifesto() {
  const introRef = useRef(null);
  const closingRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const introInView = useInView(introRef, { once: true, amount: 0.3 });
  const closingInView = useInView(closingRef, { once: true, amount: 0.3 });

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

  const introReveal = (delay, y = 40, extra = {}) => {
    if (prefersReducedMotion) {
      return {
        initial: false,
        animate: { opacity: 1, y: 0, scaleX: 1 },
        transition: { duration: 0 },
      };
    }

    const initialState = {
      opacity: 0,
      y: isDesktop ? y : 0,
      ...extra,
    };

    return {
      initial: initialState,
      animate: introInView
        ? { opacity: 1, y: 0, scaleX: 1 }
        : initialState,
      transition: {
        duration: 0.9,
        delay,
        ease: EASE,
      },
    };
  };

  return (
    <>
      <style>{FONT_STYLES}</style>

      <section
        id="fold-3"
        className="relative w-full max-w-full overflow-hidden bg-[#1A0F10] px-6 py-20 md:px-6 md:py-28 lg:px-0 lg:py-40"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
        >
          <div
            className="absolute left-0 right-0 top-0 h-[400px]"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(166,44,33,0.07) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute right-0 top-1/3 h-[500px] w-[600px] max-w-[70vw]"
            style={{
              background:
                "radial-gradient(ellipse at 70% 50%, rgba(140,61,32,0.05) 0%, transparent 60%)",
            }}
          />
          <div
            className="absolute left-1/2 top-[15%] h-[300px] w-[500px] max-w-[86vw] -translate-x-1/2 lg:h-[400px] lg:w-[700px]"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(191,140,96,0.05) 0%, transparent 65%)",
            }}
          />
        </div>

        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.03] mix-blend-overlay"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="manifestoGrain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#manifestoGrain)" />
        </svg>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#BF8C60]/20 to-transparent"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-0 sm:px-0 lg:px-12">
          <div ref={introRef} className="mx-auto max-w-5xl text-center">
            <motion.p
              className="font-body mb-8 text-[10px] font-medium uppercase tracking-[0.4em] text-[#BF8C60]/80 sm:text-xs lg:mb-12"
              {...introReveal(0, 20)}
            >
              {"— MANIFESTO —"}
            </motion.p>

            <motion.h2
              className="font-display mx-auto max-w-[20ch] text-3xl font-normal leading-[1.05] tracking-[-0.015em] text-[#D9BBA9] sm:max-w-[24ch] sm:text-4xl md:text-5xl lg:max-w-4xl lg:text-6xl xl:text-7xl"
              {...introReveal(0.15, 40)}
            >
              {"Para quem deseja mais do que uma garrafa — mas uma "}
              <span className="italic text-[#BF8C60]">{"herança"}</span>
              {"."}
            </motion.h2>

            <motion.p
              className="font-body mx-auto mt-6 max-w-2xl px-2 text-sm leading-relaxed text-[#D9BBA9]/70 sm:text-base lg:mt-8 lg:px-0 lg:text-lg"
              {...introReveal(0.35, 25)}
            >
              {
                "Nascemos da convicção de que vinhos extraordinarios merecem nomes extraordinarios. Trabalhamos lado a lado com as vinicolas mais respeitadas da Serra Gaucha para que cada marca que criamos carregue verdade de origem — nao apenas um rotulo bonito, mas um vinho de carater."
              }
            </motion.p>

            <motion.div
              className="mx-auto mt-16 h-px w-16 origin-center bg-gradient-to-r from-transparent via-[#BF8C60]/40 to-transparent lg:mt-24"
              initial={prefersReducedMotion ? false : { scaleX: 0 }}
              animate={
                introInView || prefersReducedMotion
                  ? { scaleX: 1 }
                  : { scaleX: 0 }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.9, delay: 0.55, ease: EASE }
              }
            />
          </div>

          <div className="mt-16 lg:mt-24">
            {DECLARATIONS.map((item) => (
              <ManifestoDeclaration
                key={item.numeral}
                {...item}
                isDesktop={isDesktop}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>

          <motion.div
            ref={closingRef}
            className="mx-auto mt-24 max-w-4xl text-center lg:mt-40"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={
              closingInView || prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0 }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.5, ease: EASE }
            }
          >
            <motion.span
              className="font-display text-4xl italic text-[#BF8C60]/60 lg:text-7xl"
              initial={
                prefersReducedMotion
                  ? false
                  : { opacity: 0, y: isDesktop ? 20 : 0 }
              }
              animate={
                closingInView || prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: isDesktop ? 20 : 0 }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.7, ease: EASE }
              }
            >
              {"IV"}
            </motion.span>

            <motion.p
              className="font-display mx-auto mt-6 max-w-[22ch] text-3xl italic leading-[1.1] tracking-[-0.015em] text-[#D9BBA9] sm:max-w-[28ch] sm:text-4xl md:text-5xl lg:max-w-4xl lg:text-6xl"
              initial={
                prefersReducedMotion
                  ? false
                  : { opacity: 0, y: isDesktop ? 40 : 0 }
              }
              animate={
                closingInView || prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: isDesktop ? 40 : 0 }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 1.1, delay: 0.2, ease: EASE }
              }
            >
              {"Nao criamos rotulos. Construimos "}
              <span className="text-[#BF8C60]">{"marcas"}</span>
              {" que merecem durar."}
            </motion.p>

            <motion.p
              className="font-display mt-10 text-lg italic text-[#BF8C60]/80 lg:mt-14 lg:text-xl"
              initial={
                prefersReducedMotion
                  ? false
                  : { opacity: 0, y: isDesktop ? 15 : 0 }
              }
              animate={
                closingInView || prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: isDesktop ? 15 : 0 }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.7, delay: 0.5, ease: EASE }
              }
            >
              {"— Adega Propria"}
            </motion.p>
          </motion.div>
        </div>

        <div
          aria-hidden="true"
          className="relative z-10 mt-24 h-px w-full bg-gradient-to-r from-transparent via-[#BF8C60]/20 to-transparent lg:mt-40"
        />
      </section>
    </>
  );
}
