'use client';

import Section from '@/components/ui/Section';
import GlassCard from '@/components/ui/GlassCard';
import Link from 'next/link';
import Image from 'next/image';
import { HiArrowRight } from 'react-icons/hi';
import TechnicalExpertise from '@/components/TechnicalExpertise';
import { SELF_SUMMARY, CAREER_ITEMS } from '@/config/constants';

const { skills, career } = SELF_SUMMARY;

export default function ResumeView() {
  const teamMembers = [
    {
      name: "Nathan Clement",
      title: "Founder & Senior Software Engineer",
      image: "/profile.png",
      href: "/team/nathan",
      description: "Full-stack application architect specializing in enterprise fraud prevention, payment orchestration, and scalable SaaS platforms."
    },
    {
      name: "Molly Voorhees",
      title: "Owner & Software Engineer/Designer",
      image: "/molly-photo.png",
      href: "/team/molly",
      description: "Software engineer and designer with 14 years of healthcare experience, bringing a unique perspective to building intuitive systems."
    }
  ];

  return (
    <>
      <Section
        title="Portfolio"
        subtitle="Meet our team and explore our expertise"
        background="accent"
      >
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member) => (
            <Link key={member.name} href={member.href}>
              <GlassCard className="p-8 h-full hover:scale-[1.02] transition-transform cursor-pointer group">
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-40 h-40 rounded-full overflow-hidden mb-6 ring-2 ring-accent/30 group-hover:ring-accent/60 transition-all">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-accent text-lg mb-4">{member.title}</p>
                  <p className="text-med leading-relaxed mb-4">{member.description}</p>
                  <span className="text-accent flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                    View Full Profile <HiArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </Section>

      {/* Trusted By Industry Leaders Section */}
      <Section
        title={career.title}
        background="transparent"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAREER_ITEMS.map((item, index) => (
            <GlassCard key={index} className="p-6 text-center">
              <div className="h-20 mb-4 flex items-center justify-center">
                <Image 
                  src={item.href} 
                  alt={item.name} 
                  width={120} 
                  height={60} 
                  className="object-contain max-h-16"
                />
              </div>
              <h3 className="text-lg font-semibold text-high mb-2">{item.name}</h3>
              <p className="text-sm text-med">{item.description}</p>
            </GlassCard>
          ))}
        </div>
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
    </>
  );
}
