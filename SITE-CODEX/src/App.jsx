import Fold1Hero from "../Fold1Hero";
import Fold2Video from "./Fold2Video";
import Fold3Manifesto from "./Fold3Manifesto";
import Fold4CtaInterstitial from "./Fold4CtaInterstitial";

export default function App() {
  return (
    <main className="relative w-full max-w-[100vw] overflow-x-clip bg-[#1A0F10] text-[#D9BBA9]">
      <Fold1Hero />
      <Fold2Video />
      <Fold3Manifesto />
      <Fold4CtaInterstitial />
    </main>
  );
}
