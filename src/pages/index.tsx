import PageHead from "@/components/PageHead";
import ProjectList from "@/components/ProjectList";
import CreateForm from "@/components/CreateForm";
import { initializeStore, useStore } from "@/zustand";
import TabMenu from "@/components/TabMenu";
import { GetServerSideProps } from "next/types";
import getPosts from "@/server/database/posts/getPosts";
import { CurrentProject } from "@/client/models";
import { useEffect } from "react";

export default function Home({
  projects,
}: {
  projects: CurrentProject[] | null;
}) {
  const user = useStore((state) => state.user);
  const setPosts = useStore((state) => state.setPosts);
  const currentProjects = useStore((state) => state.posts);

  useEffect(() => {
    if (projects && projects !== currentProjects) {
      setPosts(projects);
    }
  }, [projects]);

  return (
    <div>
      <PageHead
        title="Home | AppShare"
        description="The homepage of Appshare"
      />
      {user ? <CreateForm /> : null}
      <div className="flex">
        <div>
          <TabMenu />
          <ProjectList projects={currentProjects} />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const sort =
    context.query.sort && typeof context.query.sort === "string"
      ? context.query.sort
      : "latest";
  const projects = await getPosts(sort);
  const zustandStore = initializeStore();
  if (projects) {
    zustandStore.getState().setPosts(projects);
  }

  return {
    props: {
      initialZustandState: JSON.parse(JSON.stringify(zustandStore.getState())),
      projects: projects,
    }, // will be passed to the page component as props
  };
};
