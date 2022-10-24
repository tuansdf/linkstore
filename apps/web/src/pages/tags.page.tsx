import TagItemGroup from "../features/tag/tag-item-group";

import { useTagsQuery } from "../features/tag/tag.query";

export default function TagsPage() {
  const tagsQuery = useTagsQuery();

  return (
    <div className="p-4">
      {tagsQuery.data && <TagItemGroup tags={tagsQuery.data} />}
    </div>
  );
}
