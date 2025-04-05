import React from "react";
import Header from "../components/Header/Header";

export default async function Layout(props: { children: React.ReactNode, params: Promise<{ locale: string }> }) {
    const { children, params } = props;
    return (
        <div className='min-h-screen w-full flex flex-col gap-10 justify-between'>
            <div className='flex-1 flex flex-col'>
                <Header params={params} />
                <div className='flex-1 flex flex-col'>{children}</div>
            </div>
        </div>
    )
}