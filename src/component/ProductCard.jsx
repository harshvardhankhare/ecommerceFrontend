import React from 'react'
import { IoCartOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../api/axios';
import { toast } from 'react-toastify';

const ProductCard = ({product}) => {
    const navigate = useNavigate()
   const handleAddToCart = async()=>{
           let res = await addToCart({
            "productId":product.productId,
            "quantity":1
           })
                console.log(res)
           toast.success("Added to Cart")
   }
    
  return (
    <div className='border relative border-gray-100 rounded-2xl cursor-pointer hover:scale-105 hover:shadow-2xl transition-all p-2 h-max'>
      <img src={product.imgLink} alt="" className='bg-gray-100 aspect-square' onClick={()=>navigate(`/product/${product.productId}`)}/>
      <h1 className='line-clamp-2 p-1 font-semibold'>{product.product_name}</h1>
      <p className='my-1 text-lg text-gray-800 font-bold'>${product.product_price}</p>
      <button onClick={handleAddToCart} className='bg-red-500 px-3 py-2 text-lg rounded-md text-white w-full cursor-pointer flex gap-2 items-center justify-center font-semibold'><IoCartOutline className='w-6 h-6' /> Add to Cart</button>
    </div>
  )
}

export default ProductCard