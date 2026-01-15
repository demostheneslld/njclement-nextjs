import SocialIcon from '@/components/socialIcon';
import Button from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';
import Section from '@/components/ui/Section';
import TechnicalExpertise from '@/components/TechnicalExpertise';
import { CAREER_ITEMS, SELF_SUMMARY, SOCIAL_LINKS } from '@/config/constants';
import Image from 'next/image';
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
        className="pt-20 pb-20 md:pt-32 md:pb-32"
        divider
      >
        <div className="glass-surface relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
                <span className="text-gradient min-h-[60px]">{hero.title}</span> <br />{hero.subtitle}
              </h1>
              <p className="text-xl md:text-2xl text-med mb-8 max-w-2xl mx-auto lg:mx-0">
                {hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  href={hero.primaryButton.href} 
                  variant="primary"
                  size="lg"
                  icon={<HiArrowRight />}
                >
                  {hero.primaryButton.text}
                </Button>
                <Button 
                  href={hero.secondaryButton.href} 
                  variant="secondary"
                  size="lg"
                >
                  {hero.secondaryButton.text}
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full blur opacity-30"
                     style={{
                       background: `linear-gradient(135deg, var(--c-accent), var(--c-accent-contrast))`
                     }}></div>
                <div className="relative overflow-hidden rounded-full border-2 border-accent shadow-accent">
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
        title={"Chat About Me"}
        subtitle={"NathanBot is an expert - what do you want to know?"}
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

      {/* Education Section */}
      <Section
        title={education.title}
        subtitle={education.subtitle}
        background="transparent"
      >
        <GlassCard as="div" className="max-w-4xl mx-auto p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="w-40 h-40 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(/harvard-logo.png)` }}></div>
            <div className="flex flex-col md:mt-2">
              <div className="text-2xl font-semibold mb-2 text-high">{education.university}, {education.graduation}</div>
              <div className="text-xl text-med mb-4">{education.degree}</div>
              <div className="grid gap-2 text-med">
                {education.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-2 text-accent">•</div>
                    <div>{highlight}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>
      </Section>

      {/* Technical Skills Section */}
      <Section
        title={skills.title}
        subtitle={skills.subtitle}
        background="transparent"
        divider
      >
        <TechnicalExpertise />
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
