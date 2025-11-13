import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import messageImg from "../../assets/message.png";
import sheep1 from "../../assets/sheep1.png";
import ItemCarousel from "../../components/Home/ItemCarousel";
import ProgressBar from "../../components/Home/ProgressBar";

const Home: React.FC = () => {
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
          <ProgressBar item="니트" currentPoint={10} maxPoint={10} />
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
          <img className="w-[13.79544rem]" src={sheep1}></img>
        </div>
        <div className="flex gap-5 pt-10 cursor-pointer pb-30">
          <ItemCarousel />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Home;
