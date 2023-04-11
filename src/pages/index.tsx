import { Inter } from "next/font/google";
import PageHead from "@/components/PageHead";
import ProjectList from "@/components/ProjectList";
import CreateForm from "@/components/CreateForm";
import { useCurrentStore } from "@/client/zustand";
import TabMenu from "@/components/TabMenu";

export default function Home() {
  const user = useCurrentStore((state: any) => state.user.user);

  return (
    <>
      <PageHead
        title="Home | AppShare"
        description="The homepage of Appshare"
      />
      {user ? <CreateForm /> : null}
      <TabMenu />
      <ProjectList />
    </>
  );
}
