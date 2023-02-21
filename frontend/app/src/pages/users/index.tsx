import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

import UserFetcher from "hooks/api/user";

import { useRecoilValue } from "recoil";
import profileState from "recoil/atoms/profileState";
import tokenState from "recoil/atoms/tokenState";
import userState from "recoil/atoms/userState";

import Loading from "pages/loading";
import XCircle from "components/XCircle";
import CheckCircle from "components/CheckCircle";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Like, User } from "types";

const Users: NextPage = () => {
  const router = useRouter();

  const token = useRecoilValue(tokenState);
  const currentUser = useRecoilValue(userState);
  const profileValue = useRecoilValue(profileState);

  // ログインユーザー（自分）以外のユーザーをランダムで一人取得
  const { user, isLoading, isError } = UserFetcher.getRandomUser();

  const createLike = async (user: User, is_like: boolean) => {
    const response = await fetch("http://localhost:3000/api/v1/likes", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from_user_id: currentUser.id,
        to_user_id: user?.profile?.user_id,
        is_like: is_like,
      }),
    });
    const data: Like = await response.json();
    is_like
      ? toast.success(`${user.profile?.nickname} をいいねしました!!`)
      : toast.success(`次のユーザーを表示します...`);
    setTimeout(() => {
      router.reload();
    }, 2000);
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>An error has occurred.</div>;

  return (
    <div>
      {user && user.profile && profileValue ? (
        // プロフィールが登録されている場合の表示
        <div className="flex h-screen w-full items-center justify-center bg-gray-100">
          <div className="flex h-4/5 w-2/5 flex-col items-center justify-center rounded-2xl bg-white p-10 shadow-lg shadow-gray-200">
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
            <div className="mt-40 flex gap-8">
              <button onClick={() => createLike(user, false)}>
                <XCircle size={60} />
              </button>

              <button onClick={() => createLike(user, true)}>
                <CheckCircle size={60} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        // プロフィールが登録されていない場合の表示
        <div className="flex h-screen w-screen flex-col items-center justify-center">
          <h1 className="text-3xl">初めにプロフィール作成してください</h1>
          <button className="m-10">
            <a
              href="/profiles/new"
              className="group relative inline-block rounded px-5 py-2.5 font-medium text-white"
            >
              <span className="absolute top-0 left-0 h-full w-full rounded bg-gradient-to-br from-purple-600 to-blue-500 opacity-50 blur-sm filter"></span>
              <span className="absolute inset-0 mt-0.5 ml-0.5 h-full w-full rounded bg-gradient-to-br from-purple-600 to-blue-500 opacity-50 filter group-active:opacity-0"></span>
              <span className="absolute inset-0 h-full w-full rounded bg-gradient-to-br from-purple-600 to-blue-500 shadow-xl filter transition-all duration-200 ease-out group-hover:blur-sm group-active:opacity-0"></span>
              <span className="absolute inset-0 h-full w-full rounded bg-gradient-to-br from-blue-500 to-purple-600 transition duration-200 ease-out"></span>
              <span className="relative">新規作成</span>
            </a>
          </button>
        </div>
      )}
    </div>
  );
};

export default Users;
