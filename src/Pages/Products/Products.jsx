import  { useEffect, useState, useMemo } from "react";
import MobileFilter from "../../component/MobileFilter";
import FilterSection from "../../component/FilterSection";
import ProductCard from "../../component/ProductCard";
import Pagination from "../../component/Pagination";
import Lottie from "lottie-react";
import notFound from "../../extras/notFound.json";
import { fetchAllProducts } from "../../api/axios";
import Footer from "../../component/Footer";
import Navbar2 from "../..//component/Navbar2";
import { useDebounce } from "../../hooks/useDebounce";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
   const [search, setSearch] = useState("");
const debouncedSearch = useDebounce(search);

 
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const [page, setPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
       setLoading(true);   
      try {
        
        const res = await fetchAllProducts();

        setData(res);
      } catch (e) {
        console.log("Error fetching products:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
    setOpenFilter(false);
  };
  const handleBrandChange = (e) => {
    setBrand(e.target.value);
    setPage(1);
    setOpenFilter(false);
  };

  const pageHandler = (selectedPage) => {
    setPage(selectedPage);
    window.scrollTo(0, 0);
  };
  const categoryOnlyData = [
    "All",
    ...new Set(data.map((item) => item.category)),
  ];

  const filteredData = useMemo(() => {
    return data.filter(
      (item) =>
        item.product_name.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
        (category === "All" || item.category === category) &&
        item.product_price >= priceRange[0] &&
        item.product_price <= priceRange[1]
    );
  }, [data,debouncedSearch, category, priceRange]);

  const ITEMS_PER_PAGE = 12;

  const paginatedData = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, page]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  return (
    <>
      <Navbar2 />
      <div>
        <div className="max-w-6xl mx-auto px-4 mb-10">
          <MobileFilter
            openFilter={openFilter}
            setOpenFilter={setOpenFilter}
            search={search}
            setSearch={setSearch}
            brand={brand}
            setBrand={setBrand}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            category={category}
            setCategory={setCategory}
            handleCategoryChange={handleCategoryChange}
            categoryOnlyData={categoryOnlyData}
            handleBrandChange={handleBrandChange}
          />

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-gray-200 animate-pulse rounded-xl"
                />
              ))}
            </div>
          ) : data?.length > 0 ? (
            <>
              <div className="flex gap-8">
                <FilterSection
                  search={search}
                  setSearch={setSearch}
                  brand={brand}
                  setBrand={setBrand}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  category={category}
                  setCategory={setCategory}
                  handleCategoryChange={handleCategoryChange}
                  categoryOnlyData={categoryOnlyData}
                  handleBrandChange={handleBrandChange}
                />
                {filteredData?.length > 0 ? (
                  <div className="flex flex-col justify-center items-center">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-7 mt-10">
                      {paginatedData.map((product) => (
                        <ProductCard
                          key={product.productId}
                          product={product}
                        />
                      ))}
                    </div>
                    <Pagination
                      pageHandler={pageHandler}
                      page={page}
                      dynamicPage={totalPages}
                    />
                  </div>
                ) : (
                  <div className="flex justify-center items-center md:h-[600px] md:w-[900px] mt-10">
                    <Lottie animationData={notFound} classID="w-[500px]" />
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-[400px]">
              <p>No products found</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;
