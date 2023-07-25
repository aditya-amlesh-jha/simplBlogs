import { useEffect,useState } from "react";

const Pagination = ({totalPages,blogsPerPage,setCurrentPage}) => {

    const pages = [];

    for(let i=1;i<=Math.ceil(totalPages/blogsPerPage);i++){
        pages.push(i);
    }

    return ( 
        <>
            <div className="text-center">
                {console.log(pages)}
                {pages && pages.map((page,index) => (
                    <button className="btn btn-outline-light m-2" key={index} onClick={() => setCurrentPage(page)}>{page}</button>
                ))}
            </div>
        </>
     );
}
 
export default Pagination;