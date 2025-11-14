import { useCallback, useMemo, useState, useEffect } from 'react';
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
import { getFamily, getCurrentUser } from '../api/family';
import { getCurrentUserRole } from '../api/config';

export const CreateQuestionPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<CreateQuestionForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [targetOptions, setTargetOptions] = useState<{ label: string; value: QuestionTarget }[]>([]);
  const [loading, setLoading] = useState(true);
  // ID → number 매핑 저장 (API 호출 시 사용)
  const [idToNumberMap, setIdToNumberMap] = useState<Map<string, number | null>>(new Map());

  // 가족 구성원 정보 가져오기
  useEffect(() => {
    const fetchFamilyMembers = async () => {
      try {
        setLoading(true);
        const currentUser = getCurrentUser();
        const currentRole = getCurrentUserRole();
        const familyData = await getFamily();

        // ID → number 매핑 생성 (API 호출 시 사용)
        const mapping = new Map<string, number | null>();

        // 자기 자신을 제외한 가족 구성원의 역할 추출
        // label: role, value: user ID (string)
        const options: { label: string; value: QuestionTarget }[] = familyData.users
          .filter(user => {
            // 1) id가 있으면 id로 필터
            if (currentUser?.id != null) {
              return user.id !== currentUser.id;
            }
            // 2) fallback: 로컬에 저장된 현재 역할이 있으면 role로 필터
            if (currentRole) {
              return user.role !== currentRole;
            }
            // 3) 아무 정보도 없으면 필터하지 않음
            return true;
          })
          .map(user => {
            const userId = user.id.toString();
            mapping.set(userId, user.id); // string key → number value
            return {
              label: user.role, // 화면에 표시될 역할 이름
              value: userId as QuestionTarget, // 선택용 user ID (string)
            };
          });

        // "모두에게" 옵션을 마지막에 추가
        options.push({ label: "모두에게", value: "모두에게" });
        mapping.set("모두에게", null); // "모두에게"는 null로 전송

        setTargetOptions(options);
        setIdToNumberMap(mapping);
      } catch (error) {
        console.error('가족 정보 불러오기 실패:', error);
        // 에러 시 기본 옵션 사용
        const defaultMap = new Map<string, number | null>();
        defaultMap.set("모두에게", null);
        setTargetOptions([{ label: "모두에게", value: "모두에게" }]);
        setIdToNumberMap(defaultMap);
      } finally {
        setLoading(false);
      }
    };

    fetchFamilyMembers();
  }, []);

  const handleTargetSelect = useCallback((target: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, targetRole: target as QuestionTarget }));
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
      // ID → number 변환 (또는 "모두에게" → null)
      const toUser = idToNumberMap.get(formData.targetRole);
      if (toUser === undefined) {
        throw new Error('선택한 대상의 정보를 찾을 수 없습니다');
      }

      const result = await createQuestion(
        toUser, // number 또는 null (모두에게)
        formData.content.trim(),
        !formData.revealAuthor, // revealAuthor가 false면 익명(isAnonymous=true)
        !!formData.publicToAll
      );

      console.log('질문 생성 성공:', result);

      // API 호출 성공 후 목록 페이지로 이동
      // QuestionListPage에서 자동으로 새로고침되므로 state 전달 불필요
      navigate(PATHS.questionList);
    } catch (error) {
      console.error("질문 생성 실패:", error);
      alert(
        error instanceof Error ? error.message : "질문 생성에 실패했습니다"
      );
      setIsSubmitting(false);
    }
  }, [formData, navigate, isSubmitting, idToNumberMap]);

  const canSubmit = useMemo(() => {
    return Boolean(formData.targetRole && formData.content?.trim());
  }, [formData.targetRole, formData.content]);

  // 흐름 기반 레이아웃 사용으로 별도 동적 위치/높이 계산이 필요 없습니다.

  if (loading) {
    return (
      <div className="relative w-[390px] min-h-screen mx-auto bg-white overflow-hidden text-left flex items-center justify-center">
        <div className="text-[#3A290D]">가족 정보를 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="relative w-[390px] min-h-screen mx-auto bg-white overflow-hidden text-left">
      {/* 헤더 */}
      <Header />

      {/* 상단 마스킹: 스크롤 콘텐츠가 헤더 영역 아래로 보이지 않도록 가림 */}
      <div className="pointer-events-none absolute left-0 top-0 w-full h-[110px] bg-white z-40" />

      {/* 스크롤 가능한 컨텐츠 래퍼 (푸터 높이만큼 여유) */}
      <div className="absolute inset-x-0 top-0 bottom-[86px] scroll-container">
        <div className="px-[25px] pt-[131px] pb-[120px] space-y-[15px]">
          {/* 제목 */}
          <h1 className="text-[20px] font-semibold text-[#3A290D]">
            궁금했던 이야기들 천천히 꺼내볼까요?
          </h1>

          {/* 섹션: 누구에게 질문 */}
          <SectionCard title="누구에게 질문하고 싶으신가요?" className="rounded-[14px]">
            {targetOptions.length > 0 ? (
              <OptionGroup
                options={targetOptions}
                value={formData.targetRole}
                onChange={handleTargetSelect}
              />
            ) : (
              <div className="text-[#3A290D] text-sm">가족 구성원을 불러올 수 없습니다</div>
            )}
          </SectionCard>

          {/* 섹션: 나를 드러낼까요? */}
          <SectionCard title="나를 드러낼까요?" className="rounded-[14px]">
            <YesNoGroup value={formData.revealAuthor} onChange={handleRevealAuthor} />
          </SectionCard>

          {/* 섹션: 모두에게 공개 */}
          <SectionCard title="질문을 모두에게 공개할까요?" className="rounded-[14px]">
            <YesNoGroup value={formData.publicToAll} onChange={handlePublicToAll} />
          </SectionCard>

          {/* 섹션: 질문 내용 */}
          <SectionCard title="편하게 물어보아요" variant="peach" className="rounded-[14px]">
            <TextAreaField
              label="질문 내용"
              value={formData.content || ''}
              onChange={handleContentChange}
              className="bg-transparent"
            />
          </SectionCard>

          {/* 생성 완료 버튼 */}
          <div className="w-full flex justify-center">
            <PrimaryButton onClick={handleSubmit} disabled={!canSubmit}>
              생성 완료
            </PrimaryButton>
          </div>
        </div>
      </div>

      {/* 하단 푸터 */}
      <Footer />
    </div>
  );
};
