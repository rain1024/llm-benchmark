export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            LLM Benchmark
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive evaluation and comparison of Large Language Models across various tasks and metrics
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="text-3xl mb-4">🏆</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Performance Metrics
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Compare accuracy, latency, and throughput across different LLMs
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Interactive Charts
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Visualize results with dynamic charts and filtering options
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="text-3xl mb-4">🔬</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Research Insights
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Access detailed analysis and methodology behind the benchmarks
            </p>
          </div>
        </div>

        <div className="text-center">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
            View Benchmarks
          </button>
          <button className="ml-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-3 px-8 rounded-lg transition-colors">
            Learn More
          </button>
        </div>

        <footer className="mt-16 text-center text-gray-500 dark:text-gray-400">
          <p>© 2024 LLM Benchmark. Built with Next.js and Tailwind CSS.</p>
        </footer>
      </div>
    </div>
  );
}
