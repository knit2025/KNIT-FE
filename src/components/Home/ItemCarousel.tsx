import React from "react";
import leftBtn from "../../assets/leftBtn.png";
import rightBtn from "../../assets/rightBtn.png";
import Item from "../../components/Home/Item";

const KnitCarousel: React.FC = () => {
  return (
    <div className="flex gap-3">
      <button>
        <img
          className="w-[1.64806rem] h-[1.64806rem] cursor-pointer"
          src={leftBtn}
        ></img>
      </button>
      <Item />
      <Item />
      <Item />
      <Item />
      <button>
        <img
          className="w-[1.64806rem] h-[1.64806rem] cursor-pointer"
          src={rightBtn}
        ></img>
      </button>
    </div>
  );
};

export default KnitCarousel;
