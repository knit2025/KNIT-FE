import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { getTodayMission, submitMission, checkCurrentUserSubmittedById } from "../api/missions";
import { PATHS } from "../routes";
import type { ChangeEvent } from "react";
import Toast from "../components/Toast/Toast";

export const TodayMissionPage = () => {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<File | null>(null);
  const [comment, setComment] = useState("");
  const [missionInstanceId, setMissionInstanceId] = useState<number | null>(null);
  const [missionTitle, setMissionTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    const fetchTodayMission = async () => {
      try {
        setLoading(true);

        const mission = await getTodayMission();
        setMissionInstanceId(mission.missionInstanceId);
        setMissionTitle(mission.content);

        // 서버 응답의 userSubmissions에서 이미 제출했는지 확인
        // userName === loginId && isSubmitted === true
        if (checkCurrentUserSubmittedById(mission.userMissions)) {
          setToastMsg('이미 제출한 미션입니다');
          setToastOpen(true);
          // 토스트 표시 후 미션 목록으로 이동
          setTimeout(() => navigate(PATHS.mission), 1200);
          return;
        }
      } catch (err) {
        console.error('미션 불러오기 실패:', err);
        setError(err instanceof Error ? err.message : '미션을 불러오는데 실패했습니다');
      } finally {
        setLoading(false);
      }
    };

    fetchTodayMission();
  }, [navigate]);

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleComplete = async () => {
    if (!photo || !comment.trim() || !missionInstanceId) {
      return;
    }

    try {
      setSubmitting(true);
      await submitMission(missionInstanceId, comment, photo);

      setToastMsg('미션이 성공적으로 제출되었습니다!');
      setToastOpen(true);
      setTimeout(() => navigate(PATHS.mission), 1200);
    } catch (err) {
      console.error('미션 제출 실패:', err);
      setToastMsg(err instanceof Error ? err.message : '미션 제출에 실패했습니다');
      setToastOpen(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="relative w-[390px] min-h-screen mx-auto bg-white overflow-hidden text-left flex items-center justify-center">
        <div className="text-[#3A290D]">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-[390px] min-h-screen mx-auto bg-white overflow-hidden text-left flex items-center justify-center">
        <div className="text-[#3A290D]">{error}</div>
      </div>
    );
  }

  return (
    <div className="relative w-[390px] min-h-screen mx-auto bg-white overflow-hidden text-left">
      <Header />
      <Toast open={toastOpen} message={toastMsg} onClose={() => setToastOpen(false)} />

      {/* 메인 카드 */}
      <div className="absolute top-[126px] left-[24px] w-[342px] h-[493px] bg-[#FEF1E8] rounded-[25px] px-[29px] py-[32px]">
        {/* 미션 제목 */}
        <h1 className="text-[17px] font-semibold text-[#3A290D] mb-[24px]">
          {missionTitle}
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
          <p className="text-[11px] font-gabia text-[#3A290D] mb-[8px]">
            답변 내용
          </p>
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
        disabled={!photo || !comment.trim() || submitting}
        className={`
          absolute top-[551px] left-[53px] w-[285px] h-[41px] rounded-[17px] font-roundfix
          flex items-center justify-center
          ${
            photo && comment.trim() && !submitting
              ? "bg-[#523E1B] cursor-pointer"
              : "bg-[#523E1B]/30 cursor-not-allowed"
          }
        `}
      >
        <span className="text-[18px] font-dunggeunmo text-white">
          {submitting ? "제출 중..." : "mission complete"}
        </span>
      </button>

      {/* Footer */}
      <Footer />
    </div>
  );
};
