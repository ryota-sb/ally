// SWR
import useSWR from "swr";

// BasePath
import getBasePath from "lib/getBasePath";

// types
import type { UserLikes } from "types";

// Recoil
import { useRecoilValue } from "recoil";
import tokenState from "recoil/atoms/tokenState";

const useUserLikes = () => {
  const token = useRecoilValue(tokenState);
  const { data, error } = useSWR<UserLikes>(
    `${getBasePath()}/api/v1/likes`,
    (url) =>
      fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then(
        (res) => res.json()
      )
  );

  return {
    userLikes: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export { useUserLikes };
