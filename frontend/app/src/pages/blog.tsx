import axios from "axios";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import tokenState from "../recoil/atoms/tokenState";

const BlogPage: NextPage = () => {
  const token = useRecoilValue(tokenState);
  const [title, setTitle] = useState<string>("");
  const [caption, setCaption] = useState<string>("");

  const onClick = () => {
    const params = {
      title: title,
      caption: caption,
    };
    axios
      .post("http://localhost:3000/api/v1/posts", params, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(e.target.value);
  };
  return (
    <div>
      <p>{token}</p>
      <p>ブログ投稿</p>
      <label htmlFor="">タイトル</label>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          onChange(e, setTitle);
        }}
      />
      <br />
      <label htmlFor="">本文</label>
      <input
        type="text"
        value={caption}
        onChange={(e) => {
          onChange(e, setCaption);
        }}
      />
      <br />
      <button onClick={onClick}>新規投稿</button>
    </div>
  );
};

export default BlogPage;
