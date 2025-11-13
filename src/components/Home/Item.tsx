import React from "react";
import knitImg from "../../assets/knit-ball.png";
// import item1 from '../../assets/item1.png'
// import item2 from '../../assets/item2.png'
// import item3 from '../../assets/item3.png'
// import item4 from '../../assets/item4.png'
// import item5 from '../../assets/item5.png'
// import item6 from '../../assets/item6.png'
// import item7 from '../../assets/item7.png'
// import item8 from '../../assets/item8.png'
// import item9 from '../../assets/item9.png'
// import item10 from '../../assets/item10.png'

const Item: React.FC = () => {
  return (
    <div>
      <img className="w-13 h-13" src={knitImg}></img>
      {/* <div className="flex flex-col">
        <img></img>
        <p className="text-[#3A290D] text-[0.625rem] font-gabia">{itemName}</p>
    </div> */}
    </div>
  );
};

export default Item;
