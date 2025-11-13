import sheep1 from "../../assets/sheep1.png";
import sheep2 from "../../assets/sheep2.png";
import sheep3 from "../../assets/sheep3.png";
import sheep4 from "../../assets/sheep4.png";
import sheep5 from "../../assets/sheep5.png";
import sheep6 from "../../assets/sheep6.png";
import sheep7 from "../../assets/sheep7.png";
import sheep8 from "../../assets/sheep8.png";
import sheep9 from "../../assets/sheep9.png";
import sheep10 from "../../assets/sheep10.png";
import sheep11 from "../../assets/sheep11.png";

type SheepProps = {
  level: number;
};

const sheepImages = [
  sheep1,
  sheep2,
  sheep3,
  sheep4,
  sheep5,
  sheep6,
  sheep7,
  sheep8,
  sheep9,
  sheep10,
  sheep11,
];

const SheepCharacter: React.FC<SheepProps> = ({ level }) => {
  const index = Math.min(Math.max(level - 1, 0), sheepImages.length - 1);
  const img = sheepImages[index];
  return (
    <div className="w-[12.49263rem] h-[14.925rem]">
      <img className="" src={img} alt={`sheep-${level}`}></img>
    </div>
  );
};

export default SheepCharacter;
