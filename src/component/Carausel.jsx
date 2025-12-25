import React from "react";
import Slider from "react-slick";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';


const Carausel = () => {
  const data = [
    {
      title:"Harsh Khare",
       description:" it is a nice nice",
       image:'https://media.istockphoto.com/id/584574708/photo/soap-bar-and-liquid-shampoo-shower-gel-towels-spa-kit.jpg?s=612x612&w=0&k=20&c=TFeQmTwVUwKY0NDKFFORe3cwDCxRtotFgEujMswn3dc='
    },
      {
      title:"Cosmetics",
       description:" it is a nice nice",
       image:'https://pureoilsindia.b-cdn.net/storage/blog/cc420aca09f6bcdd95c2c470c1c44cc6.jpg'
    },
    {
        title:"Grocerries",
        description:"thank you for choosing us",
        image:'https://cached.imagescaler.hbpl.co.uk/resize/scaleHeight/815/cached.offlinehbpl.hbpl.co.uk/news/OMC/all-products-20170125054108782.gif'
    }
  ]
     const SamplePrevArrow = (props) => {
        const {className, style, onClick} = props;
        return (
            <div onClick={onClick} className={`arrow ${className}`} style={{zIndex:3}}>
                <AiOutlineArrowLeft className='arrows' style={{...style, display: "block", borderRadius:"50px", background:"#f53347" , color:"white" , position:"absolute", padding:"2px", left:"50px"}} />
            </div>
        )
    }
    const SampleNextArrow = (props) => {
        const {className, style, onClick} = props;
        return (
            <div onClick={onClick} className={`arrow ${className}`}>
                <AiOutlineArrowRight className='arrows' style={{...style, display: "block", borderRadius:"50px", background:"#f53347" , color:"white" , position:"absolute", padding:"2px", right:"50px"}} />
            </div>
        )
    }
  let settings = {
        dots: false,
        autoplay: true,
        autoplaySpeed:2000,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover:false,
        nextArrow: <SampleNextArrow to="next" />,
        prevArrow: <SamplePrevArrow to="prev" />,
    };
  return (
 <div>
  <Slider {...settings}>
 {
                    data?.slice(0,7)?.map((item, index) => {
                        return <div key={index} className=' -z-10'>
                            <div className='flex flex-col md:flex-row gap-10 justify-center h-[600px] my-20 md:my-0 items-center px-4'>
                                <div className='md:space-y-6 space-y-3'>
                                    <h3 className='text-black-500 font-semibold font-sans text-sm'>Powering Your World with the Best in Electronics</h3>
                                    <h1 className='md:text-4xl  text-xl font-bold uppercase line-clamp-2 md:line-clamp-3 md:w-[500px] text-green-500'>{item?.title}</h1>
                                    <p className='md:w-[500px] line-clamp-3 text-black-200 pr-7'>{item?.description}</p>
                                    <button className='bg-green-500 text-black px-3 py-2 rounded-md cursor-pointer mt-2'>Shop Now</button>
                                </div>
                                <div>
                                    <img src={item?.image} alt={item?.title} className='rounded-full w-[550px] hover:scale-105 transition-all shadow-2x'/>
                                </div>
                            </div>
                        </div>
                    })
                }           
  </Slider>
 </div>
  );
};

export default Carausel;