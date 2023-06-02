import React from "react";
import { useStore } from "@/zustand";
import TabItem from "../TabItem";

const TabMenu = () => {
  const fetchPosts = useStore((state) => state.fetchPosts);
  const activeTab = useStore((state) => state.activeTab);

  return (
    <div className="overflow-scroll rounded-md bg-primary-color p-1 mx-3">
      <ul className="flex items-center gap-2 text-sm font-medium">
        <TabItem
          text="Latest"
          onClick={() => fetchPosts("latest")}
          isActive={activeTab === "latest"}
        />
        <TabItem
          text="Most reacted"
          onClick={() => fetchPosts("reacted")}
          isActive={activeTab === "reacted"}
        />
        <TabItem
          text="Most viewed"
          onClick={() => fetchPosts("viewed")}
          isActive={activeTab === "viewed"}
        />
      </ul>
    </div>
  );
};

export default TabMenu;
