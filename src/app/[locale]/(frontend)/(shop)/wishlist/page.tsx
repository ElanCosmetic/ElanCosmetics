'use client'
import { useState, useEffect } from "react"
import { User } from "@/payload-types"
import WishlistContainer from "./wishlistContainer"
import { useTranslations } from "next-intl"
import PageTitle from "../../components/PageTitle"
const Wishlist = () => {
    const [user, setUser] = useState<User | null>(null)
    const t = useTranslations("Wishlist")
    useEffect(() => {
        const CheckUser = async () => {
            const response = await fetch("/api/users/me", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                if (data.user) {
                    setUser(data.user);
                }
            }
        };

        CheckUser();
    }, [])

    return (
        <div className="flex flex-col gap-12 lg:gap-20 container px-5 lg:px-10 py-6 mx-auto w-full text-gray-700">
            <PageTitle title={t('title')} />
            {user ?
                <div><WishlistContainer user={user} locale="ro" /></div>
                : <div>{t('noUser')}</div>}
        </div>
    )
}

export default Wishlist