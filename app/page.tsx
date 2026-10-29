import {
  Calculator, Capabilities, Competitors, Flow, Hero, Industries, Numbers,
  Overview, Problems, Roadmap, Security, SlideDots, Status, TopNav,
} from "./components/Sections";

/* Story order: what it is, why it is needed, what each group gets, how it looks, who it fits, how it compares, proof, trust, status, next. */
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
      <Competitors />
      <Numbers />
      <Security />
      <Status />
      <Roadmap />
    </>
  );
}
