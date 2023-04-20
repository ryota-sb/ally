// react hook form
import { useForm, SubmitHandler } from "react-hook-form";

// types
import { Message, MessageInputs } from "types";

// Recoil
import { useRecoilValue } from "recoil";
import tokenState from "recoil/atoms/tokenState";

// FontAwesome Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

type ComponentProps = {
  id: number;
};

const MessageForm = (props: ComponentProps) => {
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
    const response = await fetch("http://localhost:3000/api/v1/messages", {
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
  };

  const onSubmit: SubmitHandler<MessageInputs> = (messageInputData) => {
    createMessage(messageInputData);
    reset();
    console.log("メッセージを送信しました"); // 確認用なので消す
  };

  return (
    <div>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
          <input
            {...register("content", { required: true })}
            className="flex-1 rounded-b-lg border-2 py-2 px-4 focus:border-indigo-200 focus:outline-none"
          />
          <button className="bg-indigo-200 px-4">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
