import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Media, Collection, Product } from "@/payload-types";

interface ImgSlideProps {
    img: string | Media;
    linkType: "none" | "internal" | "external";
    internalLink?:
    | { relationTo: "collection"; value: string | Collection }
    | { relationTo: "products"; value: string | Product }
    | null;
    externalUrl?: string | null;
    locale: string;
}

const ImgSlide = ({ img, linkType, internalLink, externalUrl, locale }: ImgSlideProps) => {
    if (!img || typeof img === 'string') return null;

    let link = "";

    if (linkType === "internal" && internalLink) {
        if (internalLink.relationTo === "collection") {
            link = typeof internalLink.value === "string"
                ? `/collection/${internalLink.value}`
                : `/collection/${internalLink.value.id}`;
        } else if (internalLink.relationTo === "products") {
            link = typeof internalLink.value === "string"
                ? `/product/${internalLink.value}`
                : `/product/${internalLink.value.id}`;
        }
    } else if (linkType === "external" && externalUrl) {
        link = externalUrl;
    }

    const imageComponent = (
        <Image
            src={img.url || ""}
            alt={img.alt || "Slide image"}
            width={1920} // Optimized for performance
            height={1080}
            sizes="100vw"
            className="w-full h-auto"
        />
    );

    return link ? (
        linkType === "external" ? (
            <a href={link} target="_blank" rel="noopener noreferrer" className="w-full h-full overflow-hidden relative">
                {imageComponent}
            </a>
        ) : (
            <Link href={link} locale={locale} className="w-full h-full overflow-hidden relative">
                {imageComponent}
            </Link>
        )
    ) : (
        <div className="w-full h-full overflow-hidden relative">
            {imageComponent}
        </div>
    );
};

export default ImgSlide;
