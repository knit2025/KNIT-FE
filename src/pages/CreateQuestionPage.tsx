import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { QuestionTarget, CreateQuestionForm } from '../types/question';
import Header from '../components/Header/Header';
import SectionCard from '../components/common/SectionCard';
import OptionGroup from '../components/common/OptionGroup';
import YesNoGroup from '../components/common/YesNoGroup';
import TextAreaField from '../components/common/TextAreaField';
import PrimaryButton from '../components/common/PrimaryButton';

const targetOptions: { label: string; value: QuestionTarget }[] = [
  { label: '아빠', value: '아빠에게' },
  { label: '엄마', value: '엄마에게' },
  { label: '아들', value: '아들에게' },
  { label: '모두에게', value: '모두에게' },
];


export const CreateQuestionPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<CreateQuestionForm>>({
    revealAuthor: false,
    publicToAll: false,
  });

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
    console.log('질문 생성:', formData);
    // API 호출
    navigate('/');
  }, [formData, navigate]);

  const canSubmit = useMemo(() => {
    return Boolean(formData.targetRole && formData.content?.trim());
  }, [formData.targetRole, formData.content]);

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col">
      <Header />
        <h1 className="mb-8 text-2xl font-bold">
          궁금했던 이야기를 천천히 꺼내볼까요?
        </h1>

      <div className="flex-1 flex flex-col gap-6">
        <SectionCard title="누구에게 질문하고 싶으신가요?">
          <OptionGroup options={targetOptions} value={formData.targetRole} onChange={handleTargetSelect} />
        </SectionCard>

        <SectionCard title="나를 드러낼까요?">
          <YesNoGroup value={!!formData.revealAuthor} onChange={handleRevealAuthor} />
        </SectionCard>

        <SectionCard title="질문을 모두에게 공개할까요?">
          <YesNoGroup value={!!formData.publicToAll} onChange={handlePublicToAll} />
        </SectionCard>

        <SectionCard title="편하게 물어보아요" variant="peach">
          <TextAreaField label="질문 내용" value={formData.content || ''} onChange={handleContentChange} />
        </SectionCard>
      </div>

      <div className="mt-2">
        <PrimaryButton onClick={handleSubmit} disabled={!canSubmit}>
          생성 완료
        </PrimaryButton>
      </div>
    </div>
  );
};
