import { useState, useEffect, useMemo } from 'react';
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import missionMarker from "../assets/missionMarker.svg";
import { PATHS } from '../routes';
import { useNavigate } from 'react-router-dom';
import { getTodayMission, getCompletedMissions, checkCurrentUserSubmittedById, type TodayMissionResponse, type CompletedMission } from '../api/missions';

interface Mission {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export const MissionPage = () => {
  const navigate = useNavigate();

  const [todayMission, setTodayMission] = useState<TodayMissionResponse | null>(null);
  const [completedMissions, setCompletedMissions] = useState<CompletedMission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [localMissionCompleted, setLocalMissionCompleted] = useState(false);
  const currentUserId = useMemo(() => {
    const fromKey = localStorage.getItem('currentUserId');
    if (fromKey) return Number(fromKey);
    try {
      const u = localStorage.getItem('user');
      if (u) {
        const parsed = JSON.parse(u);
        if (parsed?.id != null) return Number(parsed.id);
      }
    } catch {}
    return undefined;
  }, []);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        setLoading(true);

        const [today, completed] = await Promise.all([
          getTodayMission(),
          getCompletedMissions()
        ]);

        // 서버 응답의 userSubmissions에서 현재 사용자(userId 기준)가 제출했는지 확인
        // 신규 스펙: userMissions 배열 기준(userId)
        const selfSubmitted = checkCurrentUserSubmittedById(today.userMissions);
        setLocalMissionCompleted(selfSubmitted);

        setTodayMission(today);
        setCompletedMissions(completed);
      } catch (err) {
        console.error('미션 불러오기 실패:', err);
        setError(err instanceof Error ? err.message : '미션을 불러오는데 실패했습니다');
      } finally {
        setLoading(false);
      }
    };

    fetchMissions();
  }, []);


  if (loading) {
    return (
      <div className="relative text-left w-[390px] min-h-screen mx-auto bg-white overflow-hidden flex items-center justify-center">
        <div className="text-[#3A290D]">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative text-left w-[390px] min-h-screen mx-auto bg-white overflow-hidden flex items-center justify-center">
        <div className="text-[#3A290D]">{error}</div>
      </div>
    );
  }

  return (
    <div className="relative text-left w-[390px] min-h-screen mx-auto bg-white overflow-hidden">
      <Header />
      <div className="pointer-events-none absolute left-0 top-0 w-full h-[110px] bg-white z-40" />
      <div className="absolute inset-x-0 top-0 bottom-[86px] scroll-container">
        <div className="px-[24px] pt-[127px] h-full min-h-0 flex flex-col gap-[37px]">

          {/* 오늘의 미션 카드 */}
          {todayMission && (
            <div className="w-full bg-[#FEE5D4] rounded-[25px] px-[28px] py-[26px]">
              <div className="flex items-center mb-[14px]">
                <img src={missionMarker} alt="미션 마커" className="w-[20px] h-[22px]" />
                <h1 className="ml-[7px] text-[17px] font-semibold text-[#3A290D]">
                  오늘의 미션
                </h1>
              </div>

              {localMissionCompleted ? (
                <div className="flex flex-col items-center justify-center">
                  <p className="text-[16px] font-semibold text-[#3A290D] text-center">
                    오늘의 미션을 이미 제출했어요! 🎉
                  </p>
                  <p className="text-[12px] text-[#3A290D] mt-2 text-center">
                    다른 가족 구성원들의 참여를 응원해 주세요 👏
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-[14px] font-semibold text-[#3A290D] mb-[16px] break-words">
                    {todayMission.content}
                  </p>

                  <button
                    className="w-[285px] h-[37px] bg-white rounded-[17px] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => navigate(PATHS.todayMission)}
                  >
                    <span className="text-[16px] font-semibold text-[#3A290D]">
                      미션 인증
                    </span>
                  </button>
                </>
              )}
            </div>
          )}

          {/* 미션 완료 현황 카드 */}
          <div className="w-full flex-1 min-h-0 bg-gradient-to-b from-[#FFDFC8] to-[#FCEADD] rounded-t-[25px] px-[28px] pt-[25px] flex flex-col">
            <h2 className="text-[19px] font-semibold text-[#3A290D] mb-[12px]">
              미션 완료 현황
            </h2>

            {/* 미션 리스트 */}
            <div className="flex-1 space-y-[13px] overflow-y-auto scroll-container pr-1">
              {completedMissions.length > 0 ? (
                completedMissions.map((mission, index) => (
                  <div
                    key={mission.missionInstanceId}
                    className="w-[285px] bg-white rounded-lg p-[16px] flex flex-col cursor-pointer hover:bg-gray-50"
                    style={{ height: index === 0 ? '80px' : index === 2 ? '79px' : '79px' }}
                    onClick={() => navigate(PATHS.missionDetail(mission.missionInstanceId))}
                  >
                    <div className="flex items-center justify-between mb-[8px]">
                      <h3 className="text-[15px] font-medium text-[#3A290D]">{mission.title}</h3>
                      <div className="w-[52px] h-[17px] bg-[#F2DBCB] rounded-md flex items-center justify-center">
                        <span className="text-[10px] font-semibold text-[#3A290D]">미션 완료</span>
                      </div>
                    </div>
                    <p className="text-[11px] font-semibold text-[#3A290D]">
                      {mission.content}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center text-[#3A290D] py-8">
                  아직 완료한 미션이 없습니다
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
