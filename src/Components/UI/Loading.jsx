import { FadeLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className=" isolate aspect-video h-screen bg-primary-color/40 backdrop-blur w-full flex justify-center items-center">
      <FadeLoader color="#6A0DAD" />
    </div>
  );
};

export default Loading;
