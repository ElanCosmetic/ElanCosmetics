import { Link } from "@/i18n/navigation"
import { MoveLeft } from "lucide-react"
import { useTranslations } from "next-intl"
const CleanBreadCrumb = ({ locale }: { locale: string }) => {
    const t = useTranslations('GeneralBreadcrumbs');
    return (
        <Link href='/' locale={locale} className="text-gray-500 flex gap-2 items-center justify-center md:justify-start">
            <MoveLeft />
            <span>{t('Gohome')}</span>
        </Link>
    )
}

export default CleanBreadCrumb