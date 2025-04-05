import { Controller, UseFormReturn } from 'react-hook-form';
import { FormMessage } from "@/components/ui/form";
import InputField from "../components/InputField";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CheckoutFormValues } from "../CheckoutSchema";
import { useTranslations } from 'next-intl';

const formFields = [
    { name: 'name', type: 'text' },
    { name: 'phone', type: 'tel' },
    { name: 'email', type: 'email' },
    { name: 'address', type: 'text' },
    { name: 'city', type: 'text' },
];

const DeliveryForm = ({ form }: { form: UseFormReturn<CheckoutFormValues> }) => {
    const t = useTranslations("CheckoutPage");
    return <div className='flex flex-col gap-5'>
        <h2 className="text-gray-700 text-3xl md:text-4xl font-semibold uppercase">{t('delivery.title')}</h2>
        <div className='space-y-4 flex flex-col items-start'>
            {formFields.map((field, index) => (
                <InputField
                    key={index}
                    form={form}
                    name={field.name}
                    type={field.type}
                    label={t(`delivery.${field.name}`)}
                />
            ))}
        </div>
        <Controller
            name="terms"
            control={form.control}
            render={({ field }) => (
                <div className="flex items-center space-x-2">
                    <Checkbox id="terms" checked={field.value} onCheckedChange={field.onChange} />
                    <Label htmlFor="terms" className='text-xs md:text-sm'>{t('delivery.terms')}</Label>
                </div>
            )}
        />
        {form.formState.errors.terms && <FormMessage>{form.formState.errors.terms.message}</FormMessage>}
    </div>
};

export default DeliveryForm;
