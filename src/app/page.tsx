import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Projects } from "@/components/sections/Projects"
import { Mockups } from "@/components/sections/Mockups"
import { Experience } from "@/components/sections/Experience"
import { Skills } from "@/components/sections/Skills"
import { Testimonials } from "@/components/sections/Testimonials"
import { Contact } from "@/components/sections/Contact"
import { RevealObserver } from "@/components/RevealObserver"

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Mockups />
      <Experience />
      <Skills />
      <Testimonials />
      <Contact />
      <RevealObserver />
    </>
  )
}
