export default function Loading() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-white/10 rounded-full" />
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-500 border-r-violet-500 rounded-full animate-spin" />
        </div>
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    </div>
  );
}
