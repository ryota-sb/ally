import { NextPage } from "next";

import { ProfileData, ProfileInputs } from "types/index";

import Layout from "components/Layout";
import ProfileForm from "components/ProfileForm";

type Props = {
  profile: ProfileData;
};

// フォームの初期値
const defaultValues: ProfileInputs = {
  nickname: "",
  gender: "",
  discord_id: "",
  game_rank: "",
  game_category: "",
  image: { url: "" },
};

const Create: NextPage<Props> = () => {
  return (
    <Layout>
      <ProfileForm defaultValues={defaultValues} />
    </Layout>
  );
};

export default Create;
