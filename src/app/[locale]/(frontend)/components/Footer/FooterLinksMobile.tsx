import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import InstagramIcon from "../Icons/InstagramIcon";
import FacebookIcon from "../Icons/FacebookIcon";
import TiktokIcon from "../Icons/TiktokIcon";
import RichText from "@/blocks/richtext/Server";

import { Footer } from "@/payload-types";
import { Link } from "@/i18n/navigation";

const FooterLinksMobile = ({ footer, locale }: { footer: Footer, locale: string }) => {
    return (
        <div className="md:hidden flex flex-col gap-5 w-full">
            <Accordion type="multiple" className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="font-semibold uppercase">Adresa noastră</AccordionTrigger>
                    <AccordionContent>
                        {footer.our_adress ? (
                            <div className="text-slate-100">
                                <RichText data={footer.our_adress} />
                            </div>
                        ) : null}
                    </AccordionContent>
                </AccordionItem>
                {footer.special_links && footer.special_links.length > 0 ? (
                    footer.special_links.map((specialLink, index) => (
                        <AccordionItem value={`item-${index + 2}`} key={index}>
                            <AccordionTrigger className="font-semibold uppercase">{specialLink.title}</AccordionTrigger>
                            {specialLink.link && specialLink.link.length > 0 ? (
                                <AccordionContent className="flex flex-col gap-2">
                                    {specialLink.link.map((linkItem) => {
                                        if (linkItem && linkItem.linkType) {
                                            let link = '';
                                            switch (linkItem.linkType) {
                                                case 'internal':
                                                    if (linkItem.internalLink?.relationTo === 'collection') {
                                                        link = typeof linkItem.internalLink.value === 'string'
                                                            ? `/collection/${linkItem.internalLink.value}`
                                                            : `/collection/${linkItem.internalLink.value.id}`;
                                                    } else if (linkItem.internalLink?.relationTo === 'products') {
                                                        link = typeof linkItem.internalLink.value === 'string'
                                                            ? `/product/${linkItem.internalLink.value}`
                                                            : `/product/${linkItem.internalLink.value.id}`;
                                                    } else {
                                                        link = linkItem.internalLink
                                                            ? typeof linkItem.internalLink.value === 'string'
                                                                ? `/${linkItem.internalLink.value}`
                                                                : `/${linkItem.internalLink.value.urlTitle}`
                                                            : '';
                                                    }
                                                    break;
                                                case 'external':
                                                    link = linkItem.externalUrl ? linkItem.externalUrl : '';
                                                    break;
                                                default:
                                                    break;
                                            }
                                            return (
                                                <Link
                                                    key={linkItem.title}
                                                    href={link}
                                                    locale={locale}
                                                    className="text-sm hover:underline"
                                                >
                                                    {linkItem.title}
                                                </Link>
                                            );
                                        }
                                        return null;
                                    })}
                                </AccordionContent>
                            ) : null}
                        </AccordionItem>
                    ))
                ) : null}
            </Accordion>
            {footer.social_links && footer.social_links.length > 0 ? (
                <div className="flex gap-5 items-center justify-center">
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
                            <Link href={link.social_link} target="_blank" className="w-6 h-6" key={link.id}>
                                {socialIcon}
                            </Link>
                        );
                    })}
                </div>
            ) : null}
        </div>
    )
}

export default FooterLinksMobile;