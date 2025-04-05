import { Header } from "@/payload-types";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Collection, Product, TermsPage } from "@/payload-types";
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

interface Props {
    item: MenuItem | SubItem | SubSubItem;
    handleItemClick: (item: MenuItem | SubItem | SubSubItem, previousItem: MenuItem | null) => void;
    locale: string;
    previouseItem: MenuItem | null;
}

const isMenuItem = (item: MenuItem | SubItem | SubSubItem): item is MenuItem => {
    return "subItems" in item;
};

const isSubItem = (item: MenuItem | SubItem | SubSubItem): item is SubItem => {
    return "subSubItems" in item;
};

const isSubSubItem = (item: MenuItem | SubItem | SubSubItem): item is SubSubItem => {
    return !("subItems" in item) && !("subSubItems" in item);
};

const MegaMenuItem = ({ item, handleItemClick, locale, previouseItem }: Props) => {
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

    if (isMenuItem(item)) {
        if (item.subItems && item.subItems.length > 0) {
            return <div
                onClick={() => handleItemClick({
                    id: item.id || undefined,
                    label: item.label,
                    subItems: item.subItems ?? undefined,
                    linkType: item.linkType,
                    internalLink: item.internalLink,
                    externalUrl: item.externalUrl,
                }, previouseItem)}
                className="flex justify-between items-center gap-20 cursor-pointer p-2 border border-gray-100 hover:border-gray-200 rounded-md transition-all duration-200"
            >
                <span>{item.label}</span>
                <ArrowRight width={20} />
            </div>
        } else {
            return <SheetTrigger asChild>
                <Link locale={locale} href={link} className="text-gray-700 p-2 border border-transparent rounded-md group">
                    <span className="group-hover:underline">{item.label}</span>
                </Link>
            </SheetTrigger>
        }
    } else if (isSubItem(item)) {
        if (item.subSubItems && item.subSubItems.length > 0) {
            return <div
                onClick={() => handleItemClick({
                    id: item.id || undefined,
                    label: item.label,
                    subSubItems: item.subSubItems ?? undefined,
                    linkType: item.linkType,
                    internalLink: item.internalLink,
                    externalUrl: item.externalUrl,
                }, previouseItem)}
                className="flex justify-between items-center gap-20 cursor-pointer p-2 border border-gray-100 hover:border-gray-200 rounded-md transition-all duration-200"
            >
                <span>{item.label}</span>
                <ArrowRight width={20} />
            </div>
        } else {
            return <SheetTrigger asChild>
                <Link locale={locale} href={link} className="text-gray-700 p-2 border border-transparent rounded-md group">
                    <span className="group-hover:underline">{item.label}</span>
                </Link>
            </SheetTrigger>
        }
    } else if (isSubSubItem(item)) {
        return <SheetTrigger asChild>
            <Link locale={locale} href={link} className="text-gray-700 p-2 border border-transparent rounded-md group">
                <span className="group-hover:underline">{item.label}</span>
            </Link>
        </SheetTrigger>
    }

    return null;
};

export default MegaMenuItem;
