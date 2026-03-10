import Header from "@/components/layouts/header";
import Hero from "@/components/sections/hero/hero";
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-[1920px]">
      <Header/>
      <Hero/>
    </main>
  );
}
