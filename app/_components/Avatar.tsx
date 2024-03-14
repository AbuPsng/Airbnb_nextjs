"use client";

import Image from "next/image";
import React from "react";

type AvatarProps = {
  src?: string | null | undefined;
};

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <div>
      <Image
        className="rounded-full "
        height={30}
        width={30}
        alt="Avatar"
        src={src || "/images/placeholder.jpg"}
      />
    </div>
  );
};

export default Avatar;
