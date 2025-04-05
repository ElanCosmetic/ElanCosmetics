import GeneralCatItem from "./GeneralCatItem";
import { Homepage } from '@/payload-types';

type CategoriesBlock = Extract<Homepage['Layout'][number], { blockType: 'general-big-categories' }>
type Categories = CategoriesBlock['categories'];

interface Props {
    categories: Categories;
    locale: string
}

const GeneralCategories = ({ categories, locale }: Props) => {
    return (
        <div className="text-gray-700 mx-auto max-w-[1400px] px-5 md:px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10">
                {categories.map((category, index) => (
                    <GeneralCatItem locale={locale} key={index} category={category} />
                ))}
            </div>
        </div>
    )
}
export default GeneralCategories;