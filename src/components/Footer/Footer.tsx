import React from 'react';
import fad from "../../assets/fad.png";
import card from "../../assets/card.png";
import star from "../../assets/star.png";
import home from "../../assets/home.png";
import storage from "../../assets/storage.png";
      
const Footer: React.FC = () => {
    return (
      <div className='absolute bottom-0 m-0 w-[390px] h-[86px] bg-[#FFF7F3] flex justify-center items-center'>
        <div className='flex justify-center items-center gap-10'>
          <div>
          <img src={fad} className='w-[29px] h-[29px] object-contain cursor-pointer'/>
          <div className='mt-[2px] text-[8px] font-semibold text-[#826F5F]'>Q&A</div>
          </div>
          <div>
          <img src={card} className='w-[29px] h-[29px] object-contain cursor-pointer'/>
          <div className='mt-[2px] text-[8px] font-semibold text-[#826F5F]'>카드질문</div>
          </div>
          <div>
          <img src={home} className='w-[29px] h-[29px] object-contain cursor-pointer'/>
          <div className='mt-[2px] text-[8px] font-semibold text-[#826F5F]'>홈</div>
          </div>
          <div>
          <img src={storage} className='w-[29px] h-[29px] object-contain cursor-pointer'/>
          <div className='mt-[2px] text-[8px] font-semibold text-[#826F5F]'>보관함</div>
          </div>
          <div>
          <img src={star} className='w-[30px] h-[30px] object-contain cursor-pointer'/>
          <div className='mt-[2px] text-[8px] font-semibold text-[#826F5F]'>미션</div>
          </div>
        </div>
      </div>
  );
};
 export default Footer;