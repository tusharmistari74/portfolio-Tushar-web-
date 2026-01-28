import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative bg-[#121212] min-h-screen text-[#ededed]">
      <ScrollyCanvas />
      <Overlay />
      <Projects />
      <Contact />
    </main>
  );
}
