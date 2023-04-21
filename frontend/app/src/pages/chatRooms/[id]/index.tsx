import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";

// Custom SWR
import ChatRoomFetcher from "hooks/api/chat_room";

// types
import { ChatRoomData } from "types";

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
};

const ChatRoom: NextPage<Props> = ({ chatRoomId }) => {
  // CurrentUserのメッセージならtrueを返す
  const isCurrentUserMessage = (messageUserId: number) => {
    return chatRoom?.other_user.id !== messageUserId;
  };

  const { chatRoom, isLoading, isError }: ChatRoomFetchData =
    ChatRoomFetcher.getChatRoom(chatRoomId);

  if (isLoading) return <Loading />;
  if (isError) return <div>error...</div>;

  return (
    <Layout>
      {chatRoom && (
        <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
          <div className="w-full max-w-lg">
            <h1 className="p-4 text-center text-3xl">
              {chatRoom.other_user_profile.nickname}
            </h1>
            <div style={{ height: 900 }} className="w-full bg-white p-4">
              {chatRoom.messages.map((message) => (
                <div>
                  {isCurrentUserMessage(message.user_id) ? (
                    <div className="flex justify-end">
                      <h1 className="m-2 rounded-md bg-indigo-200 p-2">
                        {message.content}
                      </h1>
                    </div>
                  ) : (
                    <div className="flex justify-start">
                      <Image
                        src={chatRoom?.other_user_profile.image?.url!}
                        width={60}
                        height={60}
                        className="rounded-full object-cover"
                      />
                      <h1 className="m-2 rounded-md bg-gray-200 p-2">
                        {message.content}
                        {chatRoom.other_user_profile.nickname}
                      </h1>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <MessageForm id={chatRoomId} />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ChatRoom;
