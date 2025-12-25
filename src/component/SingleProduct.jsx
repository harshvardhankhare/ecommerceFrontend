import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addToCart, getOrderById } from "../api/axios";
import Navbar2 from "./Navbar2";
import Breadcrums from "./Breadcrums";
import { IoCartOutline } from 'react-icons/io5';
import { toast } from "react-toastify";



const SingleProduct = () => {
  const {productId} = useParams();
   const [product, setProduct] = useState(null);
   const[loading,setLoading] = useState(true);
   const[quantity,setQuantity]= useState(1)

    const handleAddToCart = async()=>{
              let res = await addToCart({
               "productId":product.productId,
               "quantity":quantity
              })
                   
              toast.success("Added to Cart")
      }
      
  const fethProduct = async () => {
    try {
        setLoading(true)
    const res = await getOrderById(productId);
      console.log(res.data)
      setProduct(res.data)
    } catch (error) {
      console.error(error);
    }finally{
        setLoading(false);
    }
  };

  useEffect(() => {
    fethProduct();
  }, [productId]);

   if (loading) {
    return (
      <div className="single-product-container">
        <div className="skeleton-image shimmer"></div>
        <div className="skeleton-details">
          <div className="skeleton-line shimmer" style={{ width: "60%" }}></div>
          <div className="skeleton-line shimmer" style={{ width: "90%" }}></div>
          <div className="skeleton-line shimmer" style={{ width: "80%" }}></div>
          <div className="skeleton-btn shimmer"></div>
        </div>
      </div>
    );
  }

 return (
        <>
        <Navbar2/>
            {
                product ? <div className='px-4 pb-4 md:px-0'>
                     <Breadcrums title={product.product_name}/>
                     <div className='max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10'>
                        {/* product image */}
                        <div className='w-full'>
                            <img src={product.imgLink} 
                            alt={product.product_name} 
                            className='rounded-2xl w-full object-cover'/>
                        </div>
                        {/* product details */}
                        <div className='flex flex-col gap-6'>
                            <h1 className='md:text-3xl text-xl font-bold text-gray-800'>{product.product_name}</h1>
                            <div className='text-gray-700'>Demo Brand /{product.category?.toUpperCase()} /{product.model}</div>
                            <p className='text-xl text-red-500 font-bold'>${Math.round( product?.product_price * (1 - product?.discount / 100)) } <span className='line-through text-gray-700'>${product.product_price}</span> <span className='bg-red-500 text-white px-4 py-2 rounded-full'>{product.discount}% discount</span></p>
                            <p className='text-green-600'>{product?.product_desc}</p>

                            {/* qunatity selector */}
                            <div className='flex items-center gap-4'>
                                <label htmlFor="" className='text-sm font-medium text-gray-700'>Quantity:</label>
                                <input onChange={(e) => setQuantity(Number(e.target.value))}type="number" min={1} value={quantity} className='w-20 border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 foucs:ring-red-500'/>
                            </div>

                            <div className='flex gap-4 mt-4'>
                                <button onClick={handleAddToCart} className='px-6 flex gap-2 py-2 text-lg bg-red-500 text-white rounded-md'><IoCartOutline className='w-6 h-6'/> Add to Cart</button>
                            </div>
                        </div>
                     </div>
                </div> :
                    <div className='flex items-center justify-center h-screen'>
                        <video muted autoPlay loop>
                            <source src={loading} type='video/webm' />
                        </video>
                    </div>
            }
        </>
    )
  }

export default SingleProduct;
