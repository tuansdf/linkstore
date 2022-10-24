interface Props {
  text: string;
}

export default function TagItem({ text }: Props) {
  return (
    <button className="max-w-xs rounded bg-base-200 p-4 shadow hover:opacity-90 lg:max-w-xl">
      <span className="truncate">#{text}</span>
    </button>
  );
}
