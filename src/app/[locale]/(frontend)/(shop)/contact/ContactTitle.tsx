import { useTranslations } from "next-intl";
import PageTitle from "../../components/PageTitle";
const ContactTitle = () => {
    const t = useTranslations('ContactPage');
    return (
        <PageTitle title={t('title')} />
    )
}

export default ContactTitle;