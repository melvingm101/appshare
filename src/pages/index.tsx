import { useEffect } from "react";
import PageHead from "@/components/PageHead";
import ProjectList from "@/components/ProjectList";
import CreateForm from "@/components/CreateForm";
import { initializeStore, useStore } from "@/zustand";
import TabMenu from "@/components/TabMenu";
import { GetServerSideProps } from "next/types";
import getPosts from "@/server/database/posts/getPosts";

export default function Home({ projects }) {
  const user = useStore((state) => state.user);
  const currentProjects = useStore((state) => state.posts);
  const setProjects = useStore((state) => state.setPosts);

  useEffect(() => {
    if (currentProjects !== projects) {
      setProjects(projects);
    }
  }, []);

  return (
    <div className="w-full">
      <PageHead
        title="Home | AppShare"
        description="The homepage of Appshare"
      />
      {user ? <CreateForm /> : null}
      <div className="flex">
        <div className="w-full">
          <TabMenu />
          <ProjectList projects={currentProjects} />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const projects = await getPosts();
  const zustandStore = initializeStore();
  console.log("BLOBZORD");
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
