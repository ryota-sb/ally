import { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";

import { useAuth0 } from "@auth0/auth0-react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { Profile } from "types/index";
import tokenState from "recoil/atoms/tokenState";

import Layout from "components/Layout";
import RedirectToLogin from "components/RedirectToLogin";

type Props = {};

const CreateProfile: NextPage<Props> = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  const [previewImage, setPreviewImage] = useState("/noimage.png");

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const fileObject = e.target.files[0];
    setPreviewImage(window.URL.createObjectURL(fileObject));
  };

  const token = useRecoilValue(tokenState);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Profile>({
    mode: "onChange",
    defaultValues: {
      nickname: "",
      gender: "",
      discord_id: "",
      game_rank: "",
      game_category: "",
      image: "",
    },
  });

  const onSubmit = async (data: Profile) => {
    await axios
      .post("http://localhost:3000/api/v1/profiles", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
      })
      .then((err) => {
        console.log(err);
      });
    router.push("/");
  };

  return (
    <Layout>
      {isAuthenticated ? (
        <div className="flex h-screen w-screen flex-col items-center justify-center">
          <h1 className="mb-10 text-3xl">プロフィール設定</h1>
          <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              {/* nickname */}
              <div className="mb-6 flex">
                <div className="flex w-1/3 items-center">
                  <label className="mb-1 pr-4 font-bold text-gray-500">
                    ユーザー名
                  </label>
                </div>
                <div className="w-2/3">
                  <input
                    {...register("nickname", { required: true })}
                    className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
                  />
                  {errors.nickname && (
                    <div className="text-red-500">入力が必須の項目です。</div>
                  )}
                </div>
              </div>
              {/* gender */}
              <div className="mb-6 flex">
                <div className="flex w-1/3 items-center">
                  <label className="mb-1 pr-4 font-bold text-gray-500">
                    性別
                  </label>
                </div>
                <div className="w-2/3">
                  <input
                    {...register("gender", { required: true })}
                    className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
                  />
                  {errors.gender && (
                    <div className="text-red-500">入力が必須の項目です。</div>
                  )}
                </div>
              </div>
              {/* discord_id */}
              <div className="mb-6 flex">
                <div className="flex w-1/3 items-center">
                  <label className="mb-1 pr-4 font-bold text-gray-500">
                    Discord ID
                  </label>
                </div>
                <div className="w-2/3">
                  <input
                    {...register("discord_id")}
                    className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
              {/* game_rank */}
              <div className="mb-6 flex">
                <div className="flex w-1/3 items-center">
                  <label className="mb-1 pr-4 font-bold text-gray-500">
                    ゲーム内ランク
                  </label>
                </div>
                <div className="w-2/3">
                  <input
                    {...register("game_rank")}
                    className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
              {/* game_category */}
              <div className="mb-6 flex">
                <div className="flex w-1/3 items-center">
                  <label className="mb-1 pr-4 font-bold text-gray-500">
                    ゲームの種類
                  </label>
                </div>
                <div className="w-2/3">
                  <input
                    {...register("game_category")}
                    className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
              {/* image */}
              <div className="mb-6 flex">
                <div className="flex w-1/3 items-center">
                  <label className="mb-1 pr-4 text-sm font-bold text-gray-500 md:mb-0 md:text-right">
                    プロフィール画像
                  </label>
                </div>
                <div className="w-2/3">
                  <input
                    type="file"
                    accept="image/*"
                    {...register("image")}
                    onChange={onFileInputChange}
                    className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
              {/* image preview */}
              <Image
                src={previewImage}
                alt="プレビュー画像"
                width={500}
                height={500}
                className="m-auto h-2/5 border-2 border-solid border-black object-contain"
              />
              <div className="flex items-center">
                <div className="w-1/3"></div>
                <div className="w-2/3">
                  <button
                    className="focus:shadow-outline rounded bg-purple-500 py-2 px-4 font-bold text-white shadow hover:bg-purple-400 focus:outline-none"
                    type="submit"
                  >
                    登録
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        <RedirectToLogin />
      )}
    </Layout>
  );
};

export default CreateProfile;
