import { NextPage } from "next";

// types
import { ProfileData, ProfileInputs } from "types";

// Recoil
import { useRecoilValue } from "recoil";
import profileState from "recoil/atoms/profileState";

// Client Side execution
import { useClient } from "hooks/useClient";

// Components
import Layout from "components/Layout";
import ProfileForm from "components/ProfileForm";

type Props = {
  profile: ProfileData;
};

const Create: NextPage<Props> = () => {
  const profileValue = useRecoilValue(profileState);
  const isClient = useClient();

  // フォームの初期値
  const defaultValues: Partial<ProfileInputs> = {
    nickname: "",
    gender: undefined,
    discordId: "",
    gameRank: "",
    gameCategory: "",
    image: { url: "" },
  };

  return (
    <Layout>
      {isClient && (
        <div>
          {profileValue ? (
            <div className="flex h-screen w-screen flex-col items-center justify-center">
              <h1 className="text-3xl">プロフィールは、作成済です。</h1>
              <button>プロフィール更新へ</button>
            </div>
          ) : (
            <ProfileForm defaultValues={defaultValues} />
          )}
        </div>
      )}
    </Layout>
  );
};

export default Create;
