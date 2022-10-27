import { useSearchParams } from "react-router-dom";

import { useSearchBookmarksQuery } from "../features/bookmark/bookmark.query";
import LinkItemGroup from "../features/bookmark/link-item-group";

export default function SearchPage() {
  const [searchParams] = useSearchParams();

  const bookmarksQuery = useSearchBookmarksQuery({
    name: searchParams.get("name"),
    tag: searchParams.get("tag"),
    href: searchParams.get("href"),
  });

  return (
    <div className="p-4">
      {bookmarksQuery.data && <LinkItemGroup bookmarks={bookmarksQuery.data} />}
    </div>
  );
}
