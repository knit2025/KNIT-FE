import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { QuestionListPage } from './pages/QuestionListPage';
import { QuestionDetailPage } from './pages/QuestionDetailPage';
import { CreateQuestionPage } from './pages/CreateQuestionPage';

function QuestionDetailWrapper() {
  const location = useLocation();
  const navigate = useNavigate();
  const question = location.state?.question;

  const handleSubmit = (answer: string) => {
    console.log('답변 제출:', answer);
    // 실제로는 API 호출하여 답변 저장
    navigate('/');
  };

  const handleBack = () => {
    navigate('/');
  };

  if (!question) {
    navigate('/');
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
        <Route path="/" element={<QuestionListPage />} />
        <Route path="/question/create" element={<CreateQuestionPage />} />
        <Route path="/question/:id/answer" element={<QuestionDetailWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;
