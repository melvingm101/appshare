import React from "react";
import { useRouter } from "next/router";
import getPost from "@/server/database/posts/getPost";
import { CurrentProject } from "@/client/models";
import { GetServerSideProps } from "next/types";
import PageHead from "@/components/PageHead";
import Image from "next/image";

const ViewProject = ({ project }: { project: CurrentProject }) => {
  return (
    <div>
      <PageHead title={project.title} description={project.description} />
      {project.banner && (
        <div className="w-full h-[300px] rounded-sm pb-3">
          <Image
            alt={project.title}
            src={project.banner}
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="mt-3 mx-auto max-w-screen-md">
        <div className="mx-3">
          <h5 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white text-left">
            {project.title}
          </h5>

          <div>{project.description}</div>
          <div>Views: {project.views}</div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (params && params.id && typeof params.id === "string") {
    const project = await getPost(parseInt(params.id));
    if (project) {
      return {
        props: {
          project: {
            title: project.title,
            description: project.description,
            projectUrl: project.projectUrl,
            tags: project.tags,
            banner: project.banner,
            views: project.views,
          },
        }, // will be passed to the page component as props
      };
    }
  }

  return {
    props: {
      destination: "/",
      permanent: false,
    },
  };
};

export default ViewProject;
