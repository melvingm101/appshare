import { Inter } from "next/font/google";
import PageHead from "@/components/PageHead";
import ProjectList from "@/components/ProjectList";
import CreateForm from "@/components/CreateForm";
import { useCurrentStore } from "@/client/zustand";
import TabMenu from "@/components/TabMenu";
import { GetServerSideProps } from "next/types";
import getPosts from "@/server/database/posts/getPosts";
import { CurrentProject } from "@/client/models";

export default function Home({
  projects,
}: {
  projects: CurrentProject[] | null;
}) {
  const user = useCurrentStore((state: any) => state.user);

  return (
    <div className="mt-3 mx-auto max-w-screen-md">
      <PageHead
        title="Home | AppShare"
        description="The homepage of Appshare"
      />
      {user ? <CreateForm /> : null}
      <TabMenu />
      <ProjectList projects={projects} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const projects = await getPosts();
  return {
    props: {
      projects,
    }, // will be passed to the page component as props
  };
};
