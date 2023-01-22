import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import useSWR from "swr";

import { User, ProfileData, ProfileInputs } from "types/index";

import { useRecoilValue } from "recoil";
import tokenState from "recoil/atoms/tokenState";
import userState from "recoil/atoms/userState";

import Layout from "components/Layout";
import Loading from "pages/loading";
import ProfileForm from "components/ProfileForm";

type Props = {
  profile: ProfileData;
};

const Edit: NextPage<Props> = () => {
  const token = useRecoilValue(tokenState);
  const currentUser: User = useRecoilValue(userState);

  const router = useRouter();
  const { id } = router.query;

  const fetcher = (url: string): Promise<ProfileData> =>
    fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then((res) =>
      res.json()
    );

  const { data, error } = useSWR(
    id ? `http://localhost:3000/api/v1/profiles/${id}` : null,
    fetcher
  );

  // ログインユーザーのプロフィールでなければ、ルートへ遷移
  useEffect(() => {
    if (!currentUser || currentUser.id !== data?.user_id) {
      router.push("/");
    }
  });

  // フォームの初期値
  const defaultValues: ProfileInputs = {
    nickname: data?.nickname,
    gender: data?.gender,
    discord_id: data?.discord_id,
    game_rank: data?.game_rank,
    game_category: data?.game_category,
    image: { url: data?.image?.url },
  };

  if (error) return <div>An error has occurred.</div>;
  if (!data) return <Loading />;

  return (
    <Layout>
      <div>
        <ProfileForm profileData={data} defaultValues={defaultValues} />
      </div>
    </Layout>
  );
};

export default Edit;
