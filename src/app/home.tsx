"use client";

import SocialIcon from '@/components/socialIcon';
import Button from '@/components/ui/button';
import Section from '@/components/ui/Section';
import { CAREER_ITEMS, SELF_SUMMARY, SOCIAL_LINKS, TECHNICAL_PROFICIENCIES } from '@/config/constants';
import { HiArrowRight } from 'react-icons/hi';
import ChatAboutMe from './chat/chat';

export default function HomeView() {
  const { hero, career, education, skills, cta } = SELF_SUMMARY;
  
  const skillsByTag = TECHNICAL_PROFICIENCIES.reduce((acc: Record<string, typeof TECHNICAL_PROFICIENCIES>, skill) => {
    skill.tags.forEach(tag => {
      if (!acc[tag]) {
        acc[tag] = [];
      }
      acc[tag].push(skill);
    });
    return acc;
  }, {});
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-20 md:pt-32 md:pb-32">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,transparent_0%,rgba(0,0,0,0)_100%)] from-primary-500/10"></div>
        <div className="stripe-container relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
                <span className="text-gradient min-h-[60px]">{hero.title}</span> <br />{hero.subtitle}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
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
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full blur opacity-30"></div>
                <div className="relative overflow-hidden rounded-full border-2 border-gray-200 shadow-stripe-md">
                  <img 
                    alt="Nathan Clement" 
                    className="w-64 h-64 md:w-80 md:h-80 object-cover"
                    src="/profile.jpg" 
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 flex justify-center">
            <div className="flex flex-wrap justify-center gap-4 lg:gap-8">
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
      </section>


      {/* Chat About Me Section */}
      <Section 
        title={"Chat About Me"} 
        subtitle={"NathanBot is an expert - what do you want to know?"}
        background="gray"
        divider
      >
        <ChatAboutMe />
      </Section>

      {/* Career Path Section */}
      <Section 
        title={career.title} 
        subtitle={career.subtitle}
        background="gray"
        divider
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CAREER_ITEMS.map((item) => (
              <div key={`career_${item.name}`} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 p-6 text-center border border-gray-100/50">
                <div className="h-24 mb-4 flex items-center justify-center">
                  <img src={item.href} alt={`${item.name} logo`} className="max-h-full max-w-full" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h4>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Education Section */}
      <Section 
        title={education.title} 
        subtitle={education.subtitle}
        background="white"
      >
        <div className="stripe-card max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="w-40 h-40 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(/harvard-logo.png)` }}></div>
            <div className="flex flex-col md:mt-2">
              <div className="text-2xl font-semibold mb-2">{education.university}, {education.graduation}</div>
              <div className="text-xl text-gray-700 mb-4">{education.degree}</div>
              <div className="grid gap-2 text-gray-600">
                {education.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-2 text-primary-500">•</div>
                    <div>{highlight}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Technical Skills Section */}
      <Section 
        title={skills.title} 
        subtitle={skills.subtitle}
        background="gray"
        divider
      >
        <div className="max-w-6xl mx-auto">
          {Object.keys(skillsByTag).sort().map((tag) => (
            <div key={`tech_category_${tag}`} className="mb-16 last:mb-0">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">{tag}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {skillsByTag[tag].map((item) => (
                  <div key={`tech_item_${item.name}`} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 p-6 border border-gray-100/50">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_50%,transparent_0%,rgba(0,0,0,0)_100%)] from-primary-500/10"></div>
        <div className="stripe-container text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 min-h-[60px] text-gradient">{cta.title}</h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
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
      </section>
    </>
  );
}
