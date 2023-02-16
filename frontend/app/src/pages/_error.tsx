import { NextPage, NextPageContext } from "next";
import Link from "next/link";

type Props = {
  statusCode: number;
};

const Error: NextPage<Props> = ({ statusCode }) => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-100">
      <h1 className="text-9xl font-extrabold tracking-widest text-black">
        {statusCode}
      </h1>
      <div className="absolute rotate-12 rounded bg-[#2598d5] px-2 text-sm">
        Page Not Found
      </div>
      <button className="group relative mt-5 inline-block text-sm font-medium text-[#2598d5] focus:outline-none focus:ring active:text-[#2598d5]">
        <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-[#2598d5] transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>

        <span className="relative block border border-current bg-black px-8 py-3">
          <Link href="/">Go Home</Link>
        </span>
      </button>
    </div>
  );
};

Error.getInitialProps = async ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode ?? 500 : 404;
  return { statusCode };
};

export default Error;
