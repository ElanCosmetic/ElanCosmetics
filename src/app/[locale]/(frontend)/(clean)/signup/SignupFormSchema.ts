import { z } from 'zod';
import { useTranslations } from 'next-intl';

export const SignUpFormSchema = () => {
    const t = useTranslations('SignupPage.errors');
    return z.object({
        firstName: z.string().min(2, {
            message: t('firstName'),
        }).max(50),
        secondName: z.string().min(2, {
            message: t('secondName'),
        }).max(50),
        email: z.string().email({
            message: t('email')
        }),
        password: z.string().min(6, {
            message: t('password')
        }).max(100, {
            message: t('passwordExceed')
        }),
        phone: z.string()
            .regex(/^(0\d{8}|\+373\d{8})$/, t('phoneInvalid'))
            .min(9, t('phoneMin'))
            .max(12, t('phoneMax')),
        confirmPassword: z.string().min(6, {
            message: t('password')
        }).max(100, {
            message: t('passwordExceed')
        })
    }).refine(data => data.password === data.confirmPassword, {
        message: t('confirmPassword'),
        path: ["confirmPassword"], // path of error
    });
}

export type CheckoutFormValues = z.infer<Awaited<ReturnType<typeof SignUpFormSchema>>>;