import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const ImagePreviewer = ({ image, msg, userData, imgHeight }) => {
  if (!image) return null;

  return (
    <PhotoProvider>
      <div className={`w-32 ${imgHeight ? `h-[${imgHeight}px]` : "h-auto"}`}>
        <PhotoView src={image}>
          <img
            loading="lazy"
            src={image}
            alt="Image"
            height={500}
            width={500}
            className={`cursor-pointer h-32 object-cover object-top rounded-md border border-[#F9DD40] ${
              msg?.sender?._id === userData?.userId ||
              msg?.sender?.toString() === userData?.userId
                ? "order-last"
                : "order-first"
            }`}
          />
        </PhotoView>
      </div>
    </PhotoProvider>
  );
};

export default ImagePreviewer;
