import { render } from "@testing-library/react";
import Card from "../../components/Card";

describe("Card", () => {
  const project = {
    title: "Hello world",
    description: "Hello world",
    id: 1,
    views: 0,
    likes: [],
    projectUrl: "",
    tags: ["DESIGN"],
    banner: "",
  };

  it("renders a card component", () => {
    const { container } = render(<Card project={project} />);

    expect(container).toMatchSnapshot();
  });

  it("renders banner if banner is provided", () => {
    const newProject = { ...project, banner: "https://www.google.com" };
    const { getByTestId } = render(<Card project={newProject} />);

    expect(getByTestId("card-banner")).toBeTruthy();
  });
});
