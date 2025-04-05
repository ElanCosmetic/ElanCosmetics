const PageTitle = ({ title }: { title: string }) => {
    return (
        <h1 className="text-gray-700 text-3xl md:text-4xl font-semibold uppercase">{title}</h1>
    )
}

export default PageTitle;