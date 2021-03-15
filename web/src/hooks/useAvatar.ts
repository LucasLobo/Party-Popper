import React, { useState } from "react";
import avatars from "../assets/avatars";

const randIndex: () => number = () => {
  const min = 0;
  const max = avatars.length - 1;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

function useAvatar(): [string, () => void] {
  const [avatarIndex, setAvatarIndex] = useState(randIndex());
  const [avatar, setAvatar] = useState(avatars[avatarIndex]);

  const nextAvatar = () => {
    const newIndex = (avatarIndex + 1) % avatars.length;
    setAvatarIndex(newIndex);
    setAvatar(avatars[newIndex]);
  };

  return [avatar, nextAvatar];
}

export default useAvatar;
