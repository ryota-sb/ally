import { NextPage } from "next";

const Loading: NextPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="m-4 text-4xl">Loading</div>
      <div className="mt-6 flex space-x-2">
        <div className="h-1 w-1 animate-ping rounded-full bg-black"></div>
        <div className="h-1 w-1 animate-ping rounded-full bg-black animation-delay-200"></div>
        <div className="h-1 w-1 animate-ping rounded-full bg-black animation-delay-400"></div>
      </div>
    </div>
  );
};

export default Loading;
