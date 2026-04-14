import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils.js';
import { useTranslation } from 'react-i18next';

const ContactForm = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = t('contact.form.errors.name_req');
        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = t('contact.form.errors.email_req');
        if (!formData.subject.trim()) newErrors.subject = t('contact.form.errors.subject_req');
        if (!formData.message.trim() || formData.message.length < 10) newErrors.message = t('contact.form.errors.message_req');
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
        try {
            // Encode data for mailto link
            const subject = encodeURIComponent(`[SIGIL Contacto] ${formData.subject}`);
            const body = encodeURIComponent(`Nombre: ${formData.name}\nEmail: ${formData.email}\n\nMensaje:\n${formData.message}`);
            
            // Open user's email client pointing to contacto@sigil.com
            window.location.href = `mailto:contacto@sigil.com?subject=${subject}&body=${body}`;

            // Small delay to simulate processing before success
            await new Promise(resolve => setTimeout(resolve, 800));
            
            setIsSuccess(true);
            toast.success(t('contact.form.success_title'));
            setTimeout(() => {
                setIsSuccess(false);
                setFormData({ name: '', email: '', subject: '', message: '' });
            }, 3000);
        } catch (error) {
            toast.error('Failed to send message.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClasses = (fieldName) => cn(
        "mt-2 bg-background/50 backdrop-blur-sm border-border/50 transition-all duration-300",
        focusedField === fieldName && "border-primary shadow-[0_0_15px_rgba(var(--primary),0.2)]",
        errors[fieldName] && "border-destructive focus-visible:ring-destructive"
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-6 relative">
            <AnimatePresence>
                {isSuccess && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl bg-background/90 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", delay: 0.2 }}
                        >
                            <CheckCircle2 className="h-16 w-16 text-primary mb-4" />
                        </motion.div>
                        <h3 className="text-2xl font-bold">{t('contact.form.success_title')}</h3>
                        <p className="text-muted-foreground mt-2">{t('contact.form.success_desc')}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-1">
                    <Label htmlFor="name" className="text-sm font-medium text-foreground/80">{t('contact.form.name')}</Label>
                    <Input
                        id="name" name="name" value={formData.name} onChange={handleChange}
                        onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)}
                        className={inputClasses('name')} placeholder={t('contact.form.name_placeholder')}
                    />
                    <AnimatePresence>
                        {errors.name && (
                            <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-destructive flex items-center gap-1 mt-1">
                                <AlertCircle className="h-3 w-3" /> {errors.name}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>

                <div className="space-y-1">
                    <Label htmlFor="email" className="text-sm font-medium text-foreground/80">{t('contact.form.email')}</Label>
                    <Input
                        id="email" name="email" type="email" value={formData.email} onChange={handleChange}
                        onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                        className={inputClasses('email')} placeholder={t('contact.form.email_placeholder')}
                    />
                    <AnimatePresence>
                        {errors.email && (
                            <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-destructive flex items-center gap-1 mt-1">
                                <AlertCircle className="h-3 w-3" /> {errors.email}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="space-y-1">
                <Label htmlFor="subject" className="text-sm font-medium text-foreground/80">{t('contact.form.subject')}</Label>
                <Input
                    id="subject" name="subject" value={formData.subject} onChange={handleChange}
                    onFocus={() => setFocusedField('subject')} onBlur={() => setFocusedField(null)}
                    className={inputClasses('subject')} placeholder={t('contact.form.subject_placeholder')}
                />
                <AnimatePresence>
                    {errors.subject && (
                        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-destructive flex items-center gap-1 mt-1">
                            <AlertCircle className="h-3 w-3" /> {errors.subject}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            <div className="space-y-1">
                <Label htmlFor="message" className="text-sm font-medium text-foreground/80">{t('contact.form.message')}</Label>
                <Textarea
                    id="message" name="message" value={formData.message} onChange={handleChange} rows={6}
                    onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)}
                    className={cn(inputClasses('message'), "resize-none")} placeholder={t('contact.form.message_placeholder')}
                />
                <AnimatePresence>
                    {errors.message && (
                        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-xs text-destructive flex items-center gap-1 mt-1">
                            <AlertCircle className="h-3 w-3" /> {errors.message}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 text-base font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(var(--primary),0.4)] active:scale-[0.98]"
            >
                {isSubmitting ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full" />
                ) : (
                    <>
                        <Send className="mr-2 h-5 w-5" /> {t('contact.form.submit')}
                    </>
                )}
            </Button>
        </form>
    );
};

export default ContactForm;