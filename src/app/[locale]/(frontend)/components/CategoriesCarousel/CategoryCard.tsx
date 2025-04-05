import CategoryProps from "../../types/CategoryType";
import Link from "next/link";
import Image from "next/image";

const CategoryCard = ({ id, title, img }: CategoryProps) => {
    return (
        <Link href={`/category/${id}`} className="flex flex-col gap-[10px] w-fit group">
            <h4 className="font-semibold text-base md:text-lg lg:text-xl truncate text-gray-500 group-hover:text-gray-700 transition-all duration-500">{title}</h4>
            <div className="rounded-lg overflow-hidden aspect-square w-[130px] h-[130px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px]">
                <Image src={img.src} alt="img" width={img.width} height={img.height} className="w-full h-full object-cover object-center group-hover:scale-110 transition-all" />
            </div>
        </Link>
    )
}

export default CategoryCard;