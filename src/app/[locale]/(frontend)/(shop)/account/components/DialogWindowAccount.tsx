'use client'
import { Button } from "@/components/ui/button";
import { Box } from 'lucide-react'
import Logout from "../logout";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const DialogWindowAccount = ({ locale, id }: { locale: string, id: string | undefined }) => {
    const t = useTranslations("Account");
    const router = useRouter();

    const handleClick = () => {
        router.push(`/${locale}/account/orders/${id}`)
    }

    return (
        <div className="space-y-2 w-full">
            <Button onClick={() => handleClick()} variant="outline" className="w-full">
                <Box />
                <span className="text-sm">{t('orders.title')}</span>
            </Button>
            <Logout locale={locale} />
        </div>
    )
}

export default DialogWindowAccount;