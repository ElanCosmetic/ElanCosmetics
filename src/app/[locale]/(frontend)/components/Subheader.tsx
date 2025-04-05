const Subheader = ({ children }: { children: string }) => {
    return (
        <div className="bg-gray-700 p-2 px-4 text-center overflow-x-auto">
            <span className="text-xs md:text-sm text-white font-normal text-nowrap">{children}</span>
        </div>
    )
}

export default Subheader;