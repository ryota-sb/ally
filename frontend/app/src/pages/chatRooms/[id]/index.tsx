import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

import ChatRoomFetcher from "hooks/api/chat_room";

import Layout from "components/Layout";
import Loading from "pages/loading";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const ChatRoom: NextPage = () => {
  const router = useRouter();

  const { chatRoom, isLoading, isError } = ChatRoomFetcher.getChatRoom(id);

  if (isLoading) return <Loading />;
  if (isError) return <div>error...</div>;

  return (
    <Layout>
      <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
        <div className="w-full max-w-lg">
          <h1 className="p-4 text-center text-3xl">Chat Room</h1>
          <div style={{ height: 900 }} className="w-full bg-white p-4">
            <div className="flex justify-start">
              <Image
                src="/113120.jpeg"
                width={60}
                height={60}
                className="rounded-full object-cover"
              />
              <h1 className="m-2 rounded-md bg-gray-200 p-2">
                OtherUser: Hello World
              </h1>
            </div>
            <div className="flex justify-end">
              <h1 className="m-2 rounded-md bg-indigo-200 p-2">
                CurrentUser: Hello World
              </h1>
            </div>
            <div className="flex justify-start">
              <Image
                src="/113120.jpeg"
                width={60}
                height={60}
                className="rounded-full object-cover"
              />
              <h1 className="m-2 rounded-md bg-gray-200 p-2">
                OtherUser: Hello World
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
    </Layout>
  );
};

export default ChatRoom;
