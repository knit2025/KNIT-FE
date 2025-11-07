// import React, { useEffect } from 'react';
import React from 'react';
import Footer from "../../components/Footer/Footer";
import KNITLG from "../../assets/Knit.png";
import "../../styles/Global.css";


const MissionDetail = () => {
  return (
    <div className='relative mx-auto h-[844px] w-[390px] bg-white overflow-hidden'>
      <img src={KNITLG} alt="KNITLG" className='pt-[43px] pl-[33px] w-[100px]'/>
      <div className='pl-[23px] text-left ml-2 mt-5 mb-[36px] text-[18px] font-semibold text-[#3A290D]'>우리가족이 함께한 미션</div>
      <div className='gap-2 flex pr-[23px] pl-[23px] mb-[30px]'>
        <div className='bg-[#E7E7E7] w-[128px] h-[126px] rounded-2xl text-black flex justify-center items-center'>사진</div>
        <div className='bg-[#E7E7E7] w-[128px] h-[126px] rounded-2xl text-black flex justify-center items-center'>사진</div>
      </div>
      <div className='h-full rounded-t-[35px] text-left bg-gradient-to-t from-[#FEF1E8] to-[#FDE9DB]'>
        <div className='text-[#3A290D] font-bold pt-[28px] ml-[23px] mr-[23px]'>함께 진행할 미션 이름</div>
        <div className='ml-[23px] mr-[23px]'>
          <div className='mt-[30px] font-bold text-[#3A290D] text-[14px]'>미션 후 소감</div>
          <div>
          <div className='text-[12px] text-[#3A290D] mb-2 mt-5'>엄마</div>
                    <div className='text-black text-[11px] w-70'>오늘 아침 모두가 바빠 보이길래, 출근·등교 전 
간단하지만 든든한 아침을 챙겨줬어요. 작은 일이지만, 하루를 기분 좋게 시작하는 데 
도움이 되었으면 좋겠어요</div>
        </div>
                  <div>
          <div className='text-[12px] text-[#3A290D] mb-2 mt-5'>엄마</div>
                    <div className='text-black text-[11px] w-70'>오늘 아침 모두가 바빠 보이길래, 출근·등교 전 
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

export default MissionDetail;