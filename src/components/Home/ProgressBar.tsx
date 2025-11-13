type progressProps = {
  item: string;
  currentPoint: number;
  maxPoint: number;
};

const ProgressBar: React.FC<progressProps> = ({
  item,
  currentPoint,
  maxPoint,
}) => {
  const ratio = Math.min(currentPoint / maxPoint, 1);

  return (
    <div className="flex flex-col pl-8 text-left gap-2 justify-center pb-10 font-gabia">
      <p className="font-gabia text-[#3A290D] text-[0.9375rem]">
        {item} 완성까지
      </p>
      {/* <button className="w-20 h-7 border" onClick={test}>
        테스트
      </button> */}
      <div className="w-79.75 h-2 bg-[#FFFFFF] rounded-sm">
        <div
          className="h-full bg-[#BFAD9E] rounded-sm transition-all duration-300"
          style={{ width: `${ratio * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
