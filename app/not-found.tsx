import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <div className="relative">
          <h1 className="text-[120px] sm:text-[180px] font-bold bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500 bg-clip-text text-transparent leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-cyan-500/20 blur-3xl -z-10" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Page Not Found
        </h2>
        <p className="text-gray-400 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. 
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium hover:from-blue-500 hover:to-violet-500 transition-all"
          >
            Go Home
          </Link>
          <Link
            href="/events"
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all"
          >
            Explore Events
          </Link>
        </div>
      </div>
    </div>
  );
}
