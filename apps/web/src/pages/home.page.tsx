import LinkItemGroup from "../features/bookmark/link-item-group";

import { useBookmarksQuery } from "../features/bookmark/bookmark.query";

export default function HomePage() {
  const bookmarksQuery = useBookmarksQuery();

  return (
    <div className="p-4">
      {bookmarksQuery.data && <LinkItemGroup bookmarks={bookmarksQuery.data} />}
    </div>
  );
}
