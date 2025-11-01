// import React, { useEffect } from 'react';
import React from 'react';
import DotIcon from "../../assets/Ellipse 12.svg";
import PlusIcon from "../../assets/add 2.png";
// import card from "../../assets/card.png";
// import book from "../../assets/book.png";
// import star from "../../assets/star.png";
// import home from "../../assets/home.png";
// import storage from "../../assets/storage-box.png";
import Footer from "../../components/Footer/Footer";


const MissionLog = () => {
  return (
    <div className='relative mx-auto h-[844px] w-[390px] bg-white'>
      <div className='p-[23px] text-left ml-2 mt-10 mb-[36px] text-[20px] font-semibold text-[#3A290D]'>우리가족의 소중한 추억</div>
      <div className='mr-[23px] flex gap-4 justify-end'>
      <div className='flex gap-1 cursor-pointer'>
        <img src={DotIcon} alt="DotIcon" className=''/>
        <div className='text-left text-[#999] text-[11px]'>최신순</div>
      </div>
      <div className='flex gap-1 cursor-pointer'>
        <img src={DotIcon} alt="DotIcon" className=''/>
        <div className='text-left text-[#999] text-[11px]'>섞어보기</div>
      </div>
      </div>
      <div className='pr-[23px] pl-[23px] mt-[5px]'>
        <div className='mt-4 mb-4 w-[344px] h-[120px] bg-[#F0F0F0] rounded-2xl'>
          <div className='flex text-black'>
          <div className='bg-white rounded-2xl w-36 h-[98px] m-3 justify-center '>사진</div>
          <div className='text-left m-3 justify-center'>
            <span className='font-semibold text-[13px] text-[#3A290D]'>한달 전 오늘</span>
            <div className='font-gabia text-[12px]'>첫 문장</div>
          </div>
        </div>
        </div>
                <div className='mt-4 mb-4 w-[237px] h-24 bg-[#F0F0F0] rounded-2xl'>
          <div className='flex text-black'>
          <div className='bg-white rounded-2xl w-[108px] h-[75px] m-3 justify-center '>사진</div>
          <div className='text-left m-3 justify-center'>
            <span className='text-[13px] text-[#3A290D]'>제목</span>
            <div className='font-gabia text-[12px]'>첫 문장</div>
          </div>
        </div>
        </div>
                        <div className='mt-4 mb-4 w-[97px] h-[98px] bg-[#D1D1D1] rounded-2xl'>
          <div className='flex text-black'>
          <div className='text-left m-3 justify-center'>
            <span className='text-[13px] text-[#3A290D]'>그날의 질문</span>
            <div className='font-gabia text-[12px]'>우리의 답</div>
          </div>
        </div>
        </div>
        <div className='fixed cursor-pointer'>
          <img src={PlusIcon} alt="PlusIcon" className='w-[36px] h-[36px]'/>
  </div>
      </div>
      <Footer></Footer>
      {/* <div className='absolute bottom-0 m-0 w-[390px] h-[86px] bg-[#CACACA] flex justify-center items-center'>
        <div className='flex justify-center items-center gap-10'>
          <img src={card} className='w-[29px] h-[29px] object-contain cursor-pointer'/>
          <img src={book} className='w-[29px] h-[29px] object-contain cursor-pointer'/>
          <img src={home} className='w-[29px] h-[29px] object-contain cursor-pointer'/>
          <img src={storage} className='w-[29px] h-[29px] object-contain cursor-pointer'/>
          <img src={star} className='w-[30px] h-[30px] object-contain cursor-pointer'/>
        </div>
      </div> */}
    </div>
  )
}

export default MissionLog;