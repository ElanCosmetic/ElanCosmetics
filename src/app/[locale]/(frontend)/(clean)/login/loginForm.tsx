'use client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Link } from '@/i18n/navigation'
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl'

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import React from 'react'
import { useLocale } from 'next-intl'
import { LoginFormSchema } from './LoginFormSchema'

const LoginForm = () => {
    const locale = useLocale();
    const router = useRouter();
    const t = useTranslations("LoginPage");
    const formSchema = LoginFormSchema();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                router.replace(`/${locale}/account`)
            } else {
                form.setError("password", {
                    type: "manual",
                    message: t("errors.incorrectPassword"),
                });
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='flex flex-col gap-5 md:gap-8 bg-white p-6 md:p-8 lg:p-10 rounded-lg'>
            <h1 className='text-gray-700 text-2xl font-bold uppercase text-center'>{t('title')}</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 flex flex-col items-center'>
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-gray-700'>{t('email')}</FormLabel>
                                <FormControl>
                                    <Input type='email' placeholder='email@gmail.com' className='text-gray-700 w-full md:w-96' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-gray-700'>{t('password')}</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder='Super secret' className='text-gray-700 w-full md:w-96' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">{t('submit')}</Button>
                </form>
            </Form>
            <div className='flex gap-2 items-baseline justify-center flex-wrap'>
                <span className='text-gray-500 text-sm md:text-base'>{t('dontHaveAcc')}</span><Link href="/signup" locale={locale} className='text-gray-500 underline text-sm md:text-base'>{t('signup')}</Link>
            </div>
        </div>
    )
}

export default LoginForm;