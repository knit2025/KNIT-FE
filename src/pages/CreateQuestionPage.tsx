import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { QuestionTarget, CreateQuestionForm } from '../types/question';
import Header from '../components/Header/Header';
import SectionCard from '../components/Question/SectionCard';
import OptionGroup, { YesNoGroup } from '../components/Question/OptionGroup';
import TextAreaField from '../components/Question/TextAreaField';
import PrimaryButton from '../components/Question/PrimaryButton';
import Footer from '../components/Footer/Footer';
import { PATHS } from '../routes';
import { createQuestion } from '../api/questions';


const targetOptions: { label: string; value: QuestionTarget }[] = [
  { label: '아빠', value: '아빠에게' },
  { label: '엄마', value: '엄마에게' },
  { label: '아들', value: '아들에게' },
  { label: '모두에게', value: '모두에게' },
];

// QuestionTarget을 백엔드 role 문자열로 변환하는 헬퍼 함수
// "엄마에게" → "엄마", "아빠에게" → "아빠"
const getTargetRoleString = (targetRole: QuestionTarget): string => {
  if (targetRole === '모두에게') return '모두';
  // "엄마에게" → "엄마", "아빠에게" → "아빠" 등
  return targetRole.replace('에게', '');
};

export const CreateQuestionPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<CreateQuestionForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTargetSelect = useCallback((target: QuestionTarget) => {
    setFormData((prev) => ({ ...prev, targetRole: target }));
  }, []);

  const handleRevealAuthor = useCallback((reveal: boolean) => {
    setFormData((prev) => ({ ...prev, revealAuthor: reveal }));
  }, []);

  const handlePublicToAll = useCallback((isPublic: boolean) => {
    setFormData((prev) => ({ ...prev, publicToAll: isPublic }));
  }, []);

  const handleContentChange = useCallback((content: string) => {
    setFormData((prev) => ({ ...prev, content }));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!formData.targetRole || !formData.content?.trim()) return;
    if (isSubmitting) return; // 중복 제출 방지

    setIsSubmitting(true);

    try {
      // API 호출
      const toUserRole = getTargetRoleString(formData.targetRole);
      const result = await createQuestion(
        toUserRole,
        formData.content.trim(),
        !formData.revealAuthor, // revealAuthor가 false면 익명(isAnonymous=true)
        !!formData.publicToAll
      );
      
      console.log('질문 생성 성공:', result);

      // API 호출 성공 후 목록 페이지로 이동
      // QuestionListPage에서 자동으로 새로고침되므로 state 전달 불필요
      navigate(PATHS.questionList);
    } catch (error) {
      console.error('질문 생성 실패:', error);
      alert(error instanceof Error ? error.message : '질문 생성에 실패했습니다');
      setIsSubmitting(false);
    }
  }, [formData, navigate, isSubmitting]);

  const canSubmit = useMemo(() => {
    return Boolean(formData.targetRole && formData.content?.trim());
  }, [formData.targetRole, formData.content]);

  return (
    <div className="relative w-[390px] min-h-screen mx-auto bg-white overflow-hidden text-left">
      {/* 헤더 */}
      <Header />

      {/* 상단 마스킹: 스크롤 콘텐츠가 헤더 영역 아래로 보이지 않도록 가림 */}
      <div className="pointer-events-none absolute left-0 top-0 w-full h-[110px] bg-white z-40" />

      {/* 스크롤 가능한 컨텐츠 래퍼 (푸터 높이만큼 여유) */}
        <div className="absolute inset-x-0 top-0 bottom-[140px] scroll-container">

          {/* 제목 */}
          <h1 className="absolute top-[131px] left-[30px] text-[20px] font-semibold text-[#3A290D]">
            궁금했던 이야기들 천천히 꺼내볼까요?
          </h1>

          {/* 섹션: 누구에게 질문 - 79px 높이 */}
          <div className="absolute top-[190px] left-[25px] w-[340px] h-[79px]">
            <SectionCard title="누구에게 질문하고 싶으신가요?" className="rounded-[14px] h-full">
              <OptionGroup
                options={targetOptions}
                value={formData.targetRole}
                onChange={handleTargetSelect}
              />
            </SectionCard>
          </div>

          {/* 섹션: 나를 드러낼까요 - 79px 높이 */}
          <div className="absolute top-[284px] left-[25px] w-[340px] h-[79px]">
            <SectionCard title="나를 드러낼까요?" className="rounded-[14px] h-full">
              <YesNoGroup value={formData.revealAuthor} onChange={handleRevealAuthor} />
            </SectionCard>
          </div>

          {/* 섹션: 모두에게 공개 - 79px 높이 */}
          <div className="absolute top-[378px] left-[25px] w-[340px] h-[79px]">
            <SectionCard title="질문을 모두에게 공개할까요?" className="rounded-[14px] h-full">
              <YesNoGroup value={formData.publicToAll} onChange={handlePublicToAll} />
            </SectionCard>
          </div>

          {/* 섹션: 질문 내용 - 188px 높이 */}
          <div className="absolute top-[476px] left-[25px] w-[340px] h-[188px]">
            <SectionCard title="편하게 물어보아요" variant="peach" className="rounded-[14px] h-full">
              <TextAreaField
                label="질문 내용"
                value={formData.content || ''}
                onChange={handleContentChange}
                className="bg-transparent"
              />
            </SectionCard>
          </div>

          {/* 생성 완료 버튼 - 40px 높이 */}
          <div className="absolute top-[682px] left-[46px] w-[298px] h-[40px]">
            <PrimaryButton onClick={handleSubmit} disabled={!canSubmit}>
              생성 완료
            </PrimaryButton>
          </div>

        </div>

      {/* 하단 푸터 */}
      <Footer />
    </div>
  );
};
