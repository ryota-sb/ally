import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

// Custom SWR
import { getChatRooms } from "hooks/api/chat_room";

// Components and pages
import Loading from "pages/loading";
import Layout from "components/Layout";

const ChatRooms: NextPage = () => {
  const { chatRooms, isLoading, isError } = getChatRooms();

  if (isLoading) return <Loading />;
  if (isError) return <div>error...</div>;

  return (
    <Layout>
      {chatRooms && chatRooms.length > 0 ? (
        <div className="flex min-h-screen flex-col items-center bg-gray-100">
          <h1 className="p-10 text-4xl">Chat Rooms</h1>
          {chatRooms.map((chat_room) => (
            <div
              key={chat_room.chatRoom.id}
              className="flex w-1/2 flex-col divide-y divide-gray-200"
            >
              <Link href={`/chatRooms/${chat_room.chatRoom.id}`}>
                <div className="m-4 flex cursor-pointer gap-6 rounded-2xl bg-white p-8">
                  <Image
                    src={chat_room.otherUserProfile.image?.url!}
                    alt="サンプル画像"
                    width={100}
                    height={100}
                    className="rounded-full object-cover"
                  />

                  <div className="flex flex-col items-start justify-center gap-3">
                    <h1 className="text-3xl">
                      {chat_room.otherUserProfile.nickname}
                    </h1>
                    <h1>{chat_room.otherUserProfile.gameCategory}</h1>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-screen w-screen items-center justify-center">
          <h1 className="text-xl">現在、マッチングした相手がいません。</h1>
        </div>
      )}
    </Layout>
  );
};

export default ChatRooms;
