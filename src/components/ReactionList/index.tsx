import { useStore } from "@/zustand";
import React from "react";

const ReactionListItem = ({
  count,
  symbol,
  userLike,
  currentLikeType,
  isSinglePage,
}: {
  count: number;
  symbol: string;
  userLike: any[];
  currentLikeType: string;
  isSinglePage: boolean;
}) => {
  return (
    <>
      {count > 0 && (
        <div
          className={`px-2 ${
            isSinglePage ? "" : "mt-2 py-0.5"
          } rounded-md flex items-center hover:text-white text-sm select-none mr-2 ${
            userLike.length > 0 && userLike[0].likeType === currentLikeType
              ? "border border-blue-500 bg-blue-900"
              : isSinglePage
              ? "bg-primary-color"
              : "bg-secondary-color"
          }`}
          style={{
            fontFamily:
              "'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'",
          }}
        >
          {symbol} {count}
        </div>
      )}
    </>
  );
};

const ReactionList = ({
  likes,
  isSinglePage = false,
}: {
  likes: any[];
  isSinglePage: boolean;
}) => {
  const likeList = likes.filter((item) => item.likeType === "LIKE");
  const loveList = likes.filter((item) => item.likeType === "LOVE");
  const laughList = likes.filter((item) => item.likeType === "LAUGH");
  const wowList = likes.filter((item) => item.likeType === "WOW");
  const dislikeList = likes.filter((item) => item.likeType === "DISLIKE");
  const user = useStore((state) => state.user);
  const userLike = likes.filter((item) => item.authorId === user?.id);

  return (
    <div className={`flex ${isSinglePage ? "" : "mb-3"}`}>
      <ReactionListItem
        symbol="👍🏻"
        count={likeList.length}
        userLike={userLike}
        currentLikeType="LIKE"
        isSinglePage={isSinglePage}
      />
      <ReactionListItem
        symbol="❤️"
        count={loveList.length}
        userLike={userLike}
        currentLikeType="LOVE"
        isSinglePage={isSinglePage}
      />
      <ReactionListItem
        symbol="🤣"
        count={laughList.length}
        userLike={userLike}
        currentLikeType="LAUGH"
        isSinglePage={isSinglePage}
      />
      <ReactionListItem
        symbol="😮"
        count={wowList.length}
        userLike={userLike}
        currentLikeType="WOW"
        isSinglePage={isSinglePage}
      />
      <ReactionListItem
        symbol="👎🏻"
        count={dislikeList.length}
        userLike={userLike}
        currentLikeType="DISLIKE"
        isSinglePage={isSinglePage}
      />
    </div>
  );
};

export default ReactionList;
