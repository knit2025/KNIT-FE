import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

// ── 컴포넌트
import  ProtectedRoute  from "./components/ProtectedRoute";

// ── 로그인 및 회원가입 페이지
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import FamilyCode from "./pages/FamilyCode/FamilyCode";
import SelectRole from "./pages/SelectRole/SelectRole";
import Knitting from "./pages/Knitting/Knitting";
import Kindness from "./pages/TodayKindness/TodayKindness";
import Home from "./pages/Home/Home";

// ── [feature 브랜치] 질문 관련 페이지
import { QuestionListPage } from "./pages/QuestionListPage";
import { QuestionDetailPage } from "./pages/QuestionDetailPage";
import { CreateQuestionPage } from "./pages/CreateQuestionPage";
import { PATHS } from "./routes";

// ── [develop 브랜치] 미션/포토/답변 페이지
import MissionLog from "./pages/MissionLog/MissionLog";
import MissionDetail from "./pages/MissionDetail/MissionDetail";
import PhotoDetail from "./pages/PhotoDetail/PhotoDetail";
import AnswerDetail from "./pages/AnswerDetail/AnswerDetail";
import AddPhoto from "./pages/AddPhoto/AddPhoto";
import { MissionPage } from "./pages/MissionPage";
import { TodayMissionPage } from "./pages/TodayMissionPage";

// 질문 상세 진입 시 location.state를 기대하는 기존 래퍼 (feature 코드 유지)
function QuestionDetailWrapper() {
  const location = useLocation();
  const navigate = useNavigate();
  const question = location.state?.question;

  const handleSubmit = (answer: string) => {
    console.log("답변 제출:", answer);
    // TODO: API 호출 등 실제 저장 로직
    navigate(PATHS.questionList);
  };

  const handleBack = () => {
    navigate(PATHS.questionList);
  };

  if (!question) {
    // 상태 없이 직접 진입한 경우 리스트로 회귀
    navigate(PATHS.questionList);
    return null;
  }

  return (
    <QuestionDetailPage
      question={question}
      onSubmit={handleSubmit}
      onBack={handleBack}
    />
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* 기본 진입은 로그인 화면으로 리다이렉트 (비로그인 사용자용) */}
        <Route path="/" element={<Navigate to="/Login" replace />} />

        {/* 로그인 & 회원가입 - 인증 불필요 */}
        <Route path="/Login" element={
            <Login />
        } />
        <Route path="/SignUp" element={
            <SignUp />
        } />
        <Route path="/FamilyCode" element={
            <FamilyCode />
        } />
        <Route path="/SelectRole" element={
            <SelectRole />
        } />
        <Route path="/SignUp" element={
            <SignUp />
        } />
        <Route path="/Knitting" element={
            <Knitting />
        } />
        {/* 홈 (로그인 필요) */}
        <Route path="/Home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />

        {/* 질문 관련 (로그인 필요) */}
        <Route path={PATHS.questionList} element={
          <ProtectedRoute>
            <QuestionListPage />
          </ProtectedRoute>
        } />
        <Route path={PATHS.createQuestion} element={
          <ProtectedRoute>
            <CreateQuestionPage />
          </ProtectedRoute>
        } />
        <Route path={PATHS.answer()} element={
          <ProtectedRoute>
            <QuestionDetailWrapper />
          </ProtectedRoute>
        } />

        {/* 미션/포토/답변 (로그인 필요) */}
        <Route path={PATHS.mission} element={
          <ProtectedRoute>
            <MissionPage />
          </ProtectedRoute>
        } />
        <Route path={PATHS.todayMission} element={
          <ProtectedRoute>
            <TodayMissionPage />
          </ProtectedRoute>
        } />
        <Route path="/MissionLog" element={
          <ProtectedRoute>
            <MissionLog />
          </ProtectedRoute>
        } />
        <Route path="/MissionDetail/:missionId" element={
          <ProtectedRoute>
            <MissionDetail />
          </ProtectedRoute>
        } />
        <Route path="/PhotoDetail/:postId" element={
          <ProtectedRoute>
            <PhotoDetail />
          </ProtectedRoute>
        } />
        <Route path="/AnswerDetail/:customQId" element={
          <ProtectedRoute>
            <AnswerDetail />
          </ProtectedRoute>
        } />
        <Route path="/AddPhoto" element={
          <ProtectedRoute>
            <AddPhoto />
          </ProtectedRoute>
        } />
        <Route path={PATHS.TodayKindness} element={
          <ProtectedRoute>
            <Kindness />
          </ProtectedRoute>
        } />

        {/* 404 → 기본 로그인 화면으로 */}
        <Route path="*" element={<Navigate to="/Login" replace />} />
      </Routes>
    </Router>
  );
}
export default App;
