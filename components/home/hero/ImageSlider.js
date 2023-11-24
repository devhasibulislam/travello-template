/**
 * Title: Write a program using JavaScript on ImageSlider
 * Author: Hasibul Islam
 * Portfolio: https://devhasibulislam.vercel.app
 * Linkedin: https://linkedin.com/in/devhasibulislam
 * GitHub: https://github.com/in/devhasibulislam
 * Facebook: https://facebook.com/in/devhasibulislam
 * Instagram: https://instagram.com/in/devhasibulislam
 * Twitter: https://twitter.com/in/devhasibulislam
 * Pinterest: https://pinterest.com/in/devhasibulislam
 * WhatsApp: https://wa.me/8801906315901
 * Telegram: devhasibulislam
 * Date: 17, August 2023
 */

// import Image from "next/image";
import LoadImage from "@/components/shared/image/LoadImage";
// import Tooltip from "@/components/shared/tooltip/Tooltip";
import { useState, useEffect } from "react";

const ImageSlider = ({ images, delay }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, delay);

    return () => clearInterval(interval);
  }, [images.length, delay]);

  return (
    <div className="relative max-w-[364px] h-[512px] overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute max-w-[364px] h-[512px] transition-transform duration-1000 transform ${
            index === currentImageIndex ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <LoadImage
            src={image}
            alt={`Image ${index + 1}`}
            height={512}
            width={364}
            className="max-w-[364px] h-[512px] object-cover rounded border border-primary"
            title="Dimension: 364x512"
          />
        </div>
      ))}

      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {images.map((_, i) => (
            <div
              key={i}
              className={`
              transition-all w-3 h-3 bg-white rounded-full
              ${currentImageIndex === i ? "p-2" : "bg-opacity-50"}
            `}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
