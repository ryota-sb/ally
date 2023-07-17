// SWR
import useSWR from "swr";

// BasePath
import getBasePath from "lib/getBasePath";

// types
import type { UserLikes } from "types";

// Cookie
import { parseCookies } from "nookies";

const useUserLikes = () => {
  const accessToken = parseCookies().accessToken;
  const { data, error } = useSWR<UserLikes>(
    `${getBasePath()}/api/v1/likes`,
    (url) =>
      fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } }).then(
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
