import { useEffect, useState } from "react";
// import React from 'react';
import DotIcon from "../../assets/Ellipse 12.svg";
import PlusIcon from "../../assets/add 2.png";
import Footer from "../../components/Footer/Footer";
import KNITLG from "../../assets/Knit.png";
import "../../styles/Global.css";
import { useNavigate } from "react-router-dom";

//정의
import { getMemoryData } from "../../lib/api/memory";
// import { API_BASE_URL } from '../../config';

//호출
interface Post {
  postId: number;
  text: string;
  image: string;
  date: string;
  createdAt: string;
  userId: number;
}

interface Mission {
  missionId: number;
  title: string;
  text: string;
  missionInstanceId: number;
  image?: string; //추가
  isCompleted: boolean;
  createdAt: string;
  familyId: number;
}

interface FamilyQuestionInstance {
  instanceId: number;
  adminQId: number;
  isCurrent: boolean;
  status: string;
  createdAt: string;
  familyId: number;
}

interface MemoryData {
  counts: { posts: number; missions: number; familyQuestionInstances: number };
  posts: Post[];
  missions: Mission[];
  familyQuestionInstances: FamilyQuestionInstance[];
}

//네비게이션, api 호출
const MissionLog = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<MemoryData | null>(null);
  const [, setLoading] = useState(true);

  const handleClick = () => {
    navigate("/AddPhoto");
  };

const MPhotoClick = (postId: number) => {
  navigate(`/PhotoDetail/${postId}`);
};
const AnsClick = (missionId: number) => {
  navigate(`/AnswerDetail/${missionId}`);
};
const MisstonClick = (missionInstanceId: number) => {
  navigate(`/MissionDetail/${missionInstanceId}`);
};

 // 데이터 로딩 함수 분리

  // const MPhotoClick = (postId: number) => {
  //   navigate(`/PhotoDetail/${postId}`);
  // };
  // const AnsClick = (missionId: number) => {
  //   navigate(`/AnswerDetail/${missionId}`);
  // };
  // const MisstonClick = (missionId: number) => {
  //   navigate(`/MissionDetail/${missionId}`);
  // };

  // const loadData = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await getMemoryData();
  //     console.log("Memory 데이터:", res);
  //     setData(res);
  //   } catch (err) {
  //     console.error("데이터 불러오기 실패:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
    const loadData = async () => {
    setLoading(true);
    try {
      const res = await getMemoryData();

      // missions 배열에 대표 이미지 추가 (userSubmissions 중 첫 번째 있는 이미지)
      const missionsWithImage = res.missions.map((m: any) => ({
        ...m,
        image: m.userSubmissions?.find((u: any) => u.image)?.image || undefined,
      }));

      setData({ ...res, missions: missionsWithImage });
      console.log("Memory 데이터:", { ...res, missions: missionsWithImage });
    } catch (err) {
      console.error("데이터 불러오기 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);


  return (
    <div className="pb-[85px] h-[844px] relative mx-auto w-[390px] bg-white">
      <div className="sticky top-0 bg-white">
      <img
        src={KNITLG}
        alt="KNITLG"
        className="pt-[43px] pl-[33px] w-[100px]"
      />
      <div className="pl-[23px] text-left ml-2 mt-5 mb-[36px] text-[18px] font-semibold text-[#3A290D]">
        우리가족의 소중한 추억
      </div>
      <div className="flex-1 overflow-y-auto">
      <div className="mr-[23px] flex gap-4 justify-end mb-3">
        <div className="flex gap-1 cursor-pointer">
          <img src={DotIcon} alt="DotIcon" className="" />
          <button
            type="button"
            className="cursor-pointer text-left text-[#A9927F] font-bold text-[11px]"
          >
            최신순
          </button>
        </div>
        <div className="flex gap-1 cursor-pointer">
          <img src={DotIcon} alt="DotIcon" className="" />
          <button
            type="button"
            className="cursor-pointer text-left text-[#A9927F] font-bold text-[11px]"
          >
            섞어보기
          </button>
        </div>
      </div>
      </div>

          {/* 작은 카드 */}
          {/* {data?.missions.slice(1).map((m) => (
            <div
              key={m.missionId}
              className="col-span-1 h-[98px] rounded-2xl bg-[#DFC4B1] cursor-pointer"
              onClick={() => AnsClick(m.missionId)}
            >
              <div className="flex items-center h-full p-3">
                <div className="flex flex-col items-start justify-start text-left">
                  <span className="text-[13px] text-[#3A290D]">{m.title}</span>
                  <div className="font-gabia text-[#454343] text-[11px]">
                    {m.text}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
</div>
      {/* 게시물 */}
      {/* 게시물 그리드 */}
      <div className="pr-[23px] pl-[23px] mt-[5px] h-[577px] pb-[17px] overflow-auto">
        <div
          className="grid gap-4 auto-rows-auto"
          style={{
            // 게시물 고정
            gridTemplateColumns: "repeat(3, 104px)",
            gridAutoFlow: "row dense", 
          }}
        >
          {data?.posts.map((p) => (
            <div
              key={p.postId}
              className="col-span-3 h-[120px] rounded-2xl bg-[#F2E7DF] cursor-pointer"
              onClick={() => MPhotoClick(p.postId)}
            >
              <div className="flex items-center h-full p-3">
                <div className="bg-white rounded-2xl w-[150px] text-black h-[98px] flex items-center justify-center mr-3 overflow-hidden">
                  {p.image ? (
                    <img
                      src={`${import.meta.env.VITE_API_BASE_URL}${p.image}`}
                      alt="post"
                      className="w-full h-full object-cover rounded-2xl"
                      onError={() => {
                        console.error("이미지 로드 실패:", p.image);
                      }}
                    />
                  ) : (
                    <div className="text-gray-400">사진</div>
                  )}
                </div>
                <div className="flex flex-col items-start justify-start text-left">
                  <div className="font-semibold text-[13px] text-[#3A290D]">
                    {p.date}
                  </div>
                  <div className="font-gabia text-[#454343] text-[12px]">
                    {p.text}
                  </div>
                </div>
              </div>
            </div>
          ))}

    {/* 중간 카드 */}
{data?.missions.slice(0, 1).map((m) => ( 
  <div key={m.missionId} className="col-span-2 h-24 rounded-2xl bg-[#F3DCCD] cursor-pointer"  onClick={() => MisstonClick(m.missionInstanceId)} >
    <div className="flex items-center h-full p-3">
      <div className="bg-white rounded-2xl text-black w-[110px] h-[75px] flex items-center justify-center mr-3 overflow-hidden">
        {m.image ? (
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}${m.image}`}
            alt="mission"
            className="w-full h-full object-cover rounded-2xl"
            onError={() => console.error("이미지 로드 실패:", m.image)}
          />
        ) : (
          <div className="text-gray-400">사진</div>
        )}
      </div>
      <div className="flex flex-col items-start justify-start text-left">
        <span className="text-[13px] text-[#3A290D]">{m.title}</span>
        <div className="font-gabia text-[#454343] text-[12px]">{m.text}</div>
      </div>
    </div>
  </div>
))}

    {/* 작은 카드 */}
    {data?.missions.slice(1).map((m) => (
  <div 
    key={m.missionId} 
    className="col-span-1 h-[98px] rounded-2xl bg-[#DFC4B1] cursor-pointer"
    onClick={() => {
      if (m.missionInstanceId) {
        // 미션이면 → MissionDetail
        MisstonClick(m.missionInstanceId);
      } else {
        // 답변이면 → AnswerDetail
        AnsClick(m.missionId);
      }
    }}
  >
    <div className="flex items-center h-full p-3">
      <div className="flex flex-col items-start justify-start text-left">
        <span className="text-[13px] text-[#3A290D]">{m.title}</span>
        <div className="font-gabia text-[#454343] text-[11px]">{m.text}</div>
      </div>
    </div>
  </div>
))}

  </div>
</div>
      <button
        type="button"
        className="absolute right-[23px] bottom-[calc(100px+16px)] cursor-pointer z-50"
        onClick={handleClick}
      >
        <img src={PlusIcon} alt="PlusIcon" className="w-[36px] h-[36px]" />
      </button>
      {/* </div> */}
      <div className="bottom-0 left-0 w-full z-40">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default MissionLog;
