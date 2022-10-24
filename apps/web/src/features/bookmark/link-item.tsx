interface Props {
  text: string;
  href: string;
}

export default function LinkItem({ text, href }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex max-w-xs flex-col rounded bg-base-200 p-4 shadow hover:opacity-90 lg:max-w-xl"
    >
      <span className="truncate font-medium">{text}</span>
      <span className="truncate text-sm">{href}</span>
    </a>
  );
}
