import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import messageImg from "../../assets/message.png";
import ItemCarousel from "../../components/Home/ItemCarousel";
import ProgressBar from "../../components/Home/ProgressBar";
import { useState } from "react";
import SheepCharacter from "../../components/Home/SheepCharacter";

const items = [
  { id: 1, name: "스웨터", currentPoint: 0, maxPoint: 10 },
  { id: 2, name: "양말", currentPoint: 0, maxPoint: 10 },
  { id: 3, name: "슬리퍼", currentPoint: 0, maxPoint: 10 },
  { id: 4, name: "모자", currentPoint: 0, maxPoint: 10 },
  { id: 5, name: "조끼", currentPoint: 0, maxPoint: 10 },
  { id: 6, name: "목도리", currentPoint: 0, maxPoint: 10 },
  { id: 7, name: "인형", currentPoint: 0, maxPoint: 10 },
  { id: 8, name: "리본", currentPoint: 0, maxPoint: 10 },
  { id: 9, name: "장갑", currentPoint: 0, maxPoint: 10 },
  { id: 10, name: "단추", currentPoint: 0, maxPoint: 10 },
];
const Home: React.FC = () => {
  const [itemList, setItemList] = useState(items);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const currentItem = itemList[currentItemIndex];

  const handleAddPoint = () => {
    setItemList((prev) => {
      const updated = [...prev];
      const item = updated[currentItemIndex];

      const next = item.currentPoint + 1;

      if (next >= item.maxPoint) {
        item.currentPoint = item.maxPoint;

        setCurrentItemIndex((idx) => Math.min(idx + 1, updated.length - 1));
      } else {
        item.currentPoint = next;
      }

      return updated;
    });
  };

  return (
    <>
      <div className="w-[390px] h-screen flex flex-col justify-center items-center bg-linear-to-b from-[#FFFFFF] to-[#DBBBA4]">
        <div className="flex flex-col items-start w-full">
          <Header
            className="text-left pl-8 w-full"
            textSize="text-[40px]"
            topLoc="top-[-30px]"
            leftLoc="left-0"
          />
          <ProgressBar
            item={currentItem.name}
            currentPoint={currentItem.currentPoint}
            maxPoint={currentItem.maxPoint}
          />
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-col">
            <img className="w-[9.969rem] h-35.25" src={messageImg}></img>
            <p className="font-gabia -mt-25 z-10 text-[#3A290D] text-[0.75rem]">
              "오늘 내가 가족에게
              <br /> 베푼 작은 친절은?"
            </p>
          </div>
        </div>
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
        <div className="flex gap-5 pt-10 cursor-pointer pb-30">
          <ItemCarousel items={itemList} currentItemIndex={currentItemIndex} />
        </div>
        <button
          onClick={handleAddPoint}
          className="bg-white px-4 py-2 rounded-lg shadow text-sm mb-4"
        >
          +1 테스트
        </button>

        <Footer />
      </div>
    </>
  );
};

export default Home;
