'use client'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

const Logout = ({ locale }: { locale: string }) => {
    const router = useRouter();
    const t = useTranslations('Account');

    const logoutFunction = async () => {
        try {
            const response = await fetch('/api/users/logout', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': "application/json"
                }
            })

            if (response.ok) {
                router.replace(`/${locale}/login`)
            } else {
                console.error(t('errros.failedLogout'));
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Button onClick={() => logoutFunction()} className='w-full'>
            {t('logout')}
        </Button>
    );
}

export default Logout;