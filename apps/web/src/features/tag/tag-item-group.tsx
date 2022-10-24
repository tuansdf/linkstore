import { ITag } from "types";

import TagItem from "./tag-item";

interface Props {
  tags: ITag[];
}

export default function TagItemGroup({ tags }: Props) {
  return (
    <div className="flex flex-wrap gap-3 lg:gap-4">
      {tags.map((tag) => (
        <TagItem key={tag.id} text={tag.name} />
      ))}
    </div>
  );
}
