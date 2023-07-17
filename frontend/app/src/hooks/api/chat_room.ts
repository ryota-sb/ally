// SWR
import useSWR from "swr";

// BasePath
import getBasePath from "lib/getBasePath";

// types
import { ChatRoomData } from "types";

// Cookie
import { parseCookies } from "nookies";

// 全てのチャットルーム取得
const getChatRooms = () => {
  const accessToken = parseCookies().accessToken;
  const { data, error } = useSWR<ChatRoomData[]>(
    `${getBasePath()}/api/v1/chat_rooms`,
    (url) =>
      fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } }).then(
        (res) => res.json()
      )
  );

  return {
    chatRooms: data,
    isLoading: !error && !data,
    isError: error,
  };
};

// 渡されたIDのチャットルームを取得
const getChatRoom = (id: number) => {
  const accessToken = parseCookies().accessToken;
  const { data, error, mutate } = useSWR<ChatRoomData>(
    `${getBasePath()}/api/v1/chat_rooms/${id}`,
    (url) =>
      fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } }).then(
        (res) => res.json()
      )
  );

  return {
    chatRoom: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export { getChatRooms, getChatRoom };
