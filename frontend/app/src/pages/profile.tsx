import { NextPage } from "next";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRecoilValue } from "recoil";
import tokenState from "../recoil/atoms/tokenState";

type formState = {
  gender: string;
  discord_id: string;
  game_rank?: string;
  game_category?: string;
  image?: string;
};

type Props = {};

const Profile: NextPage<Props> = () => {
  const token = useRecoilValue(tokenState);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formState>({
    mode: "onChange",
    defaultValues: {
      gender: "",
      discord_id: "",
      game_rank: "",
      game_category: "",
      image: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    const url = "http://localhost:3000/api/v1/profiles";
    const headers = { Authorization: `Bearer ${token}` };
    axios
      .post(url, data, { headers: headers })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        console.log(token);
      });
    console.log(token);
    console.log(data);
  });

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <h1 className="mb-10 text-3xl">プロフィール設定</h1>
      <form className="w-full max-w-sm" onSubmit={onSubmit}>
        <div className="mb-6">
          {/* gender */}
          <div className="mb-6 flex">
            <div className="flex w-1/3 items-center">
              <label className="mb-1 pr-4 font-bold text-gray-500">
                Gender
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
                discord_id
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
                game_rank
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
                game_category
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
              <label className="mb-1 pr-4 font-bold text-gray-500 md:mb-0 md:text-right">
                image
              </label>
            </div>
            <div className="w-2/3">
              <input
                {...register("image")}
                className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-1/3"></div>
            <div className="w-2/3">
              <button
                className="focus:shadow-outline rounded bg-purple-500 py-2 px-4 font-bold text-white shadow hover:bg-purple-400 focus:outline-none"
                type="submit"
              >
                プロフィール登録
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
