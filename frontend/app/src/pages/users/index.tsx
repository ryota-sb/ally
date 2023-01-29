import { NextPage } from "next";
import Image from "next/image";

import useSWR from "swr";

import Loading from "pages/loading";
import XCircle from "components/XCircle";
import CheckCircle from "components/CheckCircle";

import { ProfileData } from "types/index";

import { useRecoilValue } from "recoil";
import tokenState from "recoil/atoms/tokenState";
import profileState from "recoil/atoms/profileState";

const Users: NextPage = () => {
  const token = useRecoilValue(tokenState);
  const profileValue = useRecoilValue(profileState);

  const fetcher = (url: string): Promise<ProfileData> =>
    fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then((res) =>
      res.json()
    );

  const { data, error } = useSWR("http://localhost:3000/api/v1/users", fetcher);

  if (error) return <div>An error has occurred.</div>;
  if (!data) return <Loading />;

  return (
    <div>
      {profileValue ? (
        <div className="flex h-screen w-full items-center justify-center bg-gray-100">
          <div className="flex h-4/5 w-2/5 flex-col items-center justify-center rounded-2xl bg-white p-10 shadow-lg shadow-gray-200">
            <div className="m-10">
              <Image
                src="/113120.jpeg"
                alt="サンプル画像"
                width={300}
                height={300}
                className="rounded-full object-cover"
              />
            </div>
            <h2 className="mb-4 text-4xl">{data.nickname}</h2>
            <div className="flex gap-3">
              <div>{data.game_category}</div>
              <div>{data.game_rank}</div>
              <div>{data.image?.url}</div>
            </div>
            <div className="mt-40 flex gap-8">
              <button>
                <XCircle size={60} />
              </button>
              <button>
                <CheckCircle size={60} />
              </button>
            </div>
          </div>
        </div>
      ) : !token ? (
        <Loading />
      ) : (
        <div className="flex h-screen w-screen flex-col items-center justify-center">
          <h1 className="text-3xl">初めにプロフィール作成してください</h1>
          <button className="m-10">
            <a
              href="/profiles/new"
              className="group relative inline-block rounded px-5 py-2.5 font-medium text-white"
            >
              <span className="absolute top-0 left-0 h-full w-full rounded bg-gradient-to-br from-purple-600 to-blue-500 opacity-50 blur-sm filter"></span>
              <span className="absolute inset-0 mt-0.5 ml-0.5 h-full w-full rounded bg-gradient-to-br from-purple-600 to-blue-500 opacity-50 filter group-active:opacity-0"></span>
              <span className="absolute inset-0 h-full w-full rounded bg-gradient-to-br from-purple-600 to-blue-500 shadow-xl filter transition-all duration-200 ease-out group-hover:blur-sm group-active:opacity-0"></span>
              <span className="absolute inset-0 h-full w-full rounded bg-gradient-to-br from-blue-500 to-purple-600 transition duration-200 ease-out"></span>
              <span className="relative">新規作成</span>
            </a>
          </button>
        </div>
      )}
    </div>
  );
};

export default Users;
