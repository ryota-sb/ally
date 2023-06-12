import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";

// Custom SWR
import { getChatRoom } from "hooks/api/chat_room";

// type
import { ChatRoomData } from "types";

// swr type
import { KeyedMutator } from "swr";

// Components and pages
import MessageForm from "components/MessageForm";
import Layout from "components/Layout";
import Loading from "pages/loading";

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
  // CurrentUserのメッセージならtrueを返す
  const isCurrentUserMessage = (messageUserId: number) => {
    return chatRoom?.otherUser.id !== messageUserId;
  };

  const { chatRoom, isLoading, isError, mutate }: ChatRoomFetchData =
    getChatRoom(chatRoomId);

  if (isLoading) return <Loading />;
  if (isError) return <div>error...</div>;

  return (
    <Layout>
      {chatRoom && (
        <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
          <div className="w-full max-w-lg">
            <div className="mb-6 flex justify-center">
              <Image
                src={chatRoom.otherUserProfile.image?.url!}
                width={70}
                height={70}
                className="rounded-full object-cover"
              />
              <h1 className="p-4 text-center text-3xl">
                {chatRoom.otherUserProfile.nickname}
              </h1>
            </div>
            <div style={{ height: 900 }} className="w-full bg-white p-4">
              {chatRoom.messages.map((message, index) => (
                <div key={index}>
                  {isCurrentUserMessage(message.userId) ? (
                    <div className="flex justify-end">
                      <h1 className="m-2 rounded-md bg-indigo-200 p-2">
                        {message.content}
                      </h1>
                    </div>
                  ) : (
                    <div className="flex justify-start">
                      <Image
                        src={chatRoom?.otherUserProfile.image?.url!}
                        width={60}
                        height={60}
                        className="rounded-full object-cover"
                      />
                      <h1 className="m-2 rounded-md bg-gray-200 p-2">
                        {message.content}
                        {/* {chatRoom.other_user_profile.nickname} */}
                      </h1>
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
