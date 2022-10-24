import { IBookmark } from "types";

import LinkItem from "./link-item";

interface Props {
  bookmarks: IBookmark[];
}

export default function LinkItemGroup({ bookmarks }: Props) {
  return (
    <div className="flex flex-wrap gap-3 lg:gap-4">
      {bookmarks.map((bookmark) => (
        <LinkItem key={bookmark.id} text={bookmark.name} href={bookmark.href} />
      ))}
    </div>
  );
}
