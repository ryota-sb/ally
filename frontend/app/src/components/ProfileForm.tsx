import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import axios from "axios";

import { ProfileData, ProfileInputs } from "../types/index";
import { useForm, SubmitHandler } from "react-hook-form";

import { useRecoilValue } from "recoil";
import tokenState from "recoil/atoms/tokenState";

type Props = {
  profileData?: ProfileData;
  defaultValues: ProfileInputs;
};

const ProfileForm = (props: Props) => {
  const router = useRouter();

  const profile = props?.profileData;
  const isProfile = !profile;

  const defaultValues = props?.defaultValues;

  const [previewImage, setPreviewImage] = useState("/noimage.png");

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const fileObject = e.target.files[0].name;
    console.log(fileObject);
    setPreviewImage(fileObject);
    console.log(window.URL.createObjectURL(fileObject));
  };

  // ReactHookFormのuseForm関数を定義
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileInputs>({
    mode: "onChange",
    defaultValues: defaultValues,
  });

  // プロフィールデータがあるかどうかで、リクエストを変更する
  const onSubmit: SubmitHandler<ProfileInputs> = (profileInputData) => {
    return isProfile
      ? createProfile(profileInputData)
      : updateProfile(profile.id, profileInputData);
  };

  // headerに認証トークンをセットして返す
  const setConfig = async () => {
    const token = await useRecoilValue(tokenState);
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    return config;
  };

  // プロフィールを新規作成、ルートディレクトリへ遷移
  const createProfile = async (profileInputData: ProfileInputs) => {
    const config = await setConfig();
    const res = await axios
      .post(
        "http://localhost:3000/api/v1/profiles",
        { profile: profileInputData },
        config
      )
      .then((res) => console.log(res.data))
      .then((err) => console.log(err));
    router.push("/");

    return res;
  };

  // プロフィールを更新し、プロフィール詳細画面へ遷移
  const updateProfile = async (id: number, profileInputData: ProfileInputs) => {
    const config = await setConfig();
    const res = await axios
      .patch(
        `http://localhost:3000/api/v1/profiles/${id}`,
        { profile: profileInputData },
        config
      )
      .then((res) => console.log(res.data))
      .then((err) => console.log(err));
    router.push("/");

    return res;
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <h1 className="mb-10 text-3xl">
        {isProfile ? "プロフィール作成" : "プロフィール更新"}
      </h1>
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
              <label className="mb-1 pr-4 font-bold text-gray-500">性別</label>
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
                {...register("image.url")}
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
                type="submit"
                className="focus:shadow-outline rounded bg-purple-500 py-2 px-4 font-bold text-white shadow hover:bg-purple-400 focus:outline-none"
              >
                {isProfile ? "登録" : "更新"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
