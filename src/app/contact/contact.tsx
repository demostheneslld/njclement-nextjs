import GlassCard from '@/components/ui/GlassCard';
import Section from '@/components/ui/Section';
import { siteConfig } from '@/config/constants';
import { ContactForm } from './contact-form';

export default function ContactView() {
  return (
    <Section
      title="Contact Me"
      subtitle="Have a question or want to collaborate? Send me a message!"
      background="transparent"
    >
      <div className="max-w-xl mx-auto">
        <GlassCard className="p-8 mb-8">
          <ContactForm />
        </GlassCard>
        <GlassCard className="p-6 text-center">
          <p className="text-med mb-4">You can also reach me directly at:</p>
          <a 
            href={`mailto:${siteConfig.email}`}
            className="text-lg font-medium text-accent hover:text-accent-sub transition-colors duration-200 hover:underline"
          >
            {siteConfig.email}
          </a>
        </GlassCard>
      </div>
    </Section>
  )
}
