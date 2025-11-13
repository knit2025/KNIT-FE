import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
// import './App.css';

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
import { TempPage } from "./pages/TempPage";
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
        {/* 기본 진입은 로그인 화면으로 리다이렉트*/}
        <Route path="/" element={<Navigate to="/Login" replace />} />

        {/* 로그인 & 회원가입 */}
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/FamilyCode" element={<FamilyCode />} />
        <Route path="/SelectRole" element={<SelectRole />} />
        <Route path="/Knitting" element={<Knitting />} />
        <Route path="/Kindness" element={<Kindness />} />
        <Route path="/Home" element={<Home />} />

        {/* 질문 관련(feature) */}
        <Route path={PATHS.questionList} element={<QuestionListPage />} />
        <Route path={PATHS.createQuestion} element={<CreateQuestionPage />} />
        <Route path={PATHS.temp} element={<TempPage />} />
        <Route path={PATHS.answer()} element={<QuestionDetailWrapper />} />

        {/* 미션/포토/답변(develop) */}
        <Route path={PATHS.mission} element={<MissionPage />} />
        <Route path={PATHS.todayMission} element={<TodayMissionPage />} />
        <Route path="/MissionLog" element={<MissionLog />} />
        <Route path="/MissionDetail" element={<MissionDetail />} />
        <Route path="/PhotoDetail" element={<PhotoDetail />} />
        <Route path="/AnswerDetail" element={<AnswerDetail />} />
        <Route path="/AddPhoto" element={<AddPhoto />} />

        {/* 404 → 기본 로그인 화면으로 */}
        <Route path="*" element={<Navigate to="/Login" replace />} />
      </Routes>
    </Router>
  );
}
export default App;
