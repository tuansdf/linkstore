import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h2 className="mb-4 inline-block text-2xl font-bold">Page not found</h2>
      <Link to="/" className="link">
        Go to Home
      </Link>
    </div>
  );
}
