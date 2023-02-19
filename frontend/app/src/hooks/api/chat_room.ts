import useSWR from "swr";
import { ChatRoom } from "types";

import { useRecoilValue } from "recoil";
import tokenState from "recoil/atoms/tokenState";

class ChatRoomFetcher {
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
      chat_rooms: data,
      isLoading: !error && !data,
      isError: error,
    };
  }
}

export default ChatRoomFetcher;
