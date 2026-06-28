import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/login")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <div className="mb-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-revenue-600 text-xl font-bold text-white">
              R
            </div>
            <h1 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">Welcome back</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Sign in to your RevenueOS dashboard</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-revenue-500 focus:outline-none focus:ring-2 focus:ring-revenue-500/20 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-revenue-500 focus:outline-none focus:ring-2 focus:ring-revenue-500/20 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                placeholder="••••••••"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <input type="checkbox" className="rounded border-gray-300 text-revenue-600 focus:ring-revenue-500" />
                Remember me
              </label>
              <a href="#" className="font-medium text-revenue-600 hover:text-revenue-500 dark:text-revenue-400">Forgot password?</a>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-revenue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-revenue-700 dark:bg-revenue-500 dark:hover:bg-revenue-400"
            >
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <Link to="/app/signup" className="font-semibold text-revenue-600 hover:text-revenue-500 dark:text-revenue-400">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}