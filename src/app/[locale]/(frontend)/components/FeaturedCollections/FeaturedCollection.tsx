import FeaturedCategoryProps from "../../types/FeaturedCollectionType";
import Link from "next/link";
import Image from "next/image";

const FeaturedCollection = ({ img, url }: FeaturedCategoryProps) => {
    return (
        <Link href={url} className="rounded-md overflow-hidden group">
            <Image
                src={img.src}
                width={img.width}
                height={img.height}
                alt="featured collection"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500" />
        </Link>
    )
}

export default FeaturedCollection;