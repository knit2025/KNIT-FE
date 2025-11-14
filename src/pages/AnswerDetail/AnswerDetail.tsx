import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from "../../components/Footer/Footer";
import KNITLG from "../../assets/Knit.png";
import "../../styles/Global.css";
import { getQuestionAnswers } from '../../lib/api/question';

interface Answer {
  answerId: number;
  userName: string;
  content: string;
  createdAt: string;
}

const AnswerDetail = () => {
    const navigate = useNavigate();
  const { customQId } = useParams<{ customQId: string }>();
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnswers = async () => {
      if (!customQId) return;
      
      try {
        setLoading(true);
        const data = await getQuestionAnswers(Number(customQId));
        console.log('답변 목록:', data);
        setAnswers(data);
      } catch (err) {
        console.error('답변 불러오기 실패:', err);
        setError('답변을 불러올 수 없습니다. 로그인이 필요합니다.');
        
               // 🟢 임시: 더미 데이터
        setAnswers([
          {
            answerId: 1,
            userName: '엄마',
            content: '오늘 아침 모두가 바빠 보이길래, 출근·등교 전 간단하지만 든든한 아침을 챙겨줬어요.',
            createdAt: new Date().toISOString()
          },
          {
            answerId: 2,
            userName: '아빠',
            content: '퇴근 후 집안일 도와주고 저녁 설거지를 했어요.',
            createdAt: new Date().toISOString()
          },
          {
            answerId: 3,
            userName: '딸',
            content: '동생 숙제 도와줬어요!',
            createdAt: new Date().toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAnswers();
  }, [customQId]);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-[#3A290D]">로딩 중...</div>
      </div>
    );
  }

  return (

    <div className='min-h-screen relative mx-auto h-[844px] w-[390px] bg-white overflow-hidden'>
      <img src={KNITLG} alt="KNITLG" className='pt-[43px] pl-[33px] w-[100px]'/>
      <div className='pl-[23px] text-left ml-2 mt-5 mb-[36px] text-[18px] font-semibold text-[#3A290D]'>우리가족의 소중한 답변</div>
        <div className='pr-[23px] pl-[23px] mb-1'>
          <div className='w-[342px] max-h-[495px] min-h-[200px] pb-[30px] bg-[#E6D0C1] text-left rounded-2xl text-black'>
          <div className='ml-[23px] mr-[23px]'>
            <div className='text-[#3A290D] font-bold pt-[28px]'>오늘 내가 가족에게 베푼 작은 친절은?</div>
          {answers.length > 0 ? (
              answers.map((answer) => (
          <div key={answer.answerId} className='pt-2.5'>
          <div className='text-[13px] font-gabia text-[#3A290D] mb-2 mt-5'> {answer.userName}</div>
            <div className='text-black font-gabia text-[11px] w-70'> {answer.content}</div>
</div>        ))
            ) : (
              <div className='text-center text-[#A9927F] mt-10'>
                아직 답변이 없습니다.
              </div>
            )}
          {/* <div className='pt-2.5'>
          <div className='text-[13px] font-gabia text-[#3A290D] mb-2 mt-5'>엄마</div>
            <div className='text-black font-gabia text-[11px] w-70'>오늘 아침 모두가 바빠 보이길래, 출근·등교 전 
간단하지만 든든한 아침을 챙겨줬어요. 작은 일이지만, 하루를 기분 좋게 시작하는 데 
도움이 되었으면 좋겠어요</div>
</div>
          <div className='pt-2.5'>
          <div className='text-[13px] font-gabia text-[#3A290D] mb-2 mt-5'>엄마</div>
            <div className='text-black font-gabia text-[11px] w-70'>오늘 아침 모두가 바빠 보이길래, 출근·등교 전 
간단하지만 든든한 아침을 챙겨줬어요. 작은 일이지만, 하루를 기분 좋게 시작하는 데 
도움이 되었으면 좋겠어요</div>
</div> */}
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
