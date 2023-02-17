import { NextPage } from "next";
import { useRouter } from "next/router";

import UserFetcher from "hooks/api/user";

import { User, ProfileData, ProfileInputs } from "types/index";

import { useRecoilValue } from "recoil";
import userState from "recoil/atoms/userState";

import Layout from "components/Layout";
import Loading from "pages/loading";
import ProfileForm from "components/ProfileForm";

type Props = {
  profile: ProfileData;
};

const Edit: NextPage<Props> = () => {
  const router = useRouter();
  const currentUser: User = useRecoilValue(userState);

  const { user, isLoading, isError } = UserFetcher.getUser(currentUser.id);

  // フォームの初期値
  const defaultValues: ProfileInputs = {
    nickname: user?.profile?.nickname,
    gender: user?.profile?.gender,
    discord_id: user?.profile?.discord_id,
    game_rank: user?.profile?.game_rank,
    game_category: user?.profile?.game_category,
    image: { url: user?.profile?.image?.url! },
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>An error has occurred.</div>;

  // ログインユーザーのプロフィールでなければ、ルートへ遷移
  if (currentUser.id !== user?.profile?.user_id) {
    // router.push("/");
    console.log(currentUser.id);
    console.log(user?.profile?.id);
  }

  return (
    <Layout>
      <div>
        <ProfileForm
          profileData={user?.profile}
          defaultValues={defaultValues}
        />
      </div>
    </Layout>
  );
};

export default Edit;
