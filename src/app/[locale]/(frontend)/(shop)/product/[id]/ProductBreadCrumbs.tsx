
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";

const ProductBreadCrumbs = ({ locale, title }: { locale: string, title: string }) => {
    const t = useTranslations('GeneralBreadcrumbs');
    return (
        <div className="flex items-center gap-0 text-sm md:text-base text-gray-400">
            <Link href='/' locale={locale} className="hover:underline">{t('Gohome')}</Link>
            <ChevronRight className="h-4" />
            <span className="text-gray-600 uppercase truncate">{title}</span>
        </div>
    )
}

export default ProductBreadCrumbs;