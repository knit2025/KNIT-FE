// import React, { useEffect } from 'react';
import React from 'react';
import DotIcon from "../../assets/Ellipse 12.svg";
import PlusIcon from "../../assets/add 2.png";
import Footer from "../../components/Footer/Footer";
import KNITLG from "../../assets/Knit.png";
import "../../styles/Global.css";
import { useNavigate } from "react-router-dom";

const MissionLog = () => {
  const navigate = useNavigate();

    const handleClick = () => {
    navigate("/AddPhoto");
  };
      const MPhotoClick = () => {
    navigate("/PhotoDetail");
  };
        const AnsClick = () => {
    navigate("/AnswerDetail");
  };
          const MisstonClick = () => {
    navigate("/MissionDetail");
  };

  return (
    <div className='relative mx-auto h-[844px] w-[390px] bg-white overflow-hidden'>
      <img src={KNITLG} alt="KNITLG" className='pt-[43px] pl-[33px] w-[100px]'/>
      <div className='pl-[23px] text-left ml-2 mt-5 mb-[36px] text-[18px] font-semibold text-[#3A290D]'>우리가족의 소중한 추억</div>
      <div className='mr-[23px] flex gap-4 justify-end'>
      <div className='flex gap-1 cursor-pointer'>
        <img src={DotIcon} alt="DotIcon" className=''/>
        <div className='text-left text-[#A9927F] font-bold text-[11px]'>최신순</div>
      </div>
      <div className='flex gap-1 cursor-pointer'>
        <img src={DotIcon} alt="DotIcon" className=''/>
        <div className='text-left text-[#A9927F] font-bold text-[11px]'>섞어보기</div>
      </div>
      </div>
      <div className='pr-[23px] pl-[23px] mt-[5px]'>
        
        {/* <div className='grid grid-cols-2 gap-3 auto-rows-[98px]'> */}
        <div className='mt-4 mb-4 w-[344px] h-[120px] cursor-pointer bg-[#F2E7DF] rounded-2xl flex items-center' onClick={MPhotoClick}>
          <div className='flex text-black'>
          <div className='bg-white rounded-2xl w-36 h-[98px] m-3 justify-center flex justify-center items-center '>사진</div>
          <div className='text-left m-3 justify-center'>
            <div className='font-semibold text-[13px] text-[#3A290D]'>한달 전 오늘</div>
            <div className='font-gabia text-[12px]'>첫 문장</div>
          </div>
        </div>
        </div>
                <div className='mt-4 mb-4 w-[237px] h-24 bg-[#F3DCCD] cursor-pointer rounded-2xl' onClick={MisstonClick}>
          <div className='flex text-black'>
          <div className='bg-white rounded-2xl w-[108px] h-[75px] m-3 justify-center flex justify-center items-center '>사진</div>
          <div className='text-left m-3 justify-center'>
            <span className='text-[13px] text-[#3A290D]'>미션 제목</span>
            <div className='font-gabia text-[12px]'>첫 문장</div>
          </div>
        </div>
        </div>
          <div className='mt-4 mb-4 w-[97px] h-[98px] cursor-pointer bg-[#DFC4B1] rounded-2xl' onClick={AnsClick}>
          <div className='flex text-black'>
          <div className='text-left m-3 justify-center'>
            <span className='text-[13px] text-[#3A290D]'>그날의 질문</span>
            <div className='font-gabia text-[11px]'>우리의 답</div>
          </div>
        </div>
        </div>
        <div className='mt-4 mb-4 w-[97px] cursor-pointer h-[98px] bg-[#F2E7DF] rounded-2xl' onClick={AnsClick}>
          <div className='flex text-black'>
          <div className='text-left m-3 justify-center'>
            <span className='text-[13px] text-[#3A290D]'>그날의 질문</span>
            <div className='font-gabia text-[11px]'>우리의 답</div>
          </div>
        </div>
        </div>

  </div>
  <div className='absolute right-[23px] bottom-[calc(100px+16px)] cursor-pointer z-50' onClick={handleClick}>
    <img src={PlusIcon} alt="PlusIcon" className='w-[36px] h-[36px]'/>
  </div>
      {/* </div> */}
      <div className='bottom-0 left-0 w-full z-40'>
      <Footer></Footer>
      </div>
    </div>
  
  )
}

export default MissionLog;