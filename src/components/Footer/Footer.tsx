import React from 'react';
import card from "../../assets/card.png";
import book from "../../assets/book.png";
import star from "../../assets/star.png";
import home from "../../assets/home.png";
import storage from "../../assets/storage-box.png";
      
const Footer: React.FC = () => {
    return (
      <div className='absolute bottom-0 m-0 w-[390px] h-[86px] bg-[#CACACA] flex justify-center items-center'>
        <div className='flex justify-center items-center gap-10'>
          <img src={card} className='w-[29px] h-[29px] object-contain cursor-pointer'/>
          <img src={book} className='w-[29px] h-[29px] object-contain cursor-pointer'/>
          <img src={home} className='w-[29px] h-[29px] object-contain cursor-pointer'/>
          <img src={storage} className='w-[29px] h-[29px] object-contain cursor-pointer'/>
          <img src={star} className='w-[30px] h-[30px] object-contain cursor-pointer'/>
        </div>
      </div>
  );
};
 export default Footer;