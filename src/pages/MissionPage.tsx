import { useState } from 'react';
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import missionMarker from "../assets/missionMarker.svg";

interface Mission {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export const MissionPage = () => {
  const [missions] = useState<Mission[]>([
    {
      id: '1',
      title: '함께 요리하기',
      description: '오늘은 가족이 함께 저녁 한 끼를 만들어봐요',
      completed: true,
    },
    {
      id: '2',
      title: '마음 전하기',
      description: '가족의 좋은 점 세 가지를 적어 서로에게 전해보세요',
      completed: true,
    },
    {
      id: '3',
      title: '노래 공유하기',
      description: '지금 듣고 있는 노래와 그 이유를 가족에게 들려주세요',
      completed: true,
    },
    {
      id: '4',
      title: '고맙다고 하기',
      description: '오늘 하루, 가족에게 "고마워요" 한마디 전해봐요',
      completed: true,
    },
  ]);

  return (
    <div className="relative text-left w-[390px] min-h-screen mx-auto bg-white overflow-hidden">
      {/* 헤더 */}
      <Header />

      {/* 오늘의 미션 카드 */}
      <div className="absolute top-[127px] left-[24px] w-[342px] h-[158px] bg-[#FEE5D4] rounded-[25px] px-[28px] py-[26px]">
        <div className="flex items-center mb-[14px]">
          <img src={missionMarker} alt="미션 마커" className="w-[20px] h-[22px]" />
          <h1 className="ml-[7px] text-[17px] font-semibold text-[#3A290D]">
            오늘의 미션
          </h1>
        </div>

        <p className="text-[14px] font-semibold text-[#3A290D] mb-[16px]">
          가족들과 함께 사진을 찍어보아요
        </p>

        <button className="w-[285px] h-[37px] bg-white rounded-[17px] flex items-center justify-center">
          <span className="text-[16px] font-semibold text-[#3A290D]">미션 인증</span>
        </button>
      </div>

      {/* 미션 완료 현황 카드 */}
      <div className="absolute top-[322px] left-[24px] w-[342px] h-[487px] bg-gradient-to-b from-[#FFDFC8] to-[#FCEADD] rounded-t-[25px] px-[28px] pt-[25px]">
        <h2 className="text-[19px] font-semibold text-[#3A290D] mb-[12px]">
          미션 완료 현황
        </h2>

        {/* 미션 리스트 */}
        <div className="space-y-[13px]">
          {missions.map((mission, index) => (
            <div
              key={mission.id}
              className="w-[285px] bg-white rounded-lg p-[16px] flex flex-col"
              style={{ height: index === 0 ? '80px' : index === 2 ? '79px' : '79px' }}
            >
              <div className="flex items-center justify-between mb-[8px]">
                <h3 className="text-[15px] font-medium text-[#3A290D]">{mission.title}</h3>
                {mission.completed && (
                  <div className="w-[52px] h-[17px] bg-[#F2DBCB] rounded-md flex items-center justify-center">
                    <span className="text-[10px] font-semibold text-[#3A290D]">미션 완료</span>
                  </div>
                )}
              </div>
              <p className="text-[11px] font-semibold text-[#3A290D]">
                {mission.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};
