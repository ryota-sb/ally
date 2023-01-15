import { NextPage } from "next";
import { useRouter } from "next/router";

import useSWR from "swr";

import type { Profile } from "types/index";

import Loading from "pages/loading";

const fetcher = (url: string): Promise<Profile> =>
  fetch(url).then((res) => res.json());

const Profile: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(
    id ? `http://localhost:3000/api/v1/profiles/${id}` : null,
    fetcher
  );
  console.log(data);

  if (error) return <div>An error has occurred.</div>;
  if (!data) return <Loading />;

  return <div>{data.game_category}</div>;
};

export default Profile;
