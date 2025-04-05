import { Header } from "@/payload-types";
import { Link } from "@/i18n/navigation";
import { Product, Collection, TermsPage } from "@/payload-types";
import { SheetTrigger } from "@/components/ui/sheet";
type MenuItems = Header['menuItems'];
type MenuItem = MenuItems[0];
type SubItem = {
    label: string;
    linkType: "internal" | "external";
    internalLink?: ({
        relationTo: "collection";
        value: string | Collection;
    } | null) | ({
        relationTo: "products";
        value: string | Product;
    } | null) | ({
        relationTo: "termsPage";
        value: string | TermsPage;
    } | null);
    externalUrl?: string | null;
    subSubItems?: {
        label: string;
        linkType: "internal" | "external";
        internalLink?: ({
            relationTo: "collection";
            value: string | Collection;
        } | null) | ({
            relationTo: "products";
            value: string | Product;
        } | null) | ({
            relationTo: "termsPage";
            value: string | TermsPage;
        } | null);
        externalUrl?: string | null;
        id?: string | null;
    }[] | null;
    id?: string | null;
}
type SubSubItem = {
    label: string;
    linkType: "internal" | "external";
    internalLink?: ({
        relationTo: "collection";
        value: string | Collection;
    } | null) | ({
        relationTo: "products";
        value: string | Product;
    } | null) | ({
        relationTo: "termsPage";
        value: string | TermsPage;
    } | null);
    externalUrl?: string | null;
    id?: string | null;
}


const MegaMenuLastItem = ({ item, locale }: { item: MenuItem | SubItem | SubSubItem, locale: string }) => {
    let link = '';
    if (item.linkType === 'internal' && item.internalLink) {
        if (typeof item.internalLink === 'object' && 'relationTo' in item.internalLink) {
            switch (item.internalLink.relationTo) {
                case 'collection':
                    if (typeof item.internalLink.value === 'string') {
                        link = `/collection/${item.internalLink.value}`;
                    } else {
                        link = `/collection/${item.internalLink.value.id}`;
                    }
                    break;
                case 'products':
                    if (typeof item.internalLink.value === 'string') {
                        link = `/product/${item.internalLink.value}`;
                    } else {
                        link = `/product/${item.internalLink.value.id}`;
                    }
                    break;
                case 'termsPage':
                    if (typeof item.internalLink.value === 'string') {
                        link = `/termsPage/${item.internalLink.value}`;
                    } else {
                        link = `/termsPage/${item.internalLink.value.urlTitle}`;
                    }
                    break;
                default:
                    link = '/';
            }
        }
    } else if (item.linkType === 'external' && item.externalUrl) {
        link = typeof item.externalUrl === 'string' ? item.externalUrl : '';
    }
    return (
        <SheetTrigger asChild>
            <Link locale={locale} href={link} className="text-gray-500 group">
                <span className="group-hover:underline">{item.label}</span>
            </Link>
        </SheetTrigger>
    )
}

export default MegaMenuLastItem;