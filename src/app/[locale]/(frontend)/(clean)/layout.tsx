import React from "react";
import CleanBreadCrumb from "../components/BreadCrumbs/CleanBreadcrumb";
export default async function Layout(props: { children: React.ReactNode, params: Promise<{ locale: string }> }) {
    const { children } = props;
    const { locale } = await props.params
    return (
        <div className='min-h-screen w-full flex flex-col'>
            <div className="container px-10 py-5">
                <CleanBreadCrumb locale={locale} />
            </div>
            <div className='flex-1 flex'>{children}</div>
        </div>
    )
}

