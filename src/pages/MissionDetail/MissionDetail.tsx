import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from "../../components/Footer/Footer";
import KNITLG from "../../assets/Knit.png";
import "../../styles/Global.css";
import { getMissionDetail, type MissionDetailResponse } from "../../api/missions";
// import { API_BASE_URL } from "../../api/config";

const MissionDetail = () => {
  const { missionId } = useParams<{ missionId: string }>();
  const [missionData, setMissionData] = useState<MissionDetailResponse | null>(null);
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
        setLoading(true);
        const data = await getMissionDetail(Number(missionId));
        setMissionData(data);
      } catch (err) {
        console.error('미션 상세 조회 실패:', err);
        setError(err instanceof Error ? err.message : '미션을 불러오는데 실패했습니다.');
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
        <div className="text-[#3A290D]">
          {error || "미션을 찾을 수 없습니다."}
        </div>
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
            <div
              key={index}
              className="bg-[#E7E7E7] w-[128px] h-[126px] rounded-2xl overflow-hidden"
            >
              {submission.image ? (
                <img
                  // src={submission.image.startsWith('http') ? submission.image : `${API_BASE_URL}${submission.image}`}
                  src={`${import.meta.env.VITE_API_BASE_URL}${submission.image}`}
                  alt={`${submission.userName}의 미션`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // 이미지 로드 실패 시 기본 텍스트 표시
  console.error('이미지 로드 실패:', submission.image);
                  }}
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
