import { Controller, UseFormReturn } from 'react-hook-form';
import { FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog } from '@radix-ui/react-dialog';
import SuccessDialog from '../../../components/Dialogs/SuccesDialog';
import FailedDialog from '../../../components/Dialogs/FaildedDialog';
import { CheckoutFormValues } from "../CheckoutSchema";
import { useTranslations } from 'next-intl';

const PaymentForm = ({ form, isLoading, orderStatus }: { form: UseFormReturn<CheckoutFormValues>, isLoading: boolean, orderStatus: 'success' | 'error' | null }) => {
    const t = useTranslations('CheckoutPage');
    return <div className='flex flex-col gap-5'>
        <h2 className="text-gray-700 text-3xl md:text-4xl font-semibold uppercase">{t('payment.title')}</h2>
        <Controller
            name="numerar"
            control={form.control}
            render={({ field }) => (
                <div className="flex items-center space-x-2 border border-gray-300 p-5 rounded-lg">
                    <Checkbox id="numerar" checked={field.value} onCheckedChange={field.onChange} className='rounded-full' />
                    <Label htmlFor="numerar" className='text-gray-500'>{t('payment.cash')}</Label>
                </div>
            )}
        />
        {form.formState.errors.numerar && <FormMessage>{form.formState.errors.numerar.message}</FormMessage>}

        <Button disabled={isLoading} type='submit' className='bg-custompink hover:bg-pink-400 focus:bg-pink-500 py-6'>
            {isLoading ? t('payment.processing') : t('payment.submit')}
        </Button>
        <Dialog open={orderStatus === 'success' || orderStatus === 'error'}>
            {orderStatus === 'success' ?
                <SuccessDialog
                    title={t('dialog.success.title')}
                    description={t('dialog.success.description')}
                /> :
                <FailedDialog
                    title={t('dialog.failed.title')}
                    description={t('dialog.failed.description')}
                />}
        </Dialog>
    </div>
};

export default PaymentForm;
