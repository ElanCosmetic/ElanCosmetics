import { z } from 'zod';
import { useTranslations } from 'next-intl';

export const FormSchema = () => {
    const t = useTranslations('CheckoutPage.errors');
    return z.object({
        name: z.string()
            .min(2, t('name_min'))
            .max(50, t('name_max')),

        phone: z.string()
            .min(2, t('phone_min'))
            .max(50, t('phone_max')),

        email: z.string().email(t('email_invalid')),

        address: z.string()
            .min(2, t('address_min'))
            .max(100, t('address_max')),

        city: z.string()
            .min(2, t('city_min'))
            .max(50, t('city_max')),

        terms: z.boolean().refine(value => value === true, {
            message: t('terms_required'),
        }),

        numerar: z.boolean().refine(value => value === true, {
            message: t('payment_required'),
        }),

        customer: z.string().optional().nullable(),

        guestInfo: z.object({
            name: z.string().max(50),
            email: z.string().email(),
            phone: z.string().max(50),
        }).optional(),

        subtotal: z.number(),
        totalAmount: z.number(),
        shippingCost: z.number(),
        discount: z.object({
            code: z.string(),
            type: z.enum(['fixed', 'percent']),
            value: z.number()
        }).optional().nullable(),
        items: z.array(z.object({
            product: z.string(),
            quantity: z.number(),
            totalPrice: z.number(),
        }))
    });
}

export type CheckoutFormValues = z.infer<Awaited<ReturnType<typeof FormSchema>>>;