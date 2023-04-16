import { CurrentProject } from "@/client/models";
import React from "react";
import Card from "../Card";

const ProjectList = ({ projects }: { projects: CurrentProject[] | null }) => {
  if (!projects) {
    return <div>No projects yet!</div>;
  }

  console.log(projects);

  return (
    <div className="mx-3 grid grid-cols-1 sm:grid-cols-2 sm:gap-2">
      {projects.map((project) => (
        <div key={project.id}>
          <Card project={project} />
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
