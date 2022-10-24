import clsx from "clsx";

interface Props {
  text?: string;
  className?: string;
}

export default function Error({
  text = "Something wrong happen, try again later",
  className,
}: Props) {
  return <div className={clsx("alert alert-error", className)}>{text}</div>;
}
