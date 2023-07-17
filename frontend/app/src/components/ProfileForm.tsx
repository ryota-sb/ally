import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

// React Hook Form
import { useForm, SubmitHandler } from "react-hook-form";

// types
import { ProfileData, ProfileInputs } from "types";

// BasePath
import getBasePath from "lib/getBasePath";

// Recoil
import { useSetRecoilState } from "recoil";
import profileState from "recoil/atoms/profileState";

// Cookie
import { parseCookies } from "nookies";

type Props = {
  profileData?: ProfileData;
  defaultValues: Partial<ProfileInputs>;
};

const ProfileForm = (props: Props) => {
  const router = useRouter();

  const accessToken = parseCookies().accessToken;

  const setProfileValue = useSetRecoilState(profileState);

  const profile = props?.profileData;
  const isProfile = !profile;

  // 入力フォームのデフォルト値
  const defaultValues = props?.defaultValues;

  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("/noimage.png");

  // 画像が選択された時に、値をセットする
  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fileObject = window.URL.createObjectURL(file);
    setPreviewImage(fileObject);
    setImage(file);
  };

  // ReactHookFormのuseForm関数を定義
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileInputs>({
    mode: "onChange",
    defaultValues,
  });

  // プロフィールデータがあるかどうかで、リクエストを変更する
  const onSubmit: SubmitHandler<ProfileInputs> = (profileInputData) => {
    const formData = new FormData();
    formData.append("profile[nickname]", profileInputData.nickname!);
    formData.append("profile[gender]", profileInputData.gender!);
    formData.append("profile[game_category]", profileInputData.gameCategory!);
    formData.append("profile[game_rank]", profileInputData.gameRank!);
    formData.append("profile[discord_id]", profileInputData.discordId!);
    formData.append("profile[image]", image!, image!.name);
    console.log(formData);
    return isProfile
      ? createProfile(formData)
      : updateProfile(profile!.id, formData);
  };

  type HttpMethods = "GET" | "POST" | "PUT" | "DELETE";

  // リクエストに必要な情報をセット
  const setConfig = (http: HttpMethods, data: FormData) => {
    const config = {
      method: http,
      headers: { authorization: `Bearer ${accessToken}` },
      body: data,
    };
    return config;
  };

  // プロフィールを新規作成、ルートディレクトリへ遷移
  const createProfile = async (profileInputData: FormData) => {
    const config = setConfig("POST", profileInputData);
    const response = await fetch(`${getBasePath()}/api/v1/profiles`, config);
    const data: ProfileData = await response.json();
    setProfileValue(data);
    router.push("/");
  };

  // プロフィールを更新し、プロフィール詳細画面へ遷移
  const updateProfile = async (id: number, profileInputData: FormData) => {
    const config = setConfig("PUT", profileInputData);
    const response = await fetch(
      `${getBasePath()}/api/v1/profiles/${id}`,
      config
    );
    const data: ProfileData = await response.json();
    setProfileValue(data);
    router.push(`/users/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4">
      <h1 className="whitespace-nowrap p-10 text-center text-4xl">
        {isProfile ? "プロフィール作成" : "プロフィール更新"}
      </h1>
      <div className="mx-auto flex max-w-2xl flex-col items-center justify-center rounded-2xl bg-white p-10">
        <form className="max-w-md" onSubmit={handleSubmit(onSubmit)}>
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

          {/* discordId */}
          <div className="mb-6 flex">
            <div className="flex w-1/3 items-center">
              <label className="mb-1 pr-4 font-bold text-gray-500">
                Discord ID
              </label>
            </div>
            <div className="w-2/3">
              <input
                {...register("discordId")}
                className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* gameRank */}
          <div className="mb-6 flex">
            <div className="flex w-1/3 items-center">
              <label className="mb-1 pr-4 font-bold text-gray-500">
                ゲーム内ランク
              </label>
            </div>
            <div className="w-2/3">
              <input
                {...register("gameRank")}
                className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* gameCategory */}
          <div className="mb-6 flex">
            <div className="flex w-1/3 items-center">
              <label className="mb-1 pr-4 font-bold text-gray-500">
                ゲームの種類
              </label>
            </div>
            <div className="w-2/3">
              <input
                {...register("gameCategory", { required: true })}
                className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
              />
              {errors.gameCategory && (
                <div className="text-red-500">入力が必須の項目です。</div>
              )}
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
          <div className="relative h-[300px] border border-black md:h-[400px]">
            <Image
              src={previewImage}
              alt="プレビュー画像"
              // width={500}
              // height={500}
              layout="fill"
              className="object-cover"
            />
          </div>

          {/* form button */}
          <div className="mt-4 flex items-center justify-center">
            <button
              type="submit"
              className="focus:shadow-outline rounded bg-purple-500 py-2 px-4 font-bold text-white shadow hover:bg-purple-400 focus:outline-none"
            >
              {isProfile ? "登録" : "更新"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
