import { getTranslations } from "next-intl/server"

const Credentials = async () => {
    const t = await getTranslations('Credentials');
    return (
        <p className="text-xs md:text-sm font-normal text-center">
            {t('title')}
        </p>
    )
}

export default Credentials