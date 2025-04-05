'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from '@/i18n/navigation'
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

import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { SignUpFormSchema } from './SignupFormSchema'

const SignUpForm = () => {
    const locale = useLocale();
    const router = useRouter();
    const t = useTranslations("SignupPage");
    const formSchema = SignUpFormSchema();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: '',
            secondName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const userData = {
            email: values.email,
            password: values.password,
            firstName: values.firstName,
            lastName: values.secondName,
            phone: values.phone,
            role: 'customer'
        }

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                router.replace(`/${locale}/account`)
            } else {
                console.error('Sign-up failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className='flex flex-col gap-5 md:gap-8 bg-white p-6 md:p-8 lg:p-10 rounded-lg'>
            <h1 className='text-gray-700 text-2xl font-bold uppercase text-center'>{t('title')}</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 flex flex-col items-center'>
                    <FormField
                        control={form.control}
                        name='firstName'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-gray-700'>{t('firstName')}</FormLabel>
                                <FormControl>
                                    <Input placeholder='Petcov' className='text-gray-700 w-full md:w-96' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='secondName'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-gray-700'>{t('secondName')}</FormLabel>
                                <FormControl>
                                    <Input placeholder='Daniel' className='text-gray-700 w-full md:w-96' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                        name='phone'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-gray-700'>{t('tel')}</FormLabel>
                                <FormControl>
                                    <Input type='tel' placeholder='069000000' className='text-gray-700 w-full md:w-96' {...field} />
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
                                    <Input type='password' placeholder='Super secret' className='text-gray-700 w-full md:w-96' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='confirmPassword'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-gray-700'>{t('confirmPassword')}</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder='' className='text-gray-700 w-full md:w-96' {...field} />
                                </FormControl>
                                <FormMessage className='text-wrap' />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">{t('submit')}</Button>
                </form>
            </Form>
            <div className='flex gap-2 items-baseline justify-center flex-wrap'>
                <span className='text-gray-500 text-sm md:text-base'>{t('loginLink')}</span><Link href="/login" locale={locale} className='text-gray-500 underline text-sm md:text-base'>{t('login')}</Link>
            </div>
        </div>
    )
}

export default SignUpForm;