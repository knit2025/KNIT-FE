import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import KNITLG from "../../assets/Knit.png";
import "../../styles/Global.css";
import { getQuestionAnswers } from "../../lib/api/question";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;


interface Answer {
  answerId: number;
  userName: string;
  content: string;
  createdAt: string;
  isAnonymous?: boolean;
}

const AnswerDetail = () => {
  const { customQId } = useParams<{ customQId: string }>();
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchAnswers = async () => {
    if (!customQId) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("로그인이 필요합니다.");

      const instanceId = Number(customQId);
      const res = await axios.get(`${baseURL}/adminqa/${instanceId}/answers`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      //익명 처리
      const processedAnswers: Answer[] = res.data.answers.map((a: any) => ({
        ...a,
        userName: a.isAnonymous ? "익명" : a.userName,
      }));

      setAnswers(processedAnswers); // 🔹 반드시 상태에 반영
    } catch (err) {
      console.error("답변 불러오기 실패:", err);
      setError("답변 불러오기 실패");
    } finally {
      setLoading(false);
    }
  };

  fetchAnswers();
}, [customQId]);



  //   fetchAnswers();
  // }, [customQId]);
  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-white">
  //       <div className="text-[#3A290D]">로딩 중...</div>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-white">
  //       <div className="text-red-500">{error}</div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen relative mx-auto h-[844px] w-[390px] bg-white overflow-hidden">
      <img
        src={KNITLG}
        alt="KNITLG"
        className="pt-[43px] pl-[33px] w-[100px]"
      />
      <div className="pl-[23px] text-left ml-2 mt-5 mb-[36px] text-[18px] font-semibold text-[#3A290D]">
        우리가족의 소중한 답변
      </div>
      <div className="pr-[23px] pl-[23px] mb-1">
        <div className="w-[342px] max-h-[495px] min-h-[200px] pb-[30px] bg-[#E6D0C1] text-left rounded-2xl text-black">
          <div className="ml-[23px] mr-[23px]">
            <div className="text-[#3A290D] font-bold pt-[28px]">
              오늘 내가 가족에게 베푼 작은 친절은?
            </div>
          {answers.length > 0 ? (
              answers.map((answer) => (
                <div key={answer.answerId} className="pt-2.5">
                  <div className="text-[13px] font-gabia text-[#3A290D] mb-2 mt-5">
                    {answer.userName}
                  </div>
                  <div className="text-black font-gabia text-[11px] w-70">
                    {answer.content}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-[#A9927F] mt-10">
                아직 답변이 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="bottom-0 left-0 w-full z-40">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default AnswerDetail;