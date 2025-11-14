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

export const CreateQuestionPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<CreateQuestionForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [targetOptions, setTargetOptions] = useState<{ label: string; value: QuestionTarget }[]>([]);
  const [loading, setLoading] = useState(true);
  // ID → role 매핑 저장 (API 호출 시 사용)
  const [idToRoleMap, setIdToRoleMap] = useState<Map<string, string>>(new Map());

  // 가족 구성원 정보 가져오기
  useEffect(() => {
    const fetchFamilyMembers = async () => {
      try {
        setLoading(true);
        const currentUser = getCurrentUser();
        const familyData = await getFamily();

        // ID → role 매핑 생성
        const mapping = new Map<string, string>();

        // 자기 자신을 제외한 가족 구성원의 역할 추출
        // 고유한 user ID를 value로 사용하여 중복 키 방지
        const options: { label: string; value: QuestionTarget }[] = familyData.users
          .filter(user => user.id !== currentUser?.id) // 자기 자신 제외
          .map(user => {
            const userId = user.id.toString();
            mapping.set(userId, user.role);
            return {
              label: user.role,
              value: userId as QuestionTarget, // ID를 고유 키로 사용
            };
          });

        // "모두에게" 옵션을 마지막에 추가
        options.push({ label: "모두에게", value: "모두에게" });
        mapping.set("모두에게", "None");

        setTargetOptions(options);
        setIdToRoleMap(mapping);
      } catch (error) {
        console.error('가족 정보 불러오기 실패:', error);
        // 에러 시 기본 옵션 사용
        const defaultMap = new Map<string, string>();
        defaultMap.set("모두에게", "None");
        setTargetOptions([{ label: "모두에게", value: "모두에게" }]);
        setIdToRoleMap(defaultMap);
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
      // ID → role 변환
      // "모두에게"는 그대로 "None"으로, 그 외는 매핑에서 role 조회
      const role = idToRoleMap.get(formData.targetRole);
      if (!role) {
        throw new Error('선택한 대상의 역할을 찾을 수 없습니다');
      }

      const result = await createQuestion(
        role, // 매핑된 role 사용 (예: "엄마", "아빠", "None")
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
  }, [formData, navigate, isSubmitting, idToRoleMap]);

  const canSubmit = useMemo(() => {
    return Boolean(formData.targetRole && formData.content?.trim());
  }, [formData.targetRole, formData.content]);

  // role 옵션 개수에 따른 카드 높이 계산
  // 한 줄에 최대 4개, 버튼 높이 24px, gap 18px 고려
  const targetCardHeight = useMemo(() => {
    const optionCount = targetOptions.length;
    if (optionCount === 0) return 79;

    // 한 줄에 4개씩 배치
    const rows = Math.ceil(optionCount / 4);
    // 기본 패딩 + (버튼 높이 24px * 줄 수) + (줄 간격 18px * (줄 수 - 1))
    const baseHeight = 80; // 상하 패딩
    const buttonHeight = 24;
    const gap = 18;

    return baseHeight + (buttonHeight * rows) + (gap * Math.max(0, rows - 1));
  }, [targetOptions.length]);

  // 각 섹션의 동적 위치 계산
  const sectionPositions = useMemo(() => {
    const titleTop = 131;
    const firstSectionTop = 190;
    const sectionGap = 15; // 섹션 간 간격

    return {
      title: titleTop,
      targetRole: firstSectionTop,
      revealAuthor: firstSectionTop + targetCardHeight + sectionGap,
      publicToAll: firstSectionTop + targetCardHeight + sectionGap + 79 + sectionGap,
      content: firstSectionTop + targetCardHeight + sectionGap + 79 + sectionGap + 79 + sectionGap,
      button: firstSectionTop + targetCardHeight + sectionGap + 79 + sectionGap + 79 + sectionGap + 188 + 18,
    };
  }, [targetCardHeight]);

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
        <div className="absolute inset-x-0 top-0 bottom-[140px] scroll-container">

          {/* 제목 */}
          <h1
            className="absolute left-[30px] text-[20px] font-semibold text-[#3A290D]"
            style={{ top: `${sectionPositions.title}px` }}
          >
            궁금했던 이야기들 천천히 꺼내볼까요?
          </h1>

          {/* 섹션: 누구에게 질문 - 동적 높이 */}
          <div
            className="absolute left-[25px] w-[340px]"
            style={{
              top: `${sectionPositions.targetRole}px`,
              height: `${targetCardHeight}px`
            }}
          >
            <SectionCard title="누구에게 질문하고 싶으신가요?" className="rounded-[14px] h-full">
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
          </div>

          {/* 섹션: 나를 드러낼까요 - 79px 높이 */}
          <div
            className="absolute left-[25px] w-[340px] h-[79px]"
            style={{ top: `${sectionPositions.revealAuthor}px` }}
          >
            <SectionCard title="나를 드러낼까요?" className="rounded-[14px] h-full">
              <YesNoGroup value={formData.revealAuthor} onChange={handleRevealAuthor} />
            </SectionCard>
          </div>

          {/* 섹션: 모두에게 공개 - 79px 높이 */}
          <div
            className="absolute left-[25px] w-[340px] h-[79px]"
            style={{ top: `${sectionPositions.publicToAll}px` }}
          >
            <SectionCard title="질문을 모두에게 공개할까요?" className="rounded-[14px] h-full">
              <YesNoGroup value={formData.publicToAll} onChange={handlePublicToAll} />
            </SectionCard>
          </div>

          {/* 섹션: 질문 내용 - 188px 높이 */}
          <div
            className="absolute left-[25px] w-[340px] h-[188px]"
            style={{ top: `${sectionPositions.content}px` }}
          >
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
          <div
            className="absolute left-[46px] w-[298px] h-[40px]"
            style={{ top: `${sectionPositions.button}px` }}
          >
            <PrimaryButton onClick={handleSubmit} disabled={!canSubmit}>
              생성 완료
            </PrimaryButton>
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
