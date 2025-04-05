import { cookies } from 'next/headers';
import { redirect } from '@/i18n/navigation';
import payload from "@/queries";
import { Suspense } from 'react';
import OrderTable from './OrderTable';
import { useTranslations } from 'next-intl';
import { string } from 'zod';

const fetchUser = async (token: string | undefined) => {
    if (!token) return null;
    try {
        const headers = new Headers();
        headers.append('cookie', `payload-token=${token}`);
        const result = await payload.auth({ headers });
        return result.user;
    } catch (error) {
        console.error("Auth error:", error);
        return null;
    }
};

const OrdersPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
    const token = (await cookies()).get('payload-token')?.value;
    const { locale } = await params;

    if (!token) {
        redirect({ href: '/login', locale });
    }

    return (
        <Suspense fallback={<div className="text-center text-gray-500 mt-10">Loading account...</div>}>
            <OrdersContent token={token} locale={locale} />
        </Suspense>
    );

}

const OrdersContent = async ({ token, locale }: { token: string | undefined; locale: string }) => {
    const user = await fetchUser(token);

    if (!user) {
        redirect({ href: '/login', locale });
    }

    if (user && user.id) {
        const data = await payload.find({
            collection: 'orders',
            where: {
                customer: {
                    equals: user.id
                }
            },
        })

        return <OrderInfo data={data} />
    }
};

const OrderInfo = ({ data }: { data: any }) => {
    const t = useTranslations('Order');
    if (data.totalDocs === 0) {
        return (
            <div className='text-gray-700'>
                {t('noOrders')}
            </div>
        )
    }

    return (
        <div className="text-gray-500 py-10 px-5 lg:px-10">
            <OrderTable orders={data.docs} />
        </div>
    );
}



export default OrdersPage;