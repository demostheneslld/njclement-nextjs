import { ReactElement } from 'react';
import { ContactForm } from './contact-form';

const ContactView = (): ReactElement => {
  return (
    <div className="flex flex-col gap-4 min-w-[300px]">
      <ContactForm />
    </div>
  )
}

export default ContactView;
