"use client";

import FadeInLogo from '@/components/fadeInLogo';
import SocialIcon from '@/components/socialIcon';
import Button from '@/components/ui/button';
import Section from '@/components/ui/Section';
import { bio, careerItems, homepageContent, socialLinks, technicalProficiencies } from '@/config/constants';
import { HiArrowRight } from 'react-icons/hi';
import ReactMarkdown from 'react-markdown';

export default function HomeView() {
  const { hero, about, career, education, skills, cta } = homepageContent;
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-20 md:pt-32 md:pb-32">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(112,112,245,0.12)_0%,rgba(0,0,0,0)_100%)]"></div>
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
                <div className="relative overflow-hidden rounded-full border-2 border-gray-200 animate-float shadow-stripe-md">
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
              {socialLinks.map((item) => (
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

      {/* About Section */}
      <Section 
        title={about.title} 
        subtitle={about.subtitle}
        background="white"
      >
        <div className="stripe-card max-w-4xl mx-auto">
          <div className="prose prose-lg prose-primary max-w-none">
            <ReactMarkdown>{bio}</ReactMarkdown>
          </div>
        </div>
      </Section>

      {/* Career Path Section */}
      <Section 
        title={career.title} 
        subtitle={career.subtitle}
        background="gray"
        divider
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {careerItems.map((item) => (
              <FadeInLogo 
                key={`career_${item.name}`} 
                name={item.name} 
                backgroundImageUrl={item.href} 
                description={item.description}
              />
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
          {Object.keys(technicalProficiencies).map((category) => (
            <div key={`tech_category_${category}`} className="mb-16 last:mb-0">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">{category}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {technicalProficiencies[category].map((item) => (
                  <FadeInLogo 
                    key={`tech_item_${item.name}`} 
                    name={item.name} 
                    backgroundImageUrl={item.href}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_50%,rgba(112,112,245,0.1)_0%,rgba(0,0,0,0)_100%)]"></div>
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
