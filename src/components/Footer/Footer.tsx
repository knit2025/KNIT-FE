import { useNavigate } from "react-router-dom";
import { PATHS } from "../../routes";
import fad from "../../assets/fad.png";
import card from "../../assets/card.png";
import star from "../../assets/star.png";
import home from "../../assets/home.png";
import storage from "../../assets/storage.png";

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute bottom-0 m-0 w-[390px] h-[86px] bg-[#FFF7F3] flex justify-center items-center text-center z-100">
      <div className="flex justify-center items-center gap-10">
        <div
          className="cursor-pointer"
          onClick={() => navigate("/knitting")}
          role="button"
          aria-label="오늘의 질문으로 이동"
        >
          <img
            src={fad}
            className="w-[29px] h-[29px] object-contain cursor-pointer"
          />
          <div className="mt-[2px] text-[8px] font-semibold text-[#826F5F]">
            Q&A
          </div>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => navigate(PATHS.questionList)}
          role="button"
          aria-label="카드질문으로 이동"
        >
          <img src={card} className="w-[29px] h-[29px] object-contain" />
          <div className="mt-[2px] text-[8px] font-semibold text-[#826F5F]">
            카드질문
          </div>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => navigate(PATHS.Home)}
          role="button"
          aria-label="홈으로 이동"
        >
          <img
            src={home}
            className="w-[29px] h-[29px] object-contain cursor-pointer"
          />
          <div className="mt-[2px] text-[8px] font-semibold text-[#826F5F]">
            홈
          </div>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => navigate(PATHS.missionLog)}
          role="button"
          aria-label="보관함으로 이동"
        >
          <img
            src={storage}
            className="w-[29px] h-[29px] object-contain cursor-pointer"
          />
          <div className="mt-[2px] text-[8px] font-semibold text-[#826F5F]">
            보관함
          </div>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => navigate(PATHS.mission)}
          role="button"
          aria-label="미션으로 이동"
        >
          <img
            src={star}
            className="w-[30px] h-[30px] object-contain cursor-pointer"
          />
          <div className="mt-[2px] text-[8px] font-semibold text-[#826F5F]">
            미션
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
