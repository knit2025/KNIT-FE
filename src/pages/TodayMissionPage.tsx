import { useState } from 'react';
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

export const TodayMissionPage = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [comment, setComment] = useState('');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleComplete = () => {
    if (photo && comment.trim()) {
      // 미션 완료 처리
      console.log('Mission completed', { photo, comment });
    }
  };

  return (
    <div className="relative w-[390px] min-h-screen mx-auto bg-white overflow-hidden text-left">
      <Header />

      {/* 메인 카드 */}
      <div className="absolute top-[126px] left-[24px] w-[342px] h-[493px] bg-[#FEF1E8] rounded-[25px] px-[29px] py-[32px]">
        {/* 미션 제목 */}
        <h1 className="text-[17px] font-semibold text-[#3A290D] mb-[24px]">
          가족들과 함께 사진을 찍어보아요
        </h1>

        {/* 사진 업로드 영역 */}
        <div className="relative w-[140px] h-[155px] bg-white rounded-[10px] mb-[34px]">
          <input
            type="file"
            id="photo-upload"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
          <label
            htmlFor="photo-upload"
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
          >
            {photo ? (
              <img
                src={URL.createObjectURL(photo)}
                alt="업로드된 사진"
                className="w-full h-full object-cover rounded-[10px]"
              />
            ) : (
              <span className="text-[15px] text-[#454343]">사진</span>
            )}
          </label>
        </div>

        {/* 미션 후 소감 섹션 */}
        <div>
          <h2 className="text-[17px] font-semibold text-[#3A290D] mb-[11px]">
            미션 후 소감
          </h2>
          <p className="text-[11px] font-gabia text-[#3A290D] mb-[8px]">답변 내용</p>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="미션을 완료한 소감을 작성해주세요"
            className="w-full h-[98px] text-[12px] text-[#3A290D] bg-transparent resize-none outline-none"
          />
        </div>
      </div>

      {/* 완료 버튼 */}
      <button
        onClick={handleComplete}
        disabled={!photo || !comment.trim()}
        className={`
          absolute top-[551px] left-[53px] w-[285px] h-[41px] rounded-[17px] font-roundfix
          flex items-center justify-center
          ${photo && comment.trim() ? 'bg-[#523E1B] cursor-pointer' : 'bg-[#523E1B]/30 cursor-not-allowed'}
        `}
      >
        <span className="text-[18px] font-dunggeunmo text-white">
          mission complete
        </span>
      </button>

      {/* Footer */}
      <Footer />
    </div>
  );
};
