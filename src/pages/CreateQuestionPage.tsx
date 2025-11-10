import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { QuestionTarget, CreateQuestionForm, Question } from '../types/question';
import Header from '../components/Header/Header';
import SectionCard from '../components/Question/SectionCard';
import OptionGroup, { YesNoGroup } from '../components/Question/OptionGroup';
import TextAreaField from '../components/Question/TextAreaField';
import PrimaryButton from '../components/Question/PrimaryButton';
import Footer from '../components/Footer/Footer';
import { PATHS } from '../routes';

const targetOptions: { label: string; value: QuestionTarget }[] = [
  { label: '아빠', value: '아빠에게' },
  { label: '엄마', value: '엄마에게' },
  { label: '아들', value: '아들에게' },
  { label: '모두에게', value: '모두에게' },
];


export const CreateQuestionPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<CreateQuestionForm>>({});

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

  const handleSubmit = useCallback(() => {
    if (!formData.targetRole || !formData.content?.trim()) return;

    const newQuestion: Question = {
      id: String(Date.now()),
      authorRole: '기타',
      targetRole: formData.targetRole,
      title: '',
      content: formData.content.trim(),
      revealAuthor: !!formData.revealAuthor,
      publicToAll: !!formData.publicToAll,
      createdAt: new Date(),
    };

    // 다음 페이지에서 받아서 리스트에 반영
    navigate(PATHS.questionList, { state: { newQuestion } });
  }, [formData, navigate]);

  const canSubmit = useMemo(() => {
    return Boolean(formData.targetRole && formData.content?.trim());
  }, [formData.targetRole, formData.content]);

  return (
    <div className="relative w-[390px] min-h-screen mx-auto bg-white overflow-hidden text-left">
      {/* 헤더 */}
      <Header />

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

      {/* 하단 푸터 */}
      <Footer />
    </div>
  );
};
