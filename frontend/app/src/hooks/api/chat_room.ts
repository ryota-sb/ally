// SWR
import useSWR from "swr";

// BasePath
import getBasePath from "lib/getBasePath";

// types
import { ChatRoomData } from "types";

// Recoil
import { useRecoilValue } from "recoil";
import tokenState from "recoil/atoms/tokenState";

// 全てのチャットルーム取得
const getChatRooms = () => {
  const token = useRecoilValue(tokenState);
  const { data, error } = useSWR<ChatRoomData[]>(
    `${getBasePath()}/api/v1/chat_rooms`,
    (url) =>
      fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then(
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
  const token = useRecoilValue(tokenState);
  const { data, error, mutate } = useSWR<ChatRoomData>(
    `${getBasePath()}/api/v1/chat_rooms/${id}`,
    (url) =>
      fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then(
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
