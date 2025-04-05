import { z } from 'zod';
import { useTranslations } from 'next-intl';

export const LoginFormSchema = () => {
    const t = useTranslations('LoginPage.errors');
    return z.object({
        email: z.string().min(2, {
            message: t('email'),
        }).max(50),
        password: z.string().min(2, {
            message: t('password'),
        }).max(50),
    });
}

export type CheckoutFormValues = z.infer<Awaited<ReturnType<typeof LoginFormSchema>>>;