import React, { useMemo } from "react";
import { botttsNeutral } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

const Avatar = ({
  src,
  name,
}: {
  src: string | null | undefined;
  name: string;
}) => {
  const avatar = useMemo(() => {
    return createAvatar(botttsNeutral, {
      size: 128,
      backgroundType: ["solid"],
      eyes: [
        "bulging",
        "dizzy",
        "eva",
        "frame1",
        "frame2",
        "happy",
        "robocop",
        "roundFrame01",
        "roundFrame02",
        "shade01",
      ],
      seed: name,
    }).toDataUriSync();
  }, []);

  if (src) {
    return <img className="h-8 w-8 rounded-full" src={src} alt="" />;
  }

  return <img className="h-8 w-8 rounded-full" src={avatar} alt="Avatar" />;
};

export default Avatar;
