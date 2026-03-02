import Image from "next/image";
import Link from "next/link";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "appetizers", label: "Appetizers" },
  { id: "main", label: "Main Courses" },
  { id: "desserts", label: "Desserts" },
] as const;

const PLACEHOLDER_RECIPES = [
  {
    id: 1,
    title: "Creamy Garlic Pasta",
    category: "Main Courses",
    author: "Chef Alex",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&h=450&fit=crop",
  },
  {
    id: 2,
    title: "Fresh Salad",
    category: "Appetizers",
    author: "Chef Sam",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=450&fit=crop",
  },
  {
    id: 3,
    title: "Chocolate Brownies",
    category: "Desserts",
    author: "Chef Jordan",
    image:
      "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=600&h=450&fit=crop",
  },
] as const;

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=400&fit=crop";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-stone-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-stone-900"
          >
            Recipe Share
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm font-medium text-stone-600 hover:text-stone-900"
            >
              Browse
            </Link>
            <Link
              href="#"
              className="rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-800"
            >
              Sign in
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative border-b border-stone-200 overflow-hidden bg-stone-200">
          <div className="relative aspect-[3/1] w-full min-h-[200px] sm:min-h-[280px]">
            <Image
              src={HERO_IMAGE}
              alt="Cooking ingredients and kitchen"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-stone-900/40 flex flex-col items-center justify-center px-4 text-center">
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl drop-shadow">
                Share & discover recipes
              </h1>
              <p className="mt-3 max-w-xl text-stone-100 sm:text-lg">
                Upload your favorite recipes, browse by category, and find inspiration for your next meal.
              </p>
            </div>
          </div>
        </section>

        {/* Search & filters */}
        <section className="border-b border-stone-200 bg-white px-4 py-6 sm:px-6">
          <div className="mx-auto max-w-6xl space-y-4">
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="search"
                placeholder="Search recipes..."
                className="w-full rounded-lg border border-stone-300 bg-stone-50 py-2.5 pl-10 pr-4 text-stone-900 placeholder-stone-500 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
                aria-label="Search recipes"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    cat.id === "all"
                      ? "bg-stone-900 text-white"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Recipe grid placeholder */}
        <section className="px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-lg font-semibold text-stone-900 sm:text-xl">
              Recipes
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PLACEHOLDER_RECIPES.map((recipe) => (
                <article
                  key={recipe.id}
                  className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] bg-stone-200">
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-stone-900">
                      {recipe.title}
                    </h3>
                    <p className="mt-1 text-sm text-stone-500">
                      {recipe.category} · {recipe.author}
                    </p>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-stone-500">
              More recipes and full functionality coming soon.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-6xl text-center text-sm text-stone-500">
          Recipe Sharing Platform
        </div>
      </footer>
    </div>
  );
}
