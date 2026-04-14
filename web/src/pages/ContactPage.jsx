import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';

const ContactPage = () => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 container mx-auto px-4 pt-24 pb-12 flex justify-center">
                <div className="w-full max-w-md">
                    <h1 className="text-4xl font-bold mb-8 text-center">{t('contact.hero.title')}</h1>
                    <ContactForm />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ContactPage;
