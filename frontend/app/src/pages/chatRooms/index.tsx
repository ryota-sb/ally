import { NextPage } from "next";
import Image from "next/image";

import useSWR from "swr";

import { ChatRoom } from "types/index";

import Loading from "pages/loading";
import Layout from "components/Layout";

import { useRecoilValue } from "recoil";
import tokenState from "recoil/atoms/tokenState";

const ChatRooms: NextPage = () => {
  const token = useRecoilValue(tokenState);

  const fetcher = (url: string): Promise<ChatRoom[]> =>
    fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then((res) =>
      res.json()
    );

  const { data, error } = useSWR(
    "http://localhost:3000/api/v1/chat_rooms",
    fetcher
  );

  if (error) return <div>An error has occurred.</div>;
  if (!data) return <Loading />;

  return (
    <Layout>
      {data.length > 0 ? (
        <div className="flex min-h-screen flex-col items-center bg-gray-100">
          <h1 className="p-10 text-4xl">Chat Rooms</h1>
          {data.map((room) => (
            <div className="flex w-1/2 flex-col divide-y divide-gray-200">
              <div className="flex gap-6 rounded-2xl bg-white p-8">
                <Image
                  src="/113120.jpeg"
                  alt="サンプル画像"
                  width={100}
                  height={100}
                  className="rounded-full object-cover"
                />

                <div className="flex flex-col items-start justify-center gap-3">
                  <h1 className="text-3xl">
                    {room.other_user_profile.nickname}
                  </h1>
                  <h1>{room.other_user_profile.game_category}</h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>現在、マッチングした相手がいません。</div>
      )}
    </Layout>
  );
};

export default ChatRooms;
