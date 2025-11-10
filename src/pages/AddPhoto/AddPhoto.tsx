// import React, { useEffect } from 'react';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import KNITLG from "../../assets/Knit.png";
import "../../styles/Global.css";

// 입력데이터 관리
const AddPhoto = () => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();


// 제출
const handleSubmit = (e) => { 
    e.preventDefault(); 

// 데이터 확인 (콘솔)
const formData = {
        year, 
        month, 
        day, 
        description, 
        // photoFile 
    };
    
    console.log("=== <form> 데이터 확인 (handleSubmit 실행) ===");
    console.log(formData);
  
  
  navigate("/MissionLog");
  };

// const AddPhoto = () => {
  return (
    <div className='relative mx-auto h-[844px] w-[390px] bg-white overflow-hidden min-h-screen'>
      <img src={KNITLG} alt="KNITLG" className='pt-[43px] pl-[33px] w-[100px]'/>
      <div className='pl-[23px] text-left ml-2 mt-5 mb-[36px] text-[18px] font-semibold text-[#3A290D]'>추억 더하기</div>
        
        <form onSubmit={handleSubmit} className='pr-[23px] pl-[23px] mb-1'> 

        <div className='bg-gradient-to-t from-[#FFF6F1] to-[#FEF1E7] w-[342px] min-h-[500px] p-[28px] pb-[30px] text-left rounded-2xl text-black'>
          
          {/* 날짜 */}
          <div className='mb-8'>
            <div className='text-[#3A290D] font-bold mb-4'>날짜를 알려주세요</div>
            <div className='flex gap-2 space-x-2'>
              
              <div className='flex items-center space-x-1'>
                <input type='number' value={year} onChange={(e) => setYear(e.target.value)} className='w-[60px] text-center bg-white text-sm rounded-sm placeholder:none focus:outline-none'/>
                <span className='text-[#3A290D] font-bold text-[14px]'>년도</span>
              </div>

              <div className='flex items-center space-x-1'>
                <input type='number'value={month} onChange={(e) => setMonth(e.target.value)} className='w-10 text-center bg-white rounded-sm text-sm focus:outline-none'/>
                <span className='text-[#3A290D]  font-bold text-[14px]'>월</span>
              </div>
              
              <div className='flex items-center space-x-1'>
                <input type='number' value={day} onChange={(e) => setDay(e.target.value)} className='w-10 text-center  bg-white rounded-sm text-sm focus:outline-none'/>
                <span className='text-[#3A290D]  font-bold text-[14px]'>일</span>
              </div>
            </div>
          </div> 
          
          {/* 사진 */}
          <div className='mb-8'>
            <div className='text-[#3A290D] font-bold mb-4'>사진을 업로드 해주세요</div>
            <div className='w-[140px] h-[140px] cursor-pointer bg-white rounded-lg flex items-center justify-center text-[#454343] text-sm'>
              사진
            </div>
            {/* 실제 파일 업로드 input은 숨겨서 사용 가능 */}
            {/* <input type="file" onChange={(e) => setPhotoFile(e.target.files[0])} className="hidden" /> */}
          </div>
          
          {/* 설명 */}
          <div className='mb-10'>
            <div className='text-[#3A290D] font-bold mb-2'>사진에 대한 한 줄 설명</div>
            <input 
              type='text' 
              placeholder='답변을 입력해주세요'
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className='font-gabia w-full text-[12px] text-[#3A290D] font-gosran focus:outline-none placeholder:text-[#ADADAD]'
            />
          </div>
          
          {/* 전송 */}
          <div className='flex justify-center mt-6'>
            <button 
              type="submit" 
              className='w-[279px] h-[45px] cursor-pointer bg-[#523E1B] text-white text-[14px] font-semibold rounded-full hover:bg-[#403526] transition-colors'
            >
              저장하기
            </button>
          </div>
        </div> 
      </form>
      <div className='bottom-0 left-0 w-full z-40'>
      <Footer></Footer>
      </div>
    </div>
  
  )
}
// }

export default AddPhoto;