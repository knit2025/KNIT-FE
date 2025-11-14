import leftBtn from "../../assets/leftBtn.png";
import rightBtn from "../../assets/rightBtn.png";
import Item from "../../components/Home/Item";

type ItemData = {
  id: number;
  name: string;
  currentPoint: number;
  maxPoint: number;
};

type CarouselProps = {
  items: ItemData[];
  currentItemIndex: number;
};

const ItemCarousel: React.FC<CarouselProps> = ({ items, currentItemIndex }) => {
  const [startIndex, setStartIndex] = React.useState(0);
  const lastStartIndex = items.length - 4;
  const canGoLeft = startIndex > 0;

  const visibleItems = items.slice(startIndex, startIndex + 4);

  const allVisibleCompleted = visibleItems.every(
    (item) => item.currentPoint >= item.maxPoint
  );

  const canGoRight = startIndex < lastStartIndex && allVisibleCompleted;

  const handlePrev = () => {
    if (canGoLeft) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNext = () => {
    if (canGoRight) {
      setStartIndex(startIndex + 1);
    }
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={handlePrev}
        disabled={!canGoLeft}
        className={canGoLeft ? "" : "opacity-50"}
      >
        <img
          className="w-[1.64806rem] h-[1.64806rem] cursor-pointer"
          src={leftBtn}
        ></img>
      </button>
      {visibleItems.map((item, index) => {
        const globalIndex = startIndex + index;
        const isCompleted = item.currentPoint >= item.maxPoint;
        const isActive = globalIndex === currentItemIndex;
        return (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            isCompleted={isCompleted}
            isActive={isActive}
          />
        );
      })}
      <button
        onClick={handleNext}
        disabled={!canGoRight}
        className={canGoRight ? "" : "opacity-50"}
      >
        <img
          className="w-[1.64806rem] h-[1.64806rem] cursor-pointer"
          src={rightBtn}
        ></img>
      </button>
    </div>
  );
};

export default ItemCarousel;
