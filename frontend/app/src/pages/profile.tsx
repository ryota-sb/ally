import { NextPage } from "next";
import { useForm } from "react-hook-form";

type formState = {
  gender: string;
  discord_id: string;
  game_rank?: string;
  game_category?: string;
  image?: string;
};

type Props = {};

const Profile: NextPage<Props> = () => {
  const { register, handleSubmit, reset } = useForm<formState>({
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
    console.log(data);
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="">
          <span>Gender</span>
          <input {...register("gender", { required: true })} />
          <span>discord_id</span>
          <input {...register("discord_id")} />
          <span>game_rank</span>
          <input {...register("game_rank")} />
          <span>game_category</span>
          <input {...register("game_category")} />
          <span>image</span>
          <input {...register("image")} />
        </div>
      </form>
    </div>
  );
};

export default Profile;
