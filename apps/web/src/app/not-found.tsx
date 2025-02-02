export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-2 m-20">
      <h1 className="text-gray-900 dark:text-white">404 - Page Not Found</h1>
      <p className="text-gray-900 dark:text-white">
        Oops! The page you are looking for does not exist.
      </p>
      <a href="/home" className="text-blue-600 underline">
        Go Home
      </a>
    </div>
  );
}
