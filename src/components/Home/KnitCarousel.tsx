import React from "react";

type Props = { images: string[] };

const KnitCarousel: React.FC<Props> = ({ images }) => {
  const visible = images.slice(0, 4);

  return (
    <div className="w-[262px] overflow-hidden mx-auto mt-3 mb-6">
      <div className="flex gap-2.5">
        {visible.map((src, i) => (
          <div
            key={i}
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
