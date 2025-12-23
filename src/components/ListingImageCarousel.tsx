import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Image = {
  url: string;
};

type Props = {
  images: Image[];
};

const ListingImageCarousel = ({ images }: Props) => {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="h-80 bg-muted flex items-center justify-center text-4xl rounded-md">
        📦
      </div>
    );
  }

  const prev = () =>
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () =>
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="space-y-3">
      {/* MAIN IMAGE */}
      <div className="relative h-80 rounded-md overflow-hidden bg-muted">
        <img
          src={images[index].url}
          alt={`Listing image ${index + 1}`}
          className="w-full h-full object-contain"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* THUMBNAILS */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-16 w-16 rounded-md overflow-hidden border ${
                i === index ? "border-honey" : "border-transparent"
              }`}
            >
              <img
                src={img.url}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListingImageCarousel;
