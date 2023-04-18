import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

// react hook form
import { useForm, SubmitHandler } from "react-hook-form";

// Custom SWR
import ChatRoomFetcher from "hooks/api/chat_room";

import { Message, MessageInputs, ChatRoomData } from "types";

import Layout from "components/Layout";
import Loading from "pages/loading";

// FontAwesome Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

// サーバーサイトでURLパラメータに含まれるID部分を取得（クライアントサイドでは、ページリロードすると値を維持できないため）
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  return {
    props: { id },
  };
};

// ページコンポーネントに値を渡すための型定義
type Props = {
  id: number;
};

// useSWRで取得したデータの型
type ChatRoomFetchData = {
  chatRoom?: ChatRoomData;
  isLoading: boolean;
  isError: boolean;
};

const ChatRoom: NextPage<Props> = ({ id }) => {
  const router = useRouter();

  const { chatRoom, isLoading, isError }: ChatRoomFetchData =
    ChatRoomFetcher.getChatRoom(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MessageInputs>({
    mode: "onChange",
    defaultValues: { content: "" },
  });

  const onSubmit: SubmitHandler<Message> = () => {};

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
              ))}
              {/* <div className="flex justify-start">
              <Image
                src={chatRoom?.other_user_profile.image?.url!}
                width={60}
                height={60}
                className="rounded-full object-cover"
              />
              <h1 className="m-2 rounded-md bg-gray-200 p-2">
                OtherUser: Hello World
                {chatRoom?.other_user_profile.nickname}
              </h1>
            </div> */}
              <div className="flex justify-end">
                <h1 className="m-2 rounded-md bg-indigo-200 p-2">
                  CurrentUser: Hello World
                </h1>
              </div>
              <div className="flex justify-end">
                <h1 className="m-2 rounded-md bg-indigo-200 p-2">
                  CurrentUser: Hello World
                </h1>
              </div>
            </div>
            <form className="w-full">
              <div className="flex">
                <input
                  type="text"
                  className="flex-1 rounded-b-lg border-2 py-2 px-4 focus:border-indigo-200 focus:outline-none"
                />
                <button className="bg-indigo-200 px-4">
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ChatRoom;
