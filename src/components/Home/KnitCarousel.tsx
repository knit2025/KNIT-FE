import React from "react";

type Props = { images: string[] };

const KnitCarousel: React.FC<Props> = ({ images }) => {
  const len = images.length;
  const [start, setStart] = React.useState(0);
  const [shift, setShift] = React.useState(0);
  const visibleCount = 4;

  const visible = Array.from({ length: visibleCount }, (_, i) => {
    const idx = (start + i) % len;
    return images[idx];
  });

  const handleClick = (idx: number) => {
    setShift(-70 * idx);
    setTimeout(() => {
      setStart((prev) => (prev + idx) % len);
      setShift(0);
    }, 250);
  };

  return (
    <div className="w-[262px] overflow-hidden mx-auto mt-3 mb-6">
      <div
        className="flex gap-2.5 transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(${shift}px)` }}
      >
        {visible.map((src, i) => (
          <div
            key={i}
            onClick={() => handleClick(i)}
            className="w-[58px] h-[58px] rounded-xl flex items-center justify-center"
          >
            <img
              src={src}
              alt={`item-${i + 1}`}
              className="w-[58px] h-[58px] object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default KnitCarousel;
