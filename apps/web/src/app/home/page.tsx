export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-2 m-20">
      <p className="text-gray-900 dark:text-white">
        Welcome to E-commerce Product Management Platform.
      </p>
      <a href="/products" className="text-blue-600 underline">
        Go To Products
      </a>
    </div>
  );
}
