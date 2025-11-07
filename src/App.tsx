import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { QuestionListPage } from './pages/QuestionListPage';
import { QuestionDetailPage } from './pages/QuestionDetailPage';
import { CreateQuestionPage } from './pages/CreateQuestionPage';
import { TempPage } from './pages/TempPage';
import { PATHS } from './routes';

function QuestionDetailWrapper() {
  const location = useLocation();
  const navigate = useNavigate();
  const question = location.state?.question;

  const handleSubmit = (answer: string) => {
    console.log('답변 제출:', answer);
    // 실제로는 API 호출하여 답변 저장
    navigate(PATHS.questionList);
  };

  const handleBack = () => {
    navigate(PATHS.questionList);
  };

  if (!question) {
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
        <Route path="/" element={<Navigate to={PATHS.questionList} replace />} />
        <Route path={PATHS.questionList} element={<QuestionListPage />} />
        <Route path={PATHS.createQuestion} element={<CreateQuestionPage />} />
        <Route path={PATHS.temp} element={<TempPage />} />
        <Route path={PATHS.answer()} element={<QuestionDetailWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;
