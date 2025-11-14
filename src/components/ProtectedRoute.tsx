import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

/**
 * 로그인이 필요한 페이지를 보호하는 컴포넌트
 * localStorage에 accessToken이 있으면 children을 렌더링하고,
 * 없으면 로그인 페이지로 리다이렉트합니다.
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    // 토큰이 없으면 로그인 페이지로 리다이렉트
    return <Navigate to="/Login" replace />;
  }

  // 토큰이 있으면 요청한 페이지를 렌더링
  return children;
};