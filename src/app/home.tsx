"use client";

import SocialIcon from '@/components/socialIcon';
import Button from '@/components/ui/button';
import Section from '@/components/ui/Section';
import { CAREER_ITEMS, SELF_SUMMARY, SOCIAL_LINKS, TECHNICAL_PROFICIENCIES } from '@/config/constants';
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
      {/* Hero Console Section */}
      <section className="hero-console">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flip-board mb-8">
            SOFTWARE<br />ENGINEERING<br />LEADER &amp; ARCHITECT
          </div>
          
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <p className="kicker">
                {hero.description}
              </p>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative">
                <img 
                  alt="Nathan Clement" 
                  className="avatar-halo w-64 h-64 md:w-80 md:h-80 object-cover"
                  src="/profile.jpg" 
                />
              </div>
            </div>
          </div>

          <div className="cta-row mb-12">
            <Button 
              href={hero.primaryButton.href} 
              variant="primary"
              size="lg"
              icon={<span>▶</span>}
            >
              {hero.primaryButton.text}
            </Button>
            <Button 
              href={hero.secondaryButton.href} 
              variant="ghost"
              size="lg"
            >
              {hero.secondaryButton.text}
            </Button>
          </div>

          <div className="flex justify-center">
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

      {/* Career Path Section with Rail Cards */}
      <section className="section-surface py-section-y px-gutter">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="flip-board text-4xl md:text-5xl mb-6">{career.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{career.subtitle}</p>
          </div>
          
          <div className="relative">
            {/* Subway rail line */}
            <div className="absolute top-12 left-0 right-0 h-px bg-accent-rail opacity-30 hidden md:block"></div>
            
                                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {CAREER_ITEMS.map((item) => (
                 <div key={`career_${item.name}`} className={`project-card rail-green transform hover:-translate-y-1 transition-all duration-retro-hover`}>
                  <span className="rail-index"></span>
                  <div className="h-16 mb-4 flex items-center justify-center">
                    <img src={item.href} alt={`${item.name} logo`} className="max-h-full max-w-full" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2 uppercase tracking-label">{item.name}</h4>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="section-console py-section-y px-gutter">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="flip-board text-4xl md:text-5xl mb-6">{education.title}</h2>
            <p className="text-xl text-fg-secondary opacity-90 max-w-3xl mx-auto">{education.subtitle}</p>
          </div>
          
          <div className="card bg-bg-surface p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="w-40 h-40 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(/harvard-logo.png)` }}></div>
              <div className="flex flex-col md:mt-2">
                <div className="text-2xl font-semibold mb-2 text-gray-900">{education.university}, {education.graduation}</div>
                <div className="text-xl text-gray-700 mb-4">{education.degree}</div>
                <div className="grid gap-2 text-gray-600">
                  {education.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mr-2 text-accent-orange">●</div>
                      <div>{highlight}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section className="section-surface py-section-y px-gutter">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="flip-board text-4xl md:text-5xl mb-6">{skills.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{skills.subtitle}</p>
          </div>
          
          {Object.keys(skillsByTag).sort().map((tag) => (
            <div key={`tech_category_${tag}`} className="mb-16 last:mb-0">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center uppercase tracking-label border-b-2 border-accent-rail pb-2">{tag}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {skillsByTag[tag].map((item) => (
                  <div key={`tech_item_${item.name}`} className="project-card transform hover:-translate-y-1 transition-all duration-retro-hover">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2 uppercase tracking-label">{item.name}</h4>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-console">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flip-board mb-8">{cta.title}</div>
          <p className="kicker">
            {cta.description}
          </p>
          <div className="cta-row">
            <Button 
              href={cta.primaryButton.href} 
              variant="primary"
              size="lg"
              icon={<span>▶</span>}
            >
              {cta.primaryButton.text}
            </Button>
            <Button 
              href={cta.secondaryButton.href} 
              variant="ghost"
              size="lg"
            >
              {cta.secondaryButton.text}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
