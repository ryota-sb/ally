import { NextPage } from "next";
import Image from "next/image";

import useSWR from "swr";

import Loading from "pages/loading";
import Layout from "components/Layout";
import XCircle from "components/XCircle";
import CheckCircle from "components/CheckCircle";

import { Profile } from "types/index";

import { useRecoilValue } from "recoil";
import tokenState from "recoil/atoms/tokenState";

const Users: NextPage = () => {
  const token = useRecoilValue(tokenState);

  const fetcher = (url: string): Promise<Profile> =>
    fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then((res) =>
      res.json()
    );

  const { data, error } = useSWR("http://localhost:3000/api/v1/users", fetcher);
  console.log(data);

  if (error) return <div>An error has occurred.</div>;
  if (!data) return <Loading />;

  return (
    <Layout>
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
    </Layout>
  );
};

export default Users;
