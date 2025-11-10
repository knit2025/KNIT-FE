// import React, { useEffect } from 'react';
import React from 'react';
import Footer from "../../components/Footer/Footer";
import KNITLG from "../../assets/Knit.png";
import "../../styles/Global.css";


const PhotoDetail = () => {
  return (
    <div className='relative mx-auto h-[844px] w-[390px] bg-white overflow-hidden'>
      <img src={KNITLG} alt="KNITLG" className='pt-[43px] pl-[33px] w-[100px]'/>
      <div className='pl-[23px] text-left ml-2 mt-5 mb-[36px] text-[18px] font-semibold text-[#3A290D]'>우리가족의 소중한 추억</div>
        <div className='pr-[23px] pl-[23px] mb-7'>
          <div className='w-[342px] h-[337px] bg-[#E7E7E7] rounded-2xl text-black flex justify-center items-center'>사진</div>
        </div>
      <div className='h-full rounded-t-[35px] text-left bg-[#F2E7DF]'>
        <div className='flex justify-center pt-[15px]'>
        <div className='bg-[#DEB99F] w-[39px] h-[6px] rounded-2xl'></div>
        </div>
        <div className='text-[#3A290D] font-bold pt-[28px] ml-[23px] mr-[23px]'>날짜</div>
        <div className='ml-[23px] mr-[23px]'>
          <div>
          <div className='text-[13px] text-[#3A290D] font-gabia mb-2 mt-5'>엄마</div>
                    <div className='text-black text-[11px] font-gabia w-70'>오늘 아침 모두가 바빠 보이길래, 출근·등교 전 
간단하지만 든든한 아침을 챙겨줬어요. 작은 일이지만, 하루를 기분 좋게 시작하는 데 
도움이 되었으면 좋겠어요</div>
        </div>
        </div>
      </div>
      {/* </div> */}
      <div className='bottom-0 left-0 w-full z-40'>
      <Footer></Footer>
      </div>
    </div>
  
  )
}

export default PhotoDetail;