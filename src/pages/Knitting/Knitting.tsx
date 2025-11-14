import knitting1 from "../../assets/knitting1.png";
import knitting2 from "../../assets/knitting2.png";
import knitting3 from "../../assets/knitting3.png";
import { useEffect, useState } from "react";

const Knitting: React.FC = () => {
  const images = [knitting1, knitting2, knitting3];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((i) => {
        const nextIndex = (i + 1) % images.length;
        if (nextIndex === 0) {
          window.location.href = "/todayKindness";
        }
        return nextIndex;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div className="mx-auto w-[390px] h-screen flex flex-col justify-center items-center bg-linear-to-b from-[#FFEADB] to-[#FFFFFF]">
      <p className="font-roundfix text-[#826F5F] text-[1.875rem] pb-10 ">
        {"< knitting >"}
      </p>
      <img
        src={images[currentIndex]}
        className="w-[20.73594rem] h-[27.98906rem]"
      ></img>
    </div>
  );
};

export default Knitting;
