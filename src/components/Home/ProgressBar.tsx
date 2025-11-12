import React from "react";

type progressProps = {
  item: string;
};

const ProgressBar: React.FC<progressProps> = ({ item }) => {
  const test = () => {
    // 프로그레스바가 다 찼는지 확인
    // 다 차면 아이템 이미지 바뀌도록
    // 다 차면 양 이미지도 바뀌도록
    // 아이템은 총 10개로 이루어져 있는데, 아이템마다 게이지 올라가는 속도가 다름. 예를 들어, 아이템 1은 5포인트를 얻어야 프로그레스바가 다 찬 것처럼 보이고, 아이템 2는 10포인트를 얻어야, 아이템 3은 15포인트를 얻어야 다 차도록!
    // 아이템 1 게이지 다 차면 이미지 sheep2로 바뀌고, 아이템 2 게이지 다 차면 이미지 sheep3으로 바뀜
    // 그래서 이 함수에서는 게이지가 찼는지 안 찼는지의 정보를 넘겨주고, 그 정보를 sheepCharacter.tsx에서 받아서 양 이미지를 바꾸도록?
  };

  return (
    <div className="flex flex-col pl-8 text-left gap-2 justify-center pb-10 font-gabia">
      <p className="font-gabia text-[#3A290D] text-[0.9375rem]">
        {item} 완성까지
      </p>
      <button className="w-20 h-7 border" onClick={test}>
        테스트
      </button>
      <div className="w-79.75 h-2 bg-[#FFFFFF] rounded-sm">
        <div className="w-70 h-2 bg-[#BFAD9E] rounded-sm"></div>
      </div>
    </div>
  );
};

export default ProgressBar;
