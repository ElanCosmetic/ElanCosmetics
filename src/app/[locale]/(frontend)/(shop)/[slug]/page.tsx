import PageTitle from "../../components/PageTitle";
import payload from "@/queries";
import { TermsPage } from "@/payload-types";
import RichText from "@/blocks/richtext/Server";

const GeneralPage = async ({
    params,
}: {
    params: Promise<{ slug: string, locale: string }>
}) => {
    const { slug, locale } = await params;

    if (!slug) {
        return null;
    }

    const data = await payload.find({
        'collection': "termsPage",
        where: {
            urlTitle: {
                equals: slug
            }
        },
        locale: locale as 'ro' | 'ru' || 'all'
    })

    if (!data.docs[0]) {
        return <div>missing data</div>
    }
    const title = data.docs[0].title

    return (
        <div className="container mx-auto text-gray-700 px-5 md:px-10 py-5 flex flex-col gap-5">
            <PageTitle title={title} />
            <div>
                {data.docs.map((item: TermsPage, index) => {
                    if (item.description) {
                        return <RichText key={index} data={item.description} className="text-sm md:text-base" />
                    } else {
                        return <div key={index}>Content not found</div>
                    }
                })}
            </div>
        </div>
    )
}

export default GeneralPage