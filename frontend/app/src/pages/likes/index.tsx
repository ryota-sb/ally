import { type NextPage } from "next";
import Image from "next/image";

// Custom SWR
import { useUserLikes } from "hooks/api/like";

import { useState, useEffect } from "react";

// Components and pages
import Loading from "pages/loading";
import Layout from "components/Layout";

const Likes: NextPage = () => {
  const [isActiveLikes, setIsActiveLikes] = useState(true);
  const { userLikes, isLoading, isError } = useUserLikes();

  useEffect(() => {
    console.log(userLikes);
  });

  if (isLoading) return <Loading />;
  if (isError) return <div>error...</div>;

  // いいねした/されたユーザーを切り替えて表示
  const renderLikeUsers = () => {
    const likes = isActiveLikes
      ? userLikes?.activeLikedUser
      : userLikes?.passiveLikedUser;
    const likesLength = isActiveLikes
      ? userLikes?.activeLikedUserLength
      : userLikes?.passiveLikedUserLength;

    if (likesLength === 0) {
      return (
        <div className="flex h-screen w-screen items-center justify-center">
          <h1 className="text-xl">
            {isActiveLikes
              ? "いいねしたユーザーは、まだいません。"
              : "いいねしてくれたユーザーは、まだいません。"}
          </h1>
        </div>
      );
    }

    return (
      <>
        {likes && (
          <div className="mx-auto max-w-2xl">
            <h1 className="p-10 text-center text-4xl">
              {isActiveLikes
                ? `いいねしたユーザー (${likesLength})`
                : `いいねしてくれたユーザー (${likesLength})`}
            </h1>
            {likes.map((likeUser) => (
              <div key={likeUser.id} className="flex flex-col">
                <div className="m-4 flex cursor-pointer gap-6 rounded-2xl bg-white p-8">
                  <Image
                    src={likeUser.profile?.image?.url!}
                    alt={likeUser.profile?.nickname}
                    width={100}
                    height={100}
                    className="rounded-full object-cover"
                  />

                  <div className="flex flex-col items-start justify-center gap-3">
                    <h2 className="text-3xl">{likeUser.profile?.nickname}</h2>
                    <h2>{likeUser.profile?.gameCategory}</h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        <div className="grid grid-cols-2 bg-gray-300">
          <button
            onClick={() => setIsActiveLikes(true)}
            className={isActiveLikes ? "bg-gray-400" : ""}
          >
            いいねしたユーザー
          </button>
          <button
            onClick={() => setIsActiveLikes(false)}
            className={!isActiveLikes ? "bg-gray-400" : ""}
          >
            いいねしてくれたユーザー
          </button>
        </div>

        {<>{renderLikeUsers()}</>}
      </div>
    </Layout>
  );
};

export default Likes;
