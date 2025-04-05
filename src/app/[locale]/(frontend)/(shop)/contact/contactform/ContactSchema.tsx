import { useTranslations } from 'next-intl';
import { z } from 'zod';

export const ContactSchema = () => {
    const t = useTranslations('ContactPage.errors')
    return z.object({
        name: z.string().min(2, t('nameMin')).max(50, t('nameMax')),
        secondName: z.string().min(2, t('secondMin')).max(50, t('secondMax')),
        email: z.string().email(t('email')),
        phone: z.string()
            .regex(/^(0\d{8}|\+373\d{8})$/, t('phoneInvalid'))
            .min(9, t('phoneMin'))
            .max(12, t('phoneMax')),
        message: z.string().min(10, t('messageMin')).max(500, t('messageMax')),
        terms: z.boolean().refine(value => value === true, { message: t('terms') }),
    });
}

export type ContactFormValues = z.infer<ReturnType<typeof ContactSchema>>;
