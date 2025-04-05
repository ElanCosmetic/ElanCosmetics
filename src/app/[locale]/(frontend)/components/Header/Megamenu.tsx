'use client'
import { SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Header } from "@/payload-types";
import { Link } from "@/i18n/navigation";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useState } from "react";
import { motion } from "motion/react";
import { UserRound, ArrowLeft, ShoppingBag, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button"
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import MegaMenuItem from "./MegaMenuItem";
import MegaMenuLastItem from "./MegaMenuLastItem";
import { useTranslations } from "next-intl";
import { Collection, Product, TermsPage } from "@/payload-types";
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

const Megamenu = ({ items, locale }: { items: MenuItems, locale: string }) => {
    const [selectedLink, setSelectedLink] = useState<MenuItem | SubItem | SubSubItem | null>(null);
    const [previousItemState, setPreviousItemState] = useState<MenuItem | null>(null);

    const t = useTranslations("Megamenu")

    const handleItemClick = (item: MenuItem | SubItem | SubSubItem, previousItem: MenuItem | null) => {
        if (previousItem) {
            setPreviousItemState(previousItem)
        } else {
            setPreviousItemState(null);
        }
        setSelectedLink(selectedLink?.label === item.label ? null : item);
    };

    const handleGoBack = (previousItem: MenuItem | SubItem | SubSubItem | null) => {
        if (previousItem) {
            setSelectedLink(previousItem);
            setPreviousItemState(null)
        } else {
            setSelectedLink(null);
        }
    };

    if (!items || items.length <= 0) return null;

    return (
        <SheetContent side={'left'} className="p-4 text-gray-700 transition-all duration-200 flex flex-col justify-between">
            <VisuallyHidden>
                <SheetTitle>Megamenu</SheetTitle>
            </VisuallyHidden>
            <div className="flex gap-10 mt-10">
                <motion.div
                    className="flex flex-col gap-2 w-full"
                    initial={{ x: 0, opacity: 1 }}
                    animate={{
                        x: selectedLink ? '-110%' : 0,
                        opacity: selectedLink ? 0 : 1
                    }}
                    transition={{ duration: 0.3 }}
                >
                    {items.map((item, index) => (
                        <MegaMenuItem
                            key={index}
                            item={item}
                            locale={locale}
                            handleItemClick={handleItemClick}
                            previouseItem={null}
                        />
                    ))}
                </motion.div>
                {selectedLink && <GenerateSubWindow previousItemState={previousItemState} locale={locale} handleItemClick={handleItemClick} selectedLink={selectedLink} handleGoBack={handleGoBack} backText={t('back')} />}
            </div>
            <div className="grid grid-cols-2 gap-5 md:hidden">
                <Link href='/cart' locale={locale}>
                    <Button variant="secondary" className="w-full">
                        <ShoppingBag />
                    </Button>
                </Link>
                <Link href='/wishlist' locale={locale}>
                    <Button variant="secondary" className="w-full">
                        <Heart />
                    </Button>
                </Link>
                <Link href='/account' locale={locale} className="col-span-2">
                    <Button variant="secondary" className="w-full">
                        <UserRound />
                    </Button>
                </Link>
                <LanguageSelector className="md:hidden w-full col-span-2" />
            </div>
        </SheetContent>
    );
}


interface GenerateSubWindowProps {
    selectedLink: MenuItem | SubItem | SubSubItem,
    previousItemState: MenuItem | null
    backText: string,
    locale: string
    handleGoBack: (previousItem: MenuItem | SubItem | SubSubItem | null) => void,
    handleItemClick: (item: MenuItem | SubItem | SubSubItem, previousItem: MenuItem | null) => void
}

const GenerateSubWindow = ({ selectedLink, previousItemState, handleGoBack, backText, locale, handleItemClick }: GenerateSubWindowProps) => {
    if (isMenuItem(selectedLink)) {
        if (selectedLink.subItems && selectedLink.subItems.length > 0) {
            return <motion.div
                className="flex flex-col gap-2 w-full absolute top-0 left-0 p-4"
                initial={{
                    x: '100%',
                    opacity: 0
                }}
                animate={{
                    x: selectedLink ? 0 : '100%',
                    opacity: selectedLink ? 100 : 0
                }}
                transition={{ duration: 0.3 }}
            >
                <div onClick={() => handleGoBack(null)} className="text-gray-700 p-2 rounded-md flex justify-center items-center gap-2 cursor-pointer">
                    <ArrowLeft width={20} />
                    <span>{backText}</span>
                </div>
                {selectedLink.subItems.map((element, index) => (
                    element.subSubItems && element.subSubItems.length === 0 ? (
                        <MegaMenuLastItem key={index} item={element} locale={locale} />
                    ) : (
                        <MegaMenuItem previouseItem={selectedLink} handleItemClick={handleItemClick} key={index} item={element} locale={locale} />
                    )
                ))}
            </motion.div>
        }
    } else if (isSubItem(selectedLink)) {
        if (selectedLink.subSubItems && selectedLink.subSubItems.length > 0) {
            return <motion.div
                className="flex flex-col gap-2 w-full absolute top-0 left-0 p-4"
                initial={{
                    x: '100%',
                    opacity: 0
                }}
                animate={{
                    x: selectedLink ? 0 : '100%',
                    opacity: selectedLink ? 100 : 0
                }}
                transition={{ duration: 0.3 }}
            >
                <div onClick={() => handleGoBack(previousItemState)} className="text-gray-700 p-2 rounded-md flex justify-center items-center gap-2 cursor-pointer">
                    <ArrowLeft width={20} />
                    <span>{backText}</span>
                </div>
                {selectedLink.subSubItems.map((element, index) => (
                    <MegaMenuLastItem key={index} item={element} locale={locale} />
                ))}
            </motion.div>
        }
    }
    return null;
}

const isMenuItem = (item: MenuItem | SubItem | SubSubItem): item is MenuItem => {
    return "subItems" in item;
};

const isSubItem = (item: MenuItem | SubItem | SubSubItem): item is SubItem => {
    return "subSubItems" in item;
};

export default Megamenu;