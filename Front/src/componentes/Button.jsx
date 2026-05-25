export default function Button({ children, ...props }) {
  return (
    <button
      className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300 flex items-center justify-center gap-2"
      {...props}
    >
      {children}
    </button>
  );
}
