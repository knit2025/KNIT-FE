import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import messageImg from "../../assets/message.png";
import sheep1 from "../../assets/sheep1.png";
import knitBall from "../../assets/knit-ball.png";
import KnitCarousel from "../../components/Home/KnitCarousel";

const Home: React.FC = () => {
  const images = Array.from({ length: 10 }, () => knitBall);

  return (
    <>
      <div className="w-[390px] h-screen flex flex-col justify-center items-center bg-linear-to-b from-[#FFFFFF] to-[#DBBBA4]">
        <div className="flex flex-col items-start pt-20 w-full">
          <Header
            className="text-left pl-8 w-full"
            textSize="text-[40px]"
            topLoc="top-[-70px]"
            leftLoc="left-0"
          />
          <div className="flex flex-col pl-8 text-left gap-4 justify-center pb-10 font-gabia">
            <p>스웨터 완성까지</p>
            <div className="w-80 h-3 rounded-2xl bg-white"></div>
          </div>
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
        {/* <div className="flex gap-5 pt-10 cursor-pointer pb-30">
          <img className="w-[3.61913rem] h-[3.5625rem]" src={knitBall}></img>
          <img className="w-[3.61913rem] h-[3.5625rem]" src={knitBall}></img>
          <img className="w-[3.61913rem] h-[3.5625rem]" src={knitBall}></img>
          <img className="w-[3.61913rem] h-[3.5625rem]" src={knitBall}></img>
        </div> */}
        <KnitCarousel images={images} />

        <Footer />
      </div>
    </>
  );
};

export default Home;
