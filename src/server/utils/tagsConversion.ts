import { Tags } from "@prisma/client";

export interface InputTag {
  value:
    | "web"
    | "mobile"
    | "design"
    | "tools"
    | "promotion"
    | "video"
    | "games"
    | "other";
  label: string;
}

const tagsConvert = {
  web: Tags.WEB,
  mobile: Tags.MOBILE,
  design: Tags.DESIGN,
  tools: Tags.TOOLS,
  promotion: Tags.PROMOTION,
  video: Tags.VIDEO,
  games: Tags.GAMES,
  other: Tags.OTHER,
};

export const convertListTags = (tags: InputTag[]) => {
  return tags.map((element: InputTag) => tagsConvert[element.value]);
};
