import Footer from "../../components/Footer/Footer";
import KindnessBox from "../../components/TodayKindness/KindnessBox";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

type TodayQuestion = {
  instanceId: number;
  content: string;
  isCurrent: boolean;
  status: string;
  answeredUsers: string[];
  totalMembers: number;
};

type AnswerItem = {
  userName: string;
  content: string;
};

type AnswerList = {
  answers: AnswerItem[];
  answerCount: number;
  totalMembers: number;
  allAnswered: boolean;
};

const TodayKindness: React.FC = () => {
  const [familyList, setFamilyList] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [question, setQuestion] = useState<string>("");
  const [instanceId, setInstanceId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [questionInfo, setQuestionInfo] = useState<TodayQuestion | null>(null);

  const fetchAnswerList = async (instanceId: number) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get<AnswerList>(
        `${baseURL}/adminqa/${instanceId}/answers`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const serverAnswers = res.data.answers;

      const names = serverAnswers.map((item) => item.userName);
      setFamilyList(names);

      const answerMap: Record<string, string> = {};
      serverAnswers.forEach((item) => {
        answerMap[item.userName] = item.content;
      });

      setAnswers(answerMap);
    } catch (err) {
      console.error("답변 목록 불러오기 실패:", err);
    }
  };

  const handleSave = async (name: string, text: string) => {
    setAnswers((prev) => ({ ...prev, [name]: text }));

    if (!instanceId) {
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");

      const res = await axios.post(
        `${baseURL}/adminqa/answer`,
        {
          instanceId: instanceId,
          content: text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("답변 저장 성공:", res.data);
    } catch (err) {
      console.error("답변 저장 실패:", err);
    }
  };

  useEffect(() => {
    const fetchTodayQuestion = async () => {
      try {
        console.log("baseURL:", baseURL);
        console.log("request url:", `${baseURL}/adminqa/today`);
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("accessToken");
        if (!token) {
          setError("로그인이 필요합니다.");
          setLoading(false);
          return;
        }

        const res = await axios.get<TodayQuestion>(`${baseURL}/adminqa/today`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data;
        setQuestion(data.content);
        setInstanceId(data.instanceId);
        await fetchAnswerList(data.instanceId);
        // setQuestionInfo(data);
      } catch (err) {
        console.error("오늘의 질문 불러오기 실패:", err);
        setError("오늘의 질문을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchTodayQuestion();
  }, []);

  return (
    <div className="w-[390px] h-screen overflow-hidden flex flex-col items-center bg-white">
      <p className="font-gabia text-[#3A290D] text-[1.5rem] pt-20 pb-10">
        "{question}"
      </p>
      {loading ? (
        <p className="text-sm text-[#846F5E] pb-6">질문 불러오는 중...</p>
      ) : error ? (
        <p className="text-sm text-red-500 pb-6">{error}</p>
      ) : (
        <p className="font-gabia text-[#3A290D] text-[0.95rem] pb-6 text-center px-6 leading-relaxed">
          " {question} "
        </p>
      )}
      <div className="flex flex-col items-center w-full">
        {familyList.map((name) => (
          <KindnessBox
            key={name}
            family={name}
            content={answers[name] || ""}
            onSave={handleSave}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default TodayKindness;
