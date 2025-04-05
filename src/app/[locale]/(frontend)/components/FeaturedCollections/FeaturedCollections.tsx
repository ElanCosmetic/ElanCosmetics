import FeaturedCategoryProps from "../../types/FeaturedCollectionType"
import FeaturedCollection from "./FeaturedCollection"
interface FeaturedCategoriesProps {
    data: FeaturedCategoryProps[]
}

const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({ data }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 lg:gap-14">
            {data.map((collection) => (
                <FeaturedCollection
                    key={collection.id}
                    id={collection.id}
                    url={collection.url}
                    img={collection.img}
                />
            ))}
        </div>
    )
}

export default FeaturedCategories;