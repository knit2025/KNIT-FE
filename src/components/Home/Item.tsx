import knitImg from "../../assets/knit-ball.png";
import item1 from "../../assets/item1.png";
import item2 from "../../assets/item2.png";
import item3 from "../../assets/item3.png";
import item4 from "../../assets/item4.png";
import item5 from "../../assets/item5.png";
import item6 from "../../assets/item6.png";
import item7 from "../../assets/item7.png";
import item8 from "../../assets/item8.png";
import item9 from "../../assets/item9.png";
import item10 from "../../assets/item10.png";

type ItemProps = {
  id: number;
  name: string;
  isCompleted: boolean;
  isActive?: boolean;
};

const itemImages = [
  item1,
  item2,
  item3,
  item4,
  item5,
  item6,
  item7,
  item8,
  item9,
  item10,
];

const Item: React.FC<ItemProps> = ({ id, name, isCompleted, isActive }) => {
  const index = Math.max(0, Math.min(id - 1, itemImages.length - 1));
  const displayImg = isCompleted ? itemImages[index] : knitImg;
  return (
    <div
      className={`flex flex-col items-center transition-transform ${
        isActive ? "scale-110" : "scale-100"
      }`}
    >
      <img className="w-13 h-13" src={displayImg} alt={name} />{" "}
      {isCompleted && (
        <p className="mt-1 text-[#3A290D] text-[0.625rem] font-gabia">{name}</p>
      )}
    </div>
  );
};

export default Item;
