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
      <div className='mr-[23px] flex gap-4 justify-end mb-3'>
      <div className='flex gap-1 cursor-pointer'>
        <img src={DotIcon} alt="DotIcon" className=''/>
        <button type='button' className='cursor-pointer text-left text-[#A9927F] font-bold text-[11px]'>최신순</button>
      </div>
      <div className='flex gap-1 cursor-pointer'>
        <img src={DotIcon} alt="DotIcon" className=''/>
        <button type='button' className='cursor-pointer text-left text-[#A9927F] font-bold text-[11px]'>섞어보기</button>
      </div>
      </div>
      {/* 게시물 */}
  {/* 게시물 그리드 */}
<div className="pr-[23px] pl-[23px] mt-[5px]">
  <div
    className="grid gap-4 auto-rows-auto"
    style={{
      // 게시물 고정
      gridTemplateColumns: 'repeat(3, 104px)',
      gridAutoFlow: 'row dense' // 빈 공간 채우기
    }}
  >
    {/* 큰 카드 */}
    <div className="col-span-3 h-[120px] rounded-2xl bg-[#F2E7DF] cursor-pointer" onClick={MPhotoClick}>
      <div className="flex items-center h-full p-3">
        <div className="bg-white rounded-2xl w-[150px] text-black h-[98px] flex items-center justify-center mr-3">사진</div>
        <div className="flex flex-col items-start justify-start text-left">
          <div className="font-semibold text-[13px] text-[#3A290D]">한달 전 오늘</div>
          <div className="font-gabia text-[#454343] text-[12px]">첫 문장</div>
        </div>
      </div>
    </div>

    {/* 중간 카드 */}
    <div className="col-span-2 h-24 rounded-2xl bg-[#F3DCCD] cursor-pointer" onClick={MisstonClick}>
      <div className="flex items-center h-full p-3">
        <div className="bg-white rounded-2xl  text-black w-[110px] h-[75px] flex items-center justify-center mr-3">사진</div>
        <div className="flex flex-col items-start justify-start text-left">
          <span className="text-[13px] text-[#3A290D]">미션 제목</span>
          <div className="font-gabia  text-[#454343] text-[12px]">첫 문장</div>
        </div>
      </div>
    </div>

    {/* 작은 카드 */}
    <div className="col-span-1 h-[98px] rounded-2xl bg-[#DFC4B1] cursor-pointer" onClick={AnsClick}>
      <div className="flex items-center h-full p-3">
        <div className="flex flex-col items-start justify-start text-left">
          <span className="text-[13px] text-[#3A290D]">그날의 질문</span>
          <div className="font-gabia text-[#454343] text-[11px]">우리의 답</div>
        </div>
      </div>
    </div>

    <div className="col-span-1 h-[98px] rounded-2xl bg-[#F2E7DF] cursor-pointer" onClick={AnsClick}>
      <div className="flex items-center h-full p-3">
        <div className="flex flex-col items-start justify-start text-left">
          <span className="text-[13px] text-[#3A290D]">그날의 질문</span>
          <div className="font-gabia  text-[#454343] text-[11px]">우리의 답</div>
        </div>
      </div>
    </div>
        <div className="col-span-1 h-[98px] rounded-2xl bg-[#F2E7DF] cursor-pointer" onClick={AnsClick}>
      <div className="flex items-center h-full p-3">
        <div className="flex flex-col items-start justify-start text-left">
          <span className="text-[13px] text-[#3A290D]">그날의 질문</span>
          <div className="font-gabia  text-[#454343] text-[11px]">우리의 답</div>
        </div>
      </div>
    </div>
        <div className="col-span-1 h-[98px] rounded-2xl bg-[#F2E7DF] cursor-pointer" onClick={AnsClick}>
      <div className="flex items-center h-full p-3">
        <div className="flex flex-col items-start justify-start text-left">
          <span className="text-[13px] text-[#3A290D]">그날의 질문</span>
          <div className="font-gabia  text-[#454343] text-[11px]">우리의 답</div>
        </div>
      </div>
    </div>
    {/* ... */}
  </div>
</div>

  <button type='button' className='absolute right-[23px] bottom-[calc(100px+16px)] cursor-pointer z-50' onClick={handleClick}>
    <img src={PlusIcon} alt="PlusIcon" className='w-[36px] h-[36px]'/>
  </button>
      {/* </div> */}
      <div className='bottom-0 left-0 w-full z-40'>
      <Footer></Footer>
      </div>
    </div>
  
  )
}

export default MissionLog;