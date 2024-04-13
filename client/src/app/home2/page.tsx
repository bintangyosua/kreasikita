import Hero from "@/components/home2/hero";
import Navbar from "@/components/home2/navbar";
import Reason from "@/components/home2/reason";
import Stats from "@/components/home2/stats";

export default function Home2() {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-10 px-2">
        <Navbar />
        <Hero />
        <Stats />
        <Reason />
      </div>
    </div>
  );
}
