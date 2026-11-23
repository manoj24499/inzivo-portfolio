import {
  Capabilities, Flow, Hero, Industries, Numbers,
  Overview, Payroll, Problems, Security, SlideDots, TopNav,
} from "./components/Sections";

/* Story order: what it is, why it is needed, what each group gets, how it works, who it fits, proof, and trust. */
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
      <Payroll />
      <Industries />
      <Numbers />
      <Security />
    </>
  );
}
