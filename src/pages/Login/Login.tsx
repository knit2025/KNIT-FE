import InputField from "../../components/Login/InputField";
import Button from "../../components/Login/Button";
import sheepImg from "../../assets/LoginSheep.png";
import knitLogo from "../../assets/login-knit-logo.png";
import "../../styles/Global.css";
import axios from "axios";
import { useState } from "react";
import { getFamily, type FamilyMember } from "../../api/family";
import { useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginId(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      setErrorMessage(null);
      const response = await axios.post(`${baseURL}/accounts/login`, {
        loginId,
        password,
      });
      const { access, loginId: returnedId } = response.data || {};

      if (!access) {
        throw new Error("access 토큰이 없습니다.");
      }
      localStorage.setItem("accessToken", access);
      if (returnedId) {
        localStorage.setItem("loginId", returnedId);
      }

      // 백엔드가 사용자 정보를 함께 반환하는 경우 저장 (선택적, 안전하게 처리)
      // 예: { user: { id, name, nickname, role, birth } } 또는 { role: "아들" }
      try {
        const user = (response.data && (response.data.user || response.data.profile)) || null;
        const role = (response.data && (response.data.role || (user && user.role))) || null;
        if (user) {
          // 필요한 필드만 저장
          const compact = {
            id: user.id,
            name: user.name,
            nickname: user.nickname,
            role: user.role,
            birth: user.birth,
          };
          localStorage.setItem("user", JSON.stringify(compact));
        }
        if (role) {
          localStorage.setItem("user_role", String(role));
        }
      } catch { /* noop: 응답 포맷이 달라도 앱은 동작 */ }

      // 로그인 후 가족 정보 불러와 id→role 매핑 저장
      try {
        const family = await getFamily();
        const map: Record<number, string> = {};
        family.users.forEach((u: FamilyMember) => {
          map[u.id] = u.role;
        });
        localStorage.setItem("userRoleMap", JSON.stringify(map));

        // 현재 사용자 ID도 저장 시도 (loginId 매칭되는 항목이 있으면)
        const loginIdStored = localStorage.getItem("loginId");
        const me = (family.users as Array<FamilyMember & { loginId?: string }>).find(
          (u) => u.loginId === loginIdStored
        );
        if (me?.id != null) localStorage.setItem("currentUserId", String(me.id));
      } catch (e) {
        console.warn("가족 정보 저장 스킵:", e);
      }

      setLoginId("");
      setPassword("");
      navigate("/Home");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const detail = error.response?.data?.detail;
        if (status === 400) {
          const message = detail || "";
          setErrorMessage(message);
        } else {
          setErrorMessage("로그인에 실패했습니다.");
        }
      }
    }
  };

  const goToSignUp = () => {
    navigate("/SignUp");
  };

  return (
    <div className="relative mx-auto w-[390px] h-screen flex flex-col justify-center items-center bg-linear-to-b from-[#FFFFFF] to-[#DBBBA4]">
      <div className="flex flex-col items-center text-center mt-20 mb-10 space-y-1">
        <p className="text-[#3A290D] text-base font-sans font-bold">
          가족 사이의 마음과 마음을 잇는
        </p>
        <img src={knitLogo} alt="Sheep" className="w-25 h-6.25 mt-2 mb-10" />
        <img src={sheepImg} alt="Sheep" className="p-2" />
      </div>
      <div className="-mt-45">
        <div className="space-y-3 font-sans font-normal">
          <InputField
            type="text"
            fieldName="아이디 입력"
            value={loginId}
            onChange={handleId}
          ></InputField>
          <InputField
            type="password"
            fieldName="비밀번호 입력"
            value={password}
            onChange={handlePassword}
          ></InputField>
        </div>
        {errorMessage && (
          <p className="mt-3 text-xs text-red-500 font-sans">{errorMessage}</p>
        )}
        <div className=" flex flex-col gap-4 space-y-2 font-sans font-bold mt-4 mb-20 ">
          <Button buttonName="로그인" onClick={handleLogin}></Button>
          <Button buttonName="회원가입" onClick={goToSignUp}></Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
