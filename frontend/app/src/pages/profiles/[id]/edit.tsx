import { NextPage } from "next";
import { useRouter } from "next/router";

// Custom SWR
import { getUser } from "hooks/api/user";

// types
import { User, ProfileData, ProfileInputs } from "types";

// Recoil
import { useRecoilValue } from "recoil";
import userState from "recoil/atoms/userState";

// Compoents and pages
import Layout from "components/Layout";
import ProfileForm from "components/ProfileForm";
import Loading from "pages/loading";

type Props = {
  profile: ProfileData;
};

const Edit: NextPage<Props> = () => {
  const router = useRouter();
  const currentUser: User = useRecoilValue(userState);

  const { user, isLoading, isError } = getUser(currentUser.id);

  // フォームの初期値
  const defaultValues: Partial<ProfileInputs> = {
    nickname: user?.profile?.nickname,
    gender: user?.profile?.gender,
    discordId: user?.profile?.discordId,
    gameRank: user?.profile?.gameRank,
    gameCategory: user?.profile?.gameCategory,
    image: { url: user?.profile?.image?.url! },
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>An error has occurred.</div>;

  // ログインユーザーのプロフィールでなければ、ルートへ遷移
  if (currentUser.id !== user?.profile?.userId) {
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
