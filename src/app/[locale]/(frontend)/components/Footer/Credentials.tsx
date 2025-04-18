import { getTranslations } from "next-intl/server"

const Credentials = async () => {
    const t = await getTranslations('Credentials');
    const year = new Date().getFullYear();
    return (
        <p className="text-xs md:text-sm font-normal text-center">
            {year} - {t('title')}
        </p>
    )
}

export default Credentials