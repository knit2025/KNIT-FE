import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import messageImg from "../../assets/message.png";
import ItemCarousel from "../../components/Home/ItemCarousel";
import ProgressBar from "../../components/Home/ProgressBar";
import SheepCharacter from "../../components/Home/SheepCharacter";
import axios from "axios";
import { useState, useEffect } from "react";

const baseURL = import.meta.env.VITE_API_BASE_URL;

type TodayQuestion = {
  instanceId: number;
  content: string;
  isCurrent: boolean;
  status: string;
  answeredUsers: string[];
  totalMembers: number;
};

type CharacterProgress = {
  familyId: number;
  familyCode: string;
  totalPoints: number;
  completedItems: number;
  currentItem: string;
  inItemPoints: number;
  inItemProgress: number;
  items: string[];
};

type ItemType = {
  id: number;
  name: string;
  currentPoint: number;
  maxPoint: number;
};

const Home: React.FC = () => {
  const [todayQuestion, setTodayQuestion] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const [itemList, setItemList] = useState<ItemType[]>([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const hasItems = itemList.length > 0;
  const currentItem = hasItems ? itemList[currentItemIndex] : null;

  // 오늘의 질문 (/home/today-question)
  useEffect(() => {
    const fetchTodayQuestion = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get<TodayQuestion>(
          `${baseURL}/home/today-question`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTodayQuestion(res.data.content);
      } catch (err) {
        console.error("오늘의 질문 불러오기 실패:", err);
        setTodayQuestion("오늘의 질문을 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchTodayQuestion();
  }, []);

  // 캐릭터 진척도 (/home/character)
  useEffect(() => {
    const fetchCharacterProgress = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const res = await axios.get<CharacterProgress>(
          `${baseURL}/home/character`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = res.data;
        const maxPointPerItem = 10;

        const apiItems: ItemType[] = data.items.map((name, index) => {
          let currentPoint = 0;

          // 이미 완성된 아이템들
          if (index < data.completedItems) {
            currentPoint = maxPointPerItem;
          }
          // 현재 진행 중인 아이템
          else if (index === data.completedItems) {
            const fromPoints = data.inItemPoints ?? 0;
            const fromProgress = Math.round(
              (data.inItemProgress ?? 0) * maxPointPerItem
            );
            currentPoint = fromPoints > 0 ? fromPoints : fromProgress;
          }

          return {
            id: index + 1,
            name,
            currentPoint,
            maxPoint: maxPointPerItem,
          };
        });

        setItemList(apiItems);

        // 현재 진행 중인 아이템 인덱스
        const idx = Math.min(
          data.completedItems,
          Math.max(apiItems.length - 1, 0)
        );
        setCurrentItemIndex(idx);
      } catch (err) {
        console.error("캐릭터 진척도 불러오기 실패:", err);
      }
    };

    fetchCharacterProgress();
  }, []);

  return (
    <>
      <div className="relative mx-auto w-[390px] h-screen flex flex-col justify-center items-center bg-linear-to-b from-[#FFFFFF] to-[#DBBBA4]">
        <div className="flex flex-col items-start w-full">
          <Header
            className="text-left pl-8 w-full"
            textSize="text-[40px]"
            topLoc="top-[-30px]"
            leftLoc="left-0"
          />
          {hasItems && currentItem && (
            <ProgressBar
              item={currentItem.name}
              currentPoint={currentItem.currentPoint}
              maxPoint={currentItem.maxPoint}
            />
          )}
        </div>

        {/* 오늘의 질문 말풍선 */}
        <div className="flex flex-col items-center">
          <div className="flex flex-col">
            <img className="w-[9.969rem] h-35.25" src={messageImg} />
            <p className="w-[9.5rem] font-gabia -mt-24 pl-1 z-10 text-[#3A290D] text-[0.75rem]">
              {loading ? "질문 불러오는 중..." : `" ${todayQuestion} "`}
            </p>
          </div>
        </div>

        {/* 양 캐릭터 */}
        {hasItems && currentItem && (
          <div className="flex pt-20">
            <SheepCharacter
              level={
                currentItemIndex === itemList.length - 1 &&
                currentItem.currentPoint === currentItem.maxPoint
                  ? 11
                  : currentItemIndex + 1
              }
            />
          </div>
        )}

        {/* 아이템 캐러셀 */}
        {hasItems && (
          <div className="flex gap-5 pt-10 cursor-pointer pb-30">
            <ItemCarousel
              items={itemList}
              currentItemIndex={currentItemIndex}
            />
          </div>
        )}

        <Footer />
      </div>
    </>
  );
};

export default Home;
