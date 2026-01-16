import SocialIcon from '@/components/socialIcon';
import Button from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';
import Section from '@/components/ui/Section';
import TechnicalExpertise from '@/components/TechnicalExpertise';
import { CAREER_ITEMS, SELF_SUMMARY, SOCIAL_LINKS } from '@/config/constants';
import Image from 'next/image';
import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';
import ChatAboutMe from './chat/chat';

export default function HomeView() {
  const { hero, career, education, skills, cta } = SELF_SUMMARY;
  
  return (
    <>
      {/* Hero Section */}
      <Section 
        background="gradient" 
        gradientColors={["primary", "neutral", "accent"]}
        className="pt-10 pb-16 md:pt-16 md:pb-24"
        divider
      >
        <div className="glass-surface relative z-10">
          <div className="flex flex-col items-center gap-12">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
                <span className="text-white min-h-[60px]">{hero.title}</span> <br />{hero.subtitle}
              </h1>
              <p className="text-xl md:text-2xl text-slate-700 font-medium mb-8 max-w-2xl mx-auto">
                {hero.description}
              </p>
            </div>
            
            {/* Two photos side by side */}
            <div className="flex flex-col sm:flex-row justify-center gap-12 md:gap-16">
              {/* Photo 1 - Nathan */}
              <Link href="/team/nathan" className="group text-center">
                <div className="relative inline-block">
                  <div className="absolute -inset-1 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"
                       style={{
                         background: `linear-gradient(135deg, var(--c-accent), var(--c-accent-contrast))`
                       }}></div>
                  <div className="relative overflow-hidden rounded-full border-2 border-accent shadow-accent group-hover:scale-105 transition-transform duration-300">
                    <div className="absolute inset-0 rounded-full"
                         style={{
                           background: `linear-gradient(135deg, var(--c-accent), var(--c-accent-contrast))`,
                           opacity: 0.15,
                           mixBlendMode: 'overlay'
                         }}></div>
                    <Image
                      alt="Nathan Clement"
                      className="w-64 h-64 md:w-80 md:h-80 object-cover relative z-10"
                      src="/profile.png"
                      width={320}
                      height={320}
                      priority
                      sizes="(min-width: 768px) 320px, 256px"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-2xl font-bold text-white">Nathan Clement</h3>
                  <p className="text-lg text-med mt-1">Founder & Senior Software Engineer</p>
                </div>
              </Link>
              
              {/* Photo 2 - Molly */}
              <Link href="/team/molly" className="group text-center">
                <div className="relative inline-block">
                  <div className="absolute -inset-1 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"
                       style={{
                         background: `linear-gradient(135deg, var(--c-accent), var(--c-accent-contrast))`
                       }}></div>
                  <div className="relative overflow-hidden rounded-full border-2 border-accent shadow-accent group-hover:scale-105 transition-transform duration-300">
                    <div className="absolute inset-0 rounded-full"
                         style={{
                           background: `linear-gradient(135deg, var(--c-accent), var(--c-accent-contrast))`,
                           opacity: 0.15,
                           mixBlendMode: 'overlay'
                         }}></div>
                    <Image
                      alt="Molly Voorhees"
                      className="w-64 h-64 md:w-80 md:h-80 object-cover relative z-10"
                      src="/molly-photo.png"
                      width={320}
                      height={320}
                      priority
                      sizes="(min-width: 768px) 320px, 256px"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-2xl font-bold text-white">Molly Voorhees</h3>
                  <p className="text-lg text-med mt-1">Owner & Software Engineer/Designer</p>
                </div>
              </Link>
            </div>
            
            {/* Company Bio */}
            <div className="max-w-4xl mx-auto text-center mt-4">
              <h2 className="text-3xl font-bold text-white mb-6">Welcome to NJC Enterprises!</h2>
              <GlassCard className="p-8">
                <div className="space-y-4 text-med text-lg leading-relaxed">
                  <p>
                    NJC Enterprises is a software engineering firm founded by Nathan Clement and Molly Voorhees—a husband and wife team with a shared passion for building technology that works beautifully.
                  </p>
                  <p>
                    We specialize in custom AI software engineering and scaled SaaS platforms, crafting elegant solutions tailored to each client&apos;s unique needs. Our approach combines deep technical expertise with a commitment to intuitive design, ensuring every system we build empowers the people who use it.
                  </p>
                  <p>
                    With backgrounds spanning enterprise fraud prevention, payment orchestration, healthcare technology, and aerospace manufacturing, we bring a breadth of experience to every project. We stay at the forefront of AI developments to deliver modern, intelligent solutions that help our clients work smarter.
                  </p>
                  <p>
                    <strong className="text-white">What sets us apart:</strong> We believe in the luxury of custom software—systems designed specifically for you, not one-size-fits-all solutions. When you work with NJC Enterprises, you&apos;re working directly with the owners, and we treat every project with the care and attention it deserves.
                  </p>
                </div>
              </GlassCard>
            </div>
            
            {/* Button below bio */}
            <div className="flex justify-center mt-8">
              <Button 
                href="/contact" 
                variant="primary"
                size="lg"
              >
                Contact Us
              </Button>
            </div>
          </div>

          <div className="mt-20 flex justify-center px-4">
            <div className="flex flex-wrap justify-center gap-6 lg:gap-8 py-4">
              {SOCIAL_LINKS.map((item) => (
                <SocialIcon 
                  key={`social_${item.name}`} 
                  name={item.name} 
                  link={item.href} 
                  icon={item.icon} 
                  backgroundImageUrl={item.imageUrl}
                />
              ))}
            </div>
          </div>
        </div>
      </Section>


      {/* Chat About Me Section */}
      <Section
        title={"Ask Me Anything"}
        background="transparent"
        divider
      >
        <GlassCard className="p-6">
          <ChatAboutMe />
        </GlassCard>
      </Section>

      {/* Career Path Section */}
      <Section
        title={career.title}
        subtitle={career.subtitle}
        background="transparent"
        divider
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CAREER_ITEMS.map((item) => (
              <GlassCard key={`career_${item.name}`} className="p-6 text-center transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl">
                <div className="h-24 mb-4 flex items-center justify-center">
                  <Image
                    src={item.href}
                    alt={`${item.name} logo`}
                    className="max-h-full max-w-full object-contain"
                    width={160}
                    height={96}
                    sizes="(min-width: 1024px) 160px, 120px"
                  />
                </div>
                <h4 className="text-xl font-semibold text-high mb-2">{item.name}</h4>
                <p className="text-med">{item.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="accent" className="py-24">
        <div className="glass-surface text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 min-h-[60px] text-gradient">{cta.title}</h2>
            <p className="text-xl text-med mb-10 max-w-2xl mx-auto">
              {cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                href={cta.primaryButton.href} 
                variant="primary"
                size="lg"
                icon={<HiArrowRight />}
              >
                {cta.primaryButton.text}
              </Button>
              <Button 
                href={cta.secondaryButton.href} 
                variant="secondary"
                size="lg"
              >
                {cta.secondaryButton.text}
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
