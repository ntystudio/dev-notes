'use client'
import EmailSubscriptionForm from "@/components/EmailSubscription";

const Footer = () => {
  return <footer className="p-4 flex justify-center sm:justify-start items-center border-t-4 border-solid border-light-color-base-30> dark:border-dark-color-base-30">
    <div className="flex flex-col sm:flex-row items-center">
      <p className="font-mono text-sm uppercase mb-2 sm:mb-0">Receive our updates:</p>
      <EmailSubscriptionForm />
    </div>
  </footer>;
};

export default Footer;
