import useSWR from "swr";
import { ChatRoom } from "types";

import { useRecoilValue } from "recoil";
import tokenState from "recoil/atoms/tokenState";

class ChatRoomFetcher {
  // 全てのチャットルーム取得
  static getChatRooms() {
    const token = useRecoilValue(tokenState);
    const { data, error } = useSWR<ChatRoom[]>(
      "http://localhost:3000/api/v1/chat_rooms",
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
  }

  // 渡されたIDのチャットルームを取得
  static getChatRoom(id: number) {
    const token = useRecoilValue(tokenState);
    const { data, error } = useSWR<ChatRoom>(
      `http://localhost:3000/api/v1/chat_rooms/${id}`,
      (url) =>
        fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then(
          (res) => res.json()
        )
    );

    return {
      chatRoom: data,
      isLoading: !error && !data,
      isError: error,
    };
  }
}

export default ChatRoomFetcher;
