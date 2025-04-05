'use client'
import { ContactFormValues } from "./ContactSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { ContactSchema } from "./ContactSchema";
import ContactInput from "./ContactInput";
import { useState } from 'react';

// ui
import {
    Form,
    FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Dialog } from '@radix-ui/react-dialog';
import SuccessDialog from "../../../components/Dialogs/SuccesDialog";
import FailedDialog from "../../../components/Dialogs/FaildedDialog";
import { useTranslations } from "next-intl";
const ContactForm = () => {
    const [orderStatus, setOrderStatus] = useState<'success' | 'error' | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const t = useTranslations("ContactPage")

    const defaultValues: ContactFormValues = {
        name: '',
        secondName: '',
        phone: '',
        email: '',
        message: '',
        terms: false,
    };

    const contactSchema = ContactSchema();

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        defaultValues
    });

    const fields: { name: "name" | "secondName" | "email" | "phone" | "message"; type: string; placeholder: string; columns: 1 | 2 }[] = [
        { name: "name", type: "text", placeholder: t('firstName'), columns: 1 },
        { name: "secondName", type: "text", placeholder: t('secondName'), columns: 1 },
        { name: "email", type: "email", placeholder: t('email'), columns: 1 },
        { name: "phone", type: "tel", placeholder: t('phone'), columns: 1 },
        { name: "message", type: "text", placeholder: t('message'), columns: 2 },
    ];

    async function onSubmit(values: ContactFormValues) {
        setOrderStatus('success');

        const messageData = {
            customer: {
                name: values.name,
                secondName: values.secondName,
                email: values.email,
                phone: values.phone
            },
            message: values.message
        }

        try {
            const response = await fetch('/api/customerContactMessages', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(messageData)
            });
            if (response.ok) {
                setOrderStatus('success');
            } else {
                setOrderStatus('error');
            }
        } catch (error) {
            setOrderStatus('error');
            console.error("Order Failed", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col gap-5">
            <h2 className="uppercase font-semibold text-lg md:text-xl">{t('question')}</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="text-gray-700 flex flex-col gap-4" >
                    <div className="grid grid-cols-2 gap-4">
                        {fields.map((field, index) => (
                            <ContactInput
                                key={index}
                                form={form}
                                name={field.name}
                                type={field.type}
                                placeholder={field.placeholder}
                                columns={field.columns}
                            />
                        ))}
                    </div>
                    <div>
                        <Controller
                            name="terms"
                            control={form.control}
                            render={({ field }) => (
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="terms" checked={field.value} onCheckedChange={field.onChange} />
                                    <Label htmlFor="terms" className='text-gray-500 text-xs md:text-sm'>{t('terms')}</Label>
                                </div>
                            )}
                        />
                        {form.formState.errors.terms && <FormMessage>{form.formState.errors.terms.message}</FormMessage>}
                    </div>
                    <Button type="submit" className="bg-custompink hover:bg-pink-400 focus:bg-pink-500 py-6 text-sm md:text-base">
                        {isLoading ? t('loading') : t('submit')}
                    </Button>
                    <Dialog open={orderStatus === 'success' || orderStatus === 'error'}>
                        {orderStatus === 'success' ?
                            <SuccessDialog
                                title={t('success.title')}
                            /> :
                            <FailedDialog
                                title={t('failed.title')}
                                description={t('failed.description')}
                            />}
                    </Dialog>
                </form>
            </Form>
        </div>
    );
}

export default ContactForm;