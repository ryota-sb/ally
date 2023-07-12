import { useAuth0 } from "@auth0/auth0-react";

import { useRef, useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";

const TestLoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const copyText = useRef("test.user.123@example.com");
  const [copied, setCopied] = useState(false);

  // メールアドレスとパスワードでの認証
  const handleLogin = () => {
    loginWithRedirect({
      connection: "Username-Password-Authentication",
    });
  };

  const copyToClipboard = async () => {
    await global.navigator.clipboard
      .writeText(copyText.current)
      .then(() => setCopied(true));
  };

  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 3000);
    }
  });

  return (
    <>
      <div className="grid grid-cols-4 gap-x-2">
        <button
          className="col-span-3 transform rounded-md bg-purple-600 px-4 py-2 capitalize text-white transition-colors duration-500 hover:bg-purple-500"
          onClick={handleLogin}
        >
          テストユーザーログイン
        </button>

        <div className="col-span-1 flex flex-col items-center rounded-md bg-gray-200 p-2">
          <button onClick={copyToClipboard} className="">
            <FontAwesomeIcon
              size={"xl"}
              icon={faClipboard}
              className="cursor-pointer"
            />
          </button>
          <p className="text-[12px]">{copied ? "Copied!" : "Copy"}</p>
        </div>
      </div>

      <div className="">
        <p>
          テストユーザーのログイン情報コピーできます。
          EmailとPasswordは、一緒です。
        </p>
      </div>
    </>
  );
};

export default TestLoginButton;
