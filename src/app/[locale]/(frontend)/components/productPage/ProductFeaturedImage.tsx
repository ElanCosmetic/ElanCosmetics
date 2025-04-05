import Image from "next/image"

const ProductFeaturedImage = ({ url }: { url: string }) => {
    return (
        <div className="w-full h-auto max-h-[300px] md:max-h-[400px] lg:max-h-[500px] 2xl:max-h-[600px] bg-white aspect-square rounded-md overflow-hidden py-4">
            <div className="w-full h-full relative">
                {url.length > 0 ?
                    <Image src={url} alt='' width={200} height={200} className="w-full h-full object-contain object-center" />
                    : <span>missing</span>}
            </div>
        </div>
    )
}

export default ProductFeaturedImage