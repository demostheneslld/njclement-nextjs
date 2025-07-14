import Section from '@/components/ui/Section';
import { siteConfig } from '@/config/constants';
import { ContactForm } from './contact-form';

export default function ContactView() {
  return (
    <Section
      title="Contact Me"
      subtitle="Have a question or want to collaborate? Send me a message!"
      background="fog"
    >
      <div className="max-w-xl mx-auto">
        <ContactForm />
      </div>
      <div className="mt-12 text-center">
        <p style={{color:'var(--c-text-med)'}}>You can also reach me directly at:</p>
        <a 
          href={`mailto:${siteConfig.email}`}
          className="text-lg font-medium text-primary-600 hover:text-primary-800 transition-colors duration-200 hover:underline"
        >
          {siteConfig.email}
        </a>
      </div>
    </Section>
  )
}
