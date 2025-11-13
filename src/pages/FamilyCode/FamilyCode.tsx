const FamilyCode: React.FC = () => {
  return (
    <div className="w-[390px] h-screen flex flex-col justify-center items-center bg-[#D7BCA8]">
      <div className="flex flex-col justify-center items-center w-81 h-47.25 rounded-[1.46875rem] bg-[#F8ECE3] gap-4">
        <p className="text-[#846F5E] text-[1.875rem] font-roundfix">
          Family code
        </p>
        <div className="flex items-center justify-center w-69.5 h-11.5 rounded-xl bg-[#FFF]">
          <p className="text-[#3A290D] font-sans text-[0.875rem] font-semibold">
            F3RT0Y
          </p>
        </div>
        <p className="text-[#846F5E] font-sans text-[0.625rem]">
          가족과 연결하려면 코드가 필요해요! 가족에게 코드를 공유해주세요.
        </p>
      </div>
      <div className="flex w-81 justify-end mr-7">
        <div className="flex justify-center items-center rounded-[50%] w-6 h-5.75 bg-[#F8ECE3] text-[#846F5E] text-[1.25rem] font-roundfix mt-4 cursor-pointer">
          <p>x</p>
        </div>
      </div>
    </div>
  );
};

export default FamilyCode;
