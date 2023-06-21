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
        <div className="min-h-screen bg-gray-100">
          <div className="mx-auto max-w-2xl">
            <h1 className="p-10 text-center text-4xl">Chat Rooms</h1>
            {chatRooms.map((chatRoomItem) => (
              <div key={chatRoomItem.chatRoom.id} className="flex flex-col">
                <Link href={`/chatRooms/${chatRoomItem.chatRoom.id}`}>
                  <div className="m-4 flex cursor-pointer gap-6 rounded-2xl bg-white p-8">
                    <Image
                      src={chatRoomItem.otherUser.profile?.image?.url!}
                      alt={chatRoomItem.otherUser.profile?.nickname}
                      width={100}
                      height={100}
                      className="rounded-full object-cover"
                    />

                    <div className="flex flex-col items-start justify-center gap-3">
                      <h2 className="text-3xl">
                        {chatRoomItem.otherUser.profile?.nickname}
                      </h2>
                      <h2>{chatRoomItem.otherUser.profile?.gameCategory}</h2>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
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
