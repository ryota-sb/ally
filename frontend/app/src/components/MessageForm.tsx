// react hook form
import { useForm, SubmitHandler } from "react-hook-form";

// types
import { Message, MessageInputs, ChatRoomData } from "types";

// swr type
import { KeyedMutator } from "swr";

// BasePath
import getBasePath from "lib/getBasePath";

// Recoil
import { useRecoilValue } from "recoil";
import tokenState from "recoil/atoms/tokenState";

// FontAwesome Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

type Props = {
  id: number;
  mutate: KeyedMutator<ChatRoomData>;
};

const MessageForm = (props: Props) => {
  const token = useRecoilValue(tokenState);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MessageInputs>({
    mode: "onChange",
    defaultValues: { content: "" },
  });

  const createMessage = async (messageInputData: MessageInputs) => {
    const response = await fetch(`${getBasePath()}/api/v1/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: {
          content: messageInputData.content,
          chat_room_id: props.id,
        },
      }),
    });
    const data: Message = await response.json();
    props.mutate();
  };

  const onSubmit: SubmitHandler<MessageInputs> = (messageInputData) => {
    createMessage(messageInputData);
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
          <input
            {...register("content", { required: true })}
            className="flex-1 rounded-bl-2xl border-2 py-2 px-4 focus:border-indigo-200 focus:outline-none"
          />
          <button className="rounded-br-2xl bg-indigo-200 px-4">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
