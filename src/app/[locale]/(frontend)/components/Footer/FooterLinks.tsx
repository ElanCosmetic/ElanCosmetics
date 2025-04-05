import InstagramIcon from "../Icons/InstagramIcon";
import FacebookIcon from "../Icons/FacebookIcon";
import TiktokIcon from "../Icons/TiktokIcon";
import RichText from "@/blocks/richtext/Server";

import { Link } from "@/i18n/navigation";
import { Footer } from "@/payload-types";
import { useTranslations } from "next-intl";

const FooterLinks = ({ footer, locale }: { footer: Footer, locale: string }) => {
    const t = useTranslations("Footer");
    return (
        <div className="hidden md:grid grid-cols-3 gap-[90px]">
            {/* Adresa Noastră */}
            <div className="flex flex-col gap-2">
                <h5 className="text-lg font-semibold uppercase">{t('ourAddress')}</h5>
                {footer.our_adress ? (
                    <div className="text-slate-100">
                        <RichText data={footer.our_adress} />
                    </div>
                ) : null}
                {footer.social_links && footer.social_links.length > 0 ? (
                    <div className="flex gap-2 items-center">
                        {footer.social_links.map((link) => {
                            let socialIcon;
                            const color = "#fff";
                            switch (link.social_icon) {
                                case "facebook":
                                    socialIcon = <FacebookIcon color={color} />;
                                    break;
                                case "instagram":
                                    socialIcon = <InstagramIcon color={color} />;
                                    break;
                                case "tiktok":
                                    socialIcon = <TiktokIcon color={color} />;
                                    break;
                                default:
                                    socialIcon = <div key={link.id}>nothing</div>;
                            }
                            return (
                                <Link href={link.social_link} target="_blank" className="w-5 h-5" key={link.id}>
                                    {socialIcon}
                                </Link>
                            );
                        })}
                    </div>
                ) : null}
            </div>

            {footer.special_links && footer.special_links.length > 0 ? (
                footer.special_links.map((specialLink, index) => (
                    <div className="flex flex-col gap-3" key={index}>
                        <h5 className="text-lg font-semibold uppercase">{specialLink.title}</h5>
                        {specialLink.link && specialLink.link.length > 0 ? (
                            <div className="flex flex-col gap-2">
                                {specialLink.link.map((linkItem) => {
                                    if (linkItem && linkItem.linkType) {
                                        let link = '';
                                        switch (linkItem.linkType) {
                                            case 'internal':
                                                if (linkItem.internalLink?.relationTo === 'collection') {
                                                    link = typeof linkItem.internalLink.value === 'string' ? `/collection/${linkItem.internalLink.value}` : `/collection/${linkItem.internalLink.value.id}`
                                                } else if (linkItem.internalLink?.relationTo === 'products') {
                                                    link = typeof linkItem.internalLink.value === 'string' ? `/product/${linkItem.internalLink.value}` : `/product/${linkItem.internalLink.value.id}`;
                                                } else {
                                                    link = linkItem.internalLink ? typeof linkItem?.internalLink.value === 'string' ? `/${linkItem.internalLink?.value}` : `/${linkItem.internalLink?.value.urlTitle}` : '';
                                                }
                                                break;
                                            case 'external':
                                                link = linkItem.externalUrl ? linkItem.externalUrl : ''
                                                break;
                                            default:
                                                break;
                                        }
                                        return (
                                            <Link
                                                key={linkItem.title}
                                                locale={locale}
                                                href={link}
                                                className="text-sm hover:underline"
                                            >
                                                {linkItem.title}
                                            </Link>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        ) : null}
                    </div>
                ))
            ) : null}
        </div>
    )
}

export default FooterLinks;