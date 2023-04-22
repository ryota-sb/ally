import { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

// Custom SWR
import UserFetcher from "hooks/api/user";

// types
import { User } from "types";

// Recoil
import { useRecoilValue } from "recoil";
import userState from "recoil/atoms/userState";

// Components and pages
import Loading from "pages/loading";
import Layout from "components/Layout";

const Profile: NextPage = () => {
  const router = useRouter();

  const currentUser: User = useRecoilValue(userState);

  const { user, isLoading, isError } = UserFetcher.getUser(currentUser.id);

  if (isLoading) return <Loading />;
  if (isError) return <div>An error has occurred.</div>;

  // ログインユーザーのプロフィールでなければ、ルートへ遷移
  if (user && currentUser.id !== user?.profile?.user_id) {
    router.push("/");
  }

  return (
    <Layout>
      {user && user.profile ? (
        <div className="flex h-screen w-full items-center justify-center bg-gray-100">
          <div className="flex h-4/5 w-2/5 flex-col items-center justify-center rounded-2xl bg-white p-10 shadow-lg shadow-gray-200">
            <Link href={`/profiles/${user.profile.id}/edit`}>Setting</Link>
            <div className="m-10">
              <Image
                src={user.profile.image?.url!}
                alt="サンプル画像"
                width={300}
                height={300}
                className="rounded-full object-cover"
              />
            </div>
            <h2 className="mb-4 text-4xl">{user.profile.nickname}</h2>
            <div className="flex gap-3">
              <div>{user.profile.game_category}</div>
              <div>{user.profile.game_rank}</div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </Layout>
  );
};

export default Profile;
