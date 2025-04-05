type Params = Promise<{ id: string[] }>

const CategoryPage = async ({params} : {params: Params} ) => {
    const {id} = await params;
    return (
        <div>
            Category page {id}
        </div>
    )
}

export default CategoryPage