import Image from "next/image";
import Button from "@/components/ui/button";
import GlassCard from "@/components/ui/GlassCard";
import Section from "@/components/ui/Section";

const teamMembers = [
  {
    name: "Nathaniel J. Clement",
    role: "Founder & Architect",
    image: "/team/nathan-clement.png",
    bio: "Builds scalable platforms, directs product strategy, and designs the technical foundations that power long-term growth.",
  },
  {
    name: "Molly Voorhees",
    role: "Owner & Lead Developer",
    image: "/team/molly-voorhees.png",
    bio: "Leads implementation across the stack with a focus on clarity, quality, and a polished user experience.",
  },
];

const principles = [
  "Senior execution",
  "Fast iteration",
  "Customer-obsessed delivery",
];

export default function TeamView() {
  return (
    <>
      <Section
        title="Our Team"
        subtitle="A compact, senior team built for speed and craftsmanship."
        background="gradient"
        gradientColors={["primary", "neutral", "accent"]}
        className="pt-20 pb-16"
        divider
      >
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <p className="text-xl text-med">
            We run a lean, founder-led studio that ships end-to-end product experiences.
            Every decision is made by the people who build the work.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {principles.map((item) => (
              <span
                key={item}
                className="px-4 py-2 rounded-full text-sm font-medium bg-glass-elev1 border border-accent/40 text-high"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </Section>

      <Section background="transparent" divider className="py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamMembers.map((member) => (
            <GlassCard key={member.name} className="p-8">
              <div className="flex flex-col items-center text-center space-y-5">
                <div className="relative">
                  <div
                    className="absolute -inset-1 rounded-full blur opacity-30"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--c-accent), var(--c-accent-contrast))",
                    }}
                  />
                  <div className="relative overflow-hidden rounded-full border-2 border-accent shadow-accent">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={240}
                      height={240}
                      className="object-cover"
                      sizes="(min-width: 768px) 240px, 200px"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-high">{member.name}</h3>
                  <p className="text-accent font-medium">{member.role}</p>
                </div>
                <p className="text-med">{member.bio}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      <Section background="accent" className="py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient">
            Ready to build with us?
          </h2>
          <p className="text-lg text-med">
            Let’s talk about the product, the timeline, and how we can help you ship.
          </p>
          <Button href="/contact" variant="primary" size="lg">
            Start a Project
          </Button>
        </div>
      </Section>
    </>
  );
}
