import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/luxury/ScrollReveal";

export const metadata: Metadata = {
  title: "Projects | Adlane Luxury Interiors",
  description: "Explore our portfolio of completed interior design projects.",
};

export default function ProjectsPage() {
  return (
    <div className="bg-[#FAFAF8] pb-32 pt-40 dark:bg-[#1A1816]">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <ScrollReveal className="mb-20 max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#8B6F4E]">
            Portfolio
          </p>
          <h1 className="editorial-heading font-serif text-5xl font-light md:text-6xl lg:text-7xl">
            Curated spaces
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/70">
            A selection of private residences and luxury hospitality projects where
            Adlane collections were composed into complete living experiences.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <StaggerItem key={project.slug}>
              <Link href="#" className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8 text-white">
                    <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-wider text-white/70">
                      {project.location} · {project.year}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    <h3 className="font-serif text-2xl font-medium">{project.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-white/80">
                      {project.description}
                    </p>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
