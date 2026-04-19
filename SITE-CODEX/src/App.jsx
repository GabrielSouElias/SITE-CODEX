import Fold1Hero from "../Fold1Hero";

export default function App() {
  return (
    <main className="bg-[#1A0F10] text-[#D9BBA9]">
      <Fold1Hero />

      <section className="relative min-h-[140vh] overflow-hidden bg-[linear-gradient(180deg,#1A0F10_0%,#2A1416_36%,#1A0F10_100%)] px-6 py-24 md:px-10">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#BF8C60]/20 to-transparent"
        />
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-6 text-center">
          <p className="font-body text-[10px] uppercase tracking-[0.34em] text-[#BF8C60]/70 sm:text-xs">
            Área de Preview
          </p>
          <h2 className="font-display max-w-3xl text-4xl leading-[0.95] tracking-[-0.02em] text-[#D9BBA9] md:text-6xl">
            O próximo fold entra aqui quando você me enviar o próximo prompt.
          </h2>
          <p className="font-body max-w-2xl text-base leading-relaxed text-[#D9BBA9]/65 md:text-lg">
            Este bloco existe só para o preview local ter rolagem suficiente e
            permitir testar a transição do hero, o scroll indicator e a barra
            fixa de WhatsApp no mobile.
          </p>
        </div>
      </section>
    </main>
  );
}
