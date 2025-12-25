import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getSearch } from "../../api/axios";
import Navbar2 from "../../component/Navbar2";
import ProductListView from "../../component/ProductListView";
import Loading from "../../extras/Loading4.webm";
import { ChevronLeft } from "lucide-react";
import Footer from "../../component/Footer";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const query = new URLSearchParams(location.search).get("q");
  const [error, setError] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      setError("");
      try {
        let res = await getSearch(query);
        setData(res.data);
        if (res.data.length === 0) {
          setError("No products found");
        }
      } catch (error) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, [query]);

  return (
   <div>
        <Navbar2/>
      {
        data?.length > 0 ? (
          <div className='max-w-6xl mx-auto mt-10 mb-10 px-4'>
             <button onClick={()=>navigate('/home')} className='bg-gray-800 mb-5 text-white px-3 py-1 rounded-md cursor-pointer flex gap-1 items-center'><ChevronLeft/> Back</button>
             {
              data.map((product, index) =>{
                return <ProductListView key={index} product={product}/>
              })
             }
          </div>
        ):(
          <div className='flex items-center justify-center h-[400px]'>
            No Product Found
          </div>
        )
      }
    </div>
  );
};

export default Search;
