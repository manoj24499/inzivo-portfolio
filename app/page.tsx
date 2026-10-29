import {
  Calculator, Capabilities, Competitors, Costing, Flow, Hero, Industries, Numbers,
  Overview, Pricing, Problems, Roadmap, Security, SlideDots, Status, TopNav,
} from "./components/Sections";

/* Story order: what it is, why it is needed, what each group gets, how it works, who it fits, proof, trust, status, then the market, price and cost, and what is next. */
export default function Home() {
  return (
    <>
      <TopNav />
      <SlideDots />
      <Hero />
      <Overview />
      <Problems />
      <Capabilities />
      <Flow />
      <Calculator />
      <Industries />
      <Numbers />
      <Security />
      <Status />
      <Competitors />
      <Pricing />
      <Costing />
      <Roadmap />
    </>
  );
}
