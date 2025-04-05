import { cookies } from 'next/headers';
import { redirect } from '@/i18n/navigation';

import payload from "@/queries";
import AccountCard from './accountCard';
import { Suspense } from 'react';

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

const AccountPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
    const token = (await cookies()).get('payload-token')?.value;
    const { locale } = await params;

    if (!token) {
        redirect({ href: '/login', locale });
    }

    return (
        <Suspense fallback={<div className="text-center text-gray-500 mt-10">Loading account...</div>}>
            <AccountContent token={token} locale={locale} />
        </Suspense>
    );
};

const AccountContent = async ({ token, locale }: { token: string | undefined; locale: string }) => {
    const user = await fetchUser(token);

    if (!user) {
        redirect({ href: '/login', locale });
    }

    if (user)
        return (
            <div className="text-gray-500 flex flex-1 items-center justify-center py-10 px-5">
                <AccountCard
                    id={user.id}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    email={user.email}
                    phoneNumber={user.phone}
                    locale={locale}
                />
            </div>
        );
};

export default AccountPage;
