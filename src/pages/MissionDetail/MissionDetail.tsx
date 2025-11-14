// // import React, { useEffect } from 'react';
// import Footer from "../../components/Footer/Footer";
// import KNITLG from "../../assets/Knit.png";
// import "../../styles/Global.css";

// const MissionDetail = () => {
//   return (
//     <div className="min-h-screen relative mx-auto h-[844px] w-[390px] bg-white overflow-hidden">
//       <img
//         src={KNITLG}
//         alt="KNITLG"
//         className="pt-[43px] pl-[33px] w-[100px]"
//       />
//       <div className="pl-[23px] text-left ml-2 mt-5 mb-[36px] text-[18px] font-semibold text-[#3A290D]">
//         우리가족이 함께한 미션
//       </div>
//       <div className="gap-2 flex pr-[23px] pl-[23px] mb-[30px]">
//         <div className="bg-[#E7E7E7] w-[128px] h-[126px] rounded-2xl text-black flex justify-center items-center">
//           사진
//         </div>
//         <div className="bg-[#E7E7E7] w-[128px] h-[126px] rounded-2xl text-black flex justify-center items-center">
//           사진
//         </div>
//       </div>
//       <div className="h-full rounded-t-[35px] text-left bg-gradient-to-t from-[#FEF1E8] to-[#FDE9DB]">
//         <div className="text-[#3A290D] font-bold pt-[28px] ml-[23px] mr-[23px]">
//           함께 진행할 미션 이름
//         </div>
//         <div className="ml-[23px] mr-[23px]">
//           <div className="mt-[30px] font-bold text-[#3A290D] text-[14px]">
//             미션 후 소감
//           </div>
//           <div>
//             <div className="text-[13px] font-gabia text-[#3A290D] mb-2 mt-5">
//               엄마
//             </div>
//             <div className="text-black text-[11px] font-gabia w-70">
//               오늘 아침 모두가 바빠 보이길래, 출근·등교 전 간단하지만 든든한
//               아침을 챙겨줬어요. 작은 일이지만, 하루를 기분 좋게 시작하는 데
//               도움이 되었으면 좋겠어요
//             </div>
//           </div>
//           <div>
//             <div className="text-[13px] font-gabia text-[#3A290D] mb-2 mt-5">
//               엄마
//             </div>
//             <div className="text-black font-gabia text-[11px] w-70">
//               오늘 아침 모두가 바빠 보이길래, 출근·등교 전 간단하지만 든든한
//               아침을 챙겨줬어요. 작은 일이지만, 하루를 기분 좋게 시작하는 데
//               도움이 되었으면 좋겠어요
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* </div> */}
//       <div className="bottom-0 left-0 w-full z-40">
//         <Footer></Footer>
//       </div>
//     </div>
//   );
// };

// export default MissionDetail;
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from "../../components/Footer/Footer";
import KNITLG from "../../assets/Knit.png";
import "../../styles/Global.css";

interface UserSubmission {
  userId: number;
  userName: string;
  opinion: string;
  image: string;
  createdAt: string;
}

interface MissionDetailData {
  missionInstanceId: number;
  title: string;
  content: string;
  completedDate: string;
  userSubmissions: UserSubmission[];
}

// 🆕 더미 데이터 추가
const DUMMY_DATA: MissionDetailData = {
  missionInstanceId: 1,
  title: "사진찍기",
  content: "가족과 함께 사진을 찍어봐요",
  completedDate: "2025-11-12",
  userSubmissions: [
    {
      userId: 4,
      userName: "이연우",
      opinion: "재밌었어요",
      image: "/media/missions/가나디.png",
      createdAt: "2025-11-12T00:27:20.989261"
    },
    {
      userId: 5,
      userName: "엄마",
      opinion: "우리 가족과 함께해서 좋았어요. 다음에 또 하고 싶어요!",
      image: "/media/missions/family2.png",
      createdAt: "2025-11-12T01:30:00.000000"
    }
  ]
};

const MissionDetail = () => {
  const { missionId } = useParams<{ missionId: string }>();
  const [missionData, setMissionData] = useState<MissionDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMissionDetail = async () => {
      if (!missionId) {
        setError('미션 ID가 없습니다.');
        setLoading(false);
        return;
      }

      try {
        // 🔧 일단 더미 데이터 사용 (API 호출 주석 처리)
        console.log('더미 데이터 사용 중...');
        await new Promise(resolve => setTimeout(resolve, 500)); // 로딩 시뮬레이션
        setMissionData(DUMMY_DATA);
        
        /* 
        // 실제 API 호출 (나중에 주석 해제)
        const response = await axios.get(`/missions`, {
          params: { missionId },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        
        console.log('Mission data:', response.data);
        setMissionData(response.data);
        */
      } catch (error) {
        console.error('Error fetching mission detail:', error);
        setError('미션을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchMissionDetail();
  }, [missionId]);

  if (loading) {
    return (
      <div className="min-h-screen relative mx-auto h-[844px] w-[390px] bg-white overflow-hidden flex flex-col items-center justify-center">
        <div className="text-[#3A290D]">로딩 중...</div>
      </div>
    );
  }

  if (error || !missionData) {
    return (
      <div className="min-h-screen relative mx-auto h-[844px] w-[390px] bg-white overflow-hidden flex flex-col items-center justify-center">
        <div className="text-[#3A290D]">{error || '미션을 찾을 수 없습니다.'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative mx-auto h-[844px] w-[390px] bg-white overflow-hidden">
      <img
        src={KNITLG}
        alt="KNITLG"
        className="pt-[43px] pl-[33px] w-[100px]"
      />
      <div className="pl-[23px] text-left ml-2 mt-5 mb-[36px] text-[18px] font-semibold text-[#3A290D]">
        우리가족이 함께한 미션
      </div>

      <div className="gap-2 flex pr-[23px] pl-[23px] mb-[30px]">
        {missionData.userSubmissions.length > 0 ? (
          missionData.userSubmissions.slice(0, 2).map((submission, index) => (
            <div key={index} className="bg-[#E7E7E7] w-[128px] h-[126px] rounded-2xl overflow-hidden">
              {submission.image ? (
                <img 
                  src={submission.image}
                  alt={`${submission.userName}의 미션`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex justify-center items-center text-black">
                  사진
                </div>
              )}
            </div>
          ))
        ) : (
          <>
            <div className="bg-[#E7E7E7] w-[128px] h-[126px] rounded-2xl text-black flex justify-center items-center">
              사진
            </div>
            <div className="bg-[#E7E7E7] w-[128px] h-[126px] rounded-2xl text-black flex justify-center items-center">
              사진
            </div>
          </>
        )}
      </div>

      <div className="h-full rounded-t-[35px] text-left bg-gradient-to-t from-[#FEF1E8] to-[#FDE9DB] pb-20">
        <div className="text-[#3A290D] font-bold pt-[28px] ml-[23px] mr-[23px]">
          {missionData.title}
        </div>
        
        <div className="ml-[23px] mr-[23px]">
          <div className="mt-[30px] font-bold text-[#3A290D] text-[14px]">
            미션 후 소감
          </div>
          
          {missionData.userSubmissions.length > 0 ? (
            missionData.userSubmissions.map((submission, index) => (
              <div key={index}>
                <div className="text-[13px] font-gabia text-[#3A290D] mb-2 mt-5">
                  {submission.userName}
                </div>
                <div className="text-black text-[11px] font-gabia w-70 mb-3">
                  {submission.opinion}
                </div>
              </div>
            ))
          ) : (
            <div className="text-black text-[11px] font-gabia mt-5">
              아직 작성된 소감이 없습니다.
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full z-40">
        <Footer />
      </div>
    </div>
  );
};

export default MissionDetail;
