import { CurrentProject } from "@/client/models";
import React from "react";
import Card from "../Card";

const ProjectList = ({ projects }: { projects: CurrentProject[] | null }) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="mt-5 text-center text-sm text-gray-400">
        No projects yet!
      </div>
    );
  }

  return (
    <div className="mx-3 grid grid-cols-1">
      {projects.map((project) => (
        <div key={project.id}>
          <Card project={project} />
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
