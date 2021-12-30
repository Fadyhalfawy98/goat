let FilterProducts = (allProducts, selectedGenre, searchQuery) => {
    let products;

    const selectedGenreCondition = selectedGenre && selectedGenre._id;


    const filter = allProducts.filter(m => m.genre._id === selectedGenre._id);

    products =  selectedGenreCondition ? filter : allProducts;

    if (searchQuery) products = allProducts.filter(m => m.name.toLowerCase().startsWith(searchQuery.toLowerCase()));

    return products;
};

export default FilterProducts;