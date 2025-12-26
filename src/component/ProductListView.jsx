import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ProductListView = ({product}) => {
  const navigate = useNavigate()
  const {addToCart} = []
     const handleAddToCart = async()=>{
                let res = await addToCart({
                 "productId":product.productId,
                 "quantity":1
                })
                     
                toast.success("Added to Cart")
        }

  return (
    <div className='space-y-4 mt-2 rounded-md'>
      <div className='bg-gray-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center p-2 rounded-md'>
        <img src={product.imgLink} alt={product.product_name} className='md:h-60 md:w-60 h-24 w-24 flex-shrink-0 rounded-md cursor-pointer' onClick={()=>navigate(`/product/${product.productId}`)}/>
        <div className='space-y-2'>
          <h1 className='font-bold md:text-xl text-lg line-clamp-3 hover:text-red-400 max-w-full break-words'>{product.product_name}</h1>
          <p className='font-semibold flex items-center md:text-lg text-sm'>$<span className='md:text-4xl text-3xl'>{product.product_price}</span> ({product.discount}% off)</p>
          <p className='text-sm'>FREE delivery <span className='font-semibold'>Fri, 18 Apr</span> <br />
          Or fastest delivery <span className='font-semibold'>Tomorrow, 17 Apr</span></p>
          <button onClick={handleAddToCart} className='bg-red-500 text-white px-3 py-1 rounded-md'>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default ProductListView