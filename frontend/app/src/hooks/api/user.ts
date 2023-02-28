import useSWR from "swr";
import { User } from "types";

import { useRecoilValue } from "recoil";
import tokenState from "recoil/atoms/tokenState";

class UserFetcher {
  // ランダムでユーザーを1人取得
  static getRandomUser() {
    const token = useRecoilValue(tokenState);
    const { data, error } = useSWR<User>(
      "http://localhost:3000/api/v1/random_user_with_profile",
      (url) =>
        fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then(
          (res) => res.json()
        ),
      // ページタブ移動、またはページフォーカスした際にデータを再検証しないように設定
      { revalidateOnFocus: false, revalidateOnReconnect: false }
    );

    return {
      user: data,
      isLoading: !error && !data,
      isError: error,
    };
  }

  // 渡されたIDのユーザーを取得
  static getUser(id: number) {
    const token = useRecoilValue(tokenState);
    const { data, error } = useSWR<User>(
      `http://localhost:3000/api/v1/users/${id}`,
      (url) =>
        fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then(
          (res) => res.json()
        )
    );

    return {
      user: data,
      isLoading: !error && !data,
      isError: error,
    };
  }
}

export default UserFetcher;
