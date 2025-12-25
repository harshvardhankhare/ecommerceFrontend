import React from 'react'

const getPages = (current, total) =>{
    const pages = [];
    if(total <= 5){
        for (let i =1; i <= total; i++){
            pages.push(i)
        }
    }else {
        if(current <= 3) {
            pages.push(1,2,3,'...', total)
        } else if (current >= total-2){
            pages.push(1,'...', total-2, total-1, total)
        } else {
            pages.push(1, '...', current-1, current, current+1, '...', total)
        }
    }
    return pages;
}

const Pagination = ({page, pageHandler, dynamicPage}) => {
  return (
    <div className='mt-10 space-x-4'>
        <button 
        disabled={page===1} 
        className={`${page === 1 ? "bg-primary text-black":"bg-primary text-black "} px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-800  hover:text-white`}
        onClick={()=>pageHandler(page - 1)}
        >Prev</button>
        {
            getPages(page, dynamicPage)?.map((item, index) =>{
                return (
                    <span key={index} 
                    onClick={()=> typeof item === "number" && pageHandler(item)}
                    className={`cursor-pointer px-4 py-2 rounded-lg ${item === page ? "font-bold bg-gray-800 text-white": "border border-gray-300 hover:bg-gray-50"}`}
                    >
                        {item}
                    </span>
                )
            })
        }
        <button 
        disabled={page===dynamicPage} 
        className={`${page === dynamicPage ? "bg-white":"bg-white"} px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-800 hover:text-white`}
        onClick={()=>pageHandler(page + 1)}
        >Next</button>
    </div>
  )
}

export default Pagination