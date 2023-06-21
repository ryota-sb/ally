import type { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

// Custom SWR
import { getUser } from "hooks/api/user";

// types
import { User } from "types";

// Recoil
import { useRecoilValue } from "recoil";
import userState from "recoil/atoms/userState";

// Components and pages
import Loading from "pages/loading";
import Layout from "components/Layout";

// FontAwesome Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const Profile: NextPage = () => {
  const router = useRouter();

  const currentUser: User = useRecoilValue(userState);

  const { user, isLoading, isError } = getUser(currentUser.id);

  if (isLoading) return <Loading />;
  if (isError) return <div>An error has occurred.</div>;

  // ログインユーザーのプロフィールでなければ、ルートへ遷移
  if (user && currentUser.id !== user.profile?.userId) {
    router.push("/");
  }

  return (
    <Layout>
      {user && user.profile ? (
        <div className="flex min-h-screen flex-col items-center bg-gray-100">
          <div className="flex items-center">
            <h1 className="whitespace-nowrap p-10 text-4xl">プロフィール</h1>

            <Link href={`/profiles/${user.profile.id}/edit`}>
              <FontAwesomeIcon
                size={"xl"}
                icon={faGear}
                className="cursor-pointer"
              />
            </Link>
          </div>

          <div className="flex max-w-2xl flex-col gap-6 rounded-2xl bg-white p-20 shadow-lg shadow-gray-200">
            <div className="relative flex items-center justify-center">
              <div className="h-[200px] w-[200px] md:h-[300px] md:w-[300px]">
                <Image
                  src={user.profile.image?.url!}
                  alt={user.profile.nickname}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
            </div>

            <h2 className="text-center text-4xl">{user.profile.nickname}</h2>
            <div className="flex justify-center gap-3">
              <h3>{user.profile.gameCategory}</h3>
              <h3>{user.profile.gameRank}</h3>
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
