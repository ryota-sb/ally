import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";

// Custom SWR
import { getChatRoom } from "hooks/api/chat_room";

// swr type
import { KeyedMutator } from "swr";

// Components and pages
import MessageForm from "components/MessageForm";
import Layout from "components/Layout";
import Loading from "pages/loading";

import type { ChatRoomData } from "types";

// サーバーサイトでURLパラメータに含まれるID部分を取得（クライアントサイドでは、ページリロードすると値を維持できないため）
export const getServerSideProps: GetServerSideProps = async (context) => {
  const chatRoomId = context.query.id;
  return {
    props: { chatRoomId },
  };
};

// ページコンポーネントに値を渡すための型定義
type Props = {
  chatRoomId: number;
};

// useSWRで取得したデータの型
type ChatRoomFetchData = {
  chatRoom?: ChatRoomData;
  isLoading: boolean;
  isError: boolean;
  mutate: KeyedMutator<ChatRoomData>;
};

const ChatRoom: NextPage<Props> = ({ chatRoomId }) => {
  const { chatRoom, isLoading, isError, mutate }: ChatRoomFetchData =
    getChatRoom(chatRoomId);

  // CurrentUserのメッセージならtrueを返す
  const isCurrentUserMessage = (messageUserId: number) => {
    return chatRoom?.otherUser.id !== messageUserId;
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>error...</div>;

  return (
    <Layout>
      {chatRoom && (
        <div className="min-h-screen bg-gray-100 p-4">
          <div className="mx-auto max-w-sm md:max-w-md lg:max-w-lg">
            <div className="flex justify-center p-10">
              <Image
                src={chatRoom.otherUser.profile?.image?.url!}
                alt={chatRoom.otherUser.profile?.nickname}
                width={70}
                height={70}
                className="rounded-full object-cover"
              />
              <h1 className="p-4 text-center text-3xl">
                {chatRoom.otherUser.profile?.nickname}
              </h1>
            </div>

            <div className="h-[800px] rounded-t-2xl bg-white p-4">
              {chatRoom.messages.map((message, index) => (
                <div key={index}>
                  {isCurrentUserMessage(message.userId) ? (
                    <div className="flex justify-end">
                      <div className="m-2 max-w-[200px] rounded-md bg-indigo-200 p-2">
                        <p className="break-words">{message.content}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-start">
                      <Image
                        src={chatRoom.otherUser.profile?.image?.url!}
                        alt={chatRoom.otherUser.profile?.nickname}
                        width={60}
                        height={60}
                        className="rounded-full object-cover"
                      />
                      <div className="m-2 max-w-[200px] rounded-md bg-gray-200 p-2">
                        <p className="break-words">{message.content}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <MessageForm id={chatRoomId} mutate={mutate} />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ChatRoom;
