import React, { useMemo, useState } from "react";
import { ChevronDown, ChevronRight, Search, SlidersHorizontal } from "lucide-react";

// Types
type Product = {
  id: string;
  title: string;
  price: string;
  image: string;
  category: string;
  href: string;
};

type FilterGroup = {
  id: string;
  label: string;
  items: { id: string; label: string; count?: number }[];
};

// Demo data (replace with real data)
const TITLES = [
  "Bio Nutrition, 100% Organic Moringa Leaf Powder, 300g",
  "Bio Nutrition, Activated Charcoal 520mg, Natural Absorbent",
  "Bio Nutrition, Advanced Berberine 1,200mg, Cardiac Support",
  "Bio Nutrition, Black Seed Tea with Green Tea, Immune Support",
  "Bio Nutrition, Blood Pressure Wellness, Multi Nutrient",
  "Bio Nutrition, Caralluma, Appetite Control",
  "Bio Nutrition, Dandelion Root Tea, Organic, Liver Support",
  "Bio Nutrition, Graviola Tea, Antioxidant Blend",
  "Bio Nutrition, Fermented Black Garlic",
  "Bio Nutrition, Garcinia Cambogia Extract",
  "Bio Nutrition, Detox Herbal Cleanse",
  "Bio Nutrition, Vitamin D3 5000IU",
] as const;

const PRICES = ["$13.99", "$16.99", "$20.99", "$24.99", "$25.99"] as const;

const CATS = [
  "HERBAL TEAS",
  "CARDIOVASCULAR SUPPORT",
  "GLANDULAR HEALTH",
  "A-Z",
  "WEIGHT MANAGEMENT",
] as const;

// Put these images under public/product/ (no leading slash if your app is served under a subpath)
const IMAGES = [
  "/product/id1.jpg",
  "/product/id2.jpg",
  "/product/id3.jpg",
  "/product/id4.jpg",
  "/product/id5.jpg",
  "/product/id6.jpg",
  "/product/id7.jpg",
  "/product/id8.jpg",
  "/product/id9.jpg",
  "/product/id10.jpg",
  "/product/id11.jpg",
  "/product/id12.jpg",
] as const;

const DEMO_PRODUCTS: Product[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `prod-${i + 1}`,
  title: TITLES[i % TITLES.length],
  price: PRICES[i % PRICES.length],
  image: IMAGES[i % IMAGES.length], // single string, not an array
  category: CATS[i % CATS.length],
  href: `/product/${i + 1}`,
}));

const CATEGORY_FILTERS: FilterGroup = {
  id: "categories",
  label: "CATEGORIES",
  items: [
    { id: "amino-acids", label: "AMINO ACIDS", count: 8 },
    { id: "aroma-therapy", label: "AROMA THERAPY", count: 52 },
    { id: "blood-sugar", label: "BLOOD SUGAR SUPPORT", count: 10 },
    { id: "cardiovascular", label: "CARDIOVASCULAR SUPPORT", count: 13 },
    { id: "cbd", label: "CBD", count: 5 },
    { id: "cellular-health", label: "CELLULAR HEALTH", count: 1 },
    { id: "childrens-health", label: "CHILDREN'S HEALTH", count: 13 },
    { id: "circulatory", label: "CIRCULATORY SYSTEM", count: 17 },
    { id: "collagen", label: "COLLAGEN", count: 8 },
    { id: "digestive", label: "DIGESTIVE SUPPORT", count: 62 },
    { id: "gift-card", label: "GIFT CARD", count: 1 },
    { id: "healthy-snacks", label: "HEALTHY SNACKS", count: 16 },
    { id: "herbal-supplements", label: "HERBAL SUPPLEMENTS", count: 50 },
    { id: "herbal-teas", label: "HERBAL TEAS", count: 6 },
    { id: "hormonal-health", label: "HORMONAL HEALTH", count: 4 },
    { id: "hygiene", label: "HYGIENE", count: 11 },
  ],
};

const BRAND_FILTERS: FilterGroup = {
  id: "brands",
  label: "BRANDS",
  items: [
    { id: "bio-nutrition", label: "BIO NUTRITION", count: 34 },
    { id: "bluebonnet", label: "BLUEBONNET", count: 62 },
    { id: "bravo-tea", label: "BRAVO TEA & HERBS", count: 1 },
    { id: "buried-treasure", label: "BURIED TREASURE", count: 4 },
    { id: "dr-bronners", label: "DR BRONNER'S", count: 25 },
    { id: "garden-of-life", label: "GARDEN OF LIFE", count: 20 },
    { id: "life-extension", label: "LIFE EXTENSION", count: 35 },
    { id: "natures-sunshine", label: "NATURE'S SUNSHINE", count: 126 },
    { id: "now-foods", label: "NOW FOODS", count: 108 },
    { id: "rays-healthy-living", label: "RAY'S HEALTHY LIVING", count: 171 },
    { id: "superior-source", label: "SUPERIOR SOURCE", count: 10 },
    { id: "the-soap-works", label: "THE SOAP WORKS", count: 15 },
  ],
};

const MAIN_CATEGORIES = [
  { id: "vitamins", name: "Vitamins A-Z", href: "/categories/vitamins", icon: "💊" },
  { id: "amino", name: "Amino Acids", href: "/categories/amino-acids", icon: "🧬" },
  { id: "herbal-az", name: "Herbal Supplement A-Z", href: "/categories/herbal-a-z", icon: "🌿" },
  { id: "nervous", name: "Nervous System", href: "/categories/nervous-system", icon: "🧠" },
  { id: "liquid-herbs", name: "Liquid Herbs A-Z", href: "/categories/liquid-herbs-a-z", icon: "🧪" },
  { id: "multivitamins", name: "Multi-Vitamins", href: "/categories/multi-vitamins", icon: "🧴" },
  { id: "minerals", name: "Minerals", href: "/categories/minerals", icon: "🪨" },
  { id: "digestion", name: "Digestion & Cleansing Support", href: "/categories/digestion-cleansing", icon: "🫗" },
  { id: "men-women", name: "Men & Women Health", href: "/categories/men-women-health", icon: "🧑‍⚕️" },
];

const ProductsPage1: React.FC = () => {
  // UI state
  const [q, setQ] = useState("");
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    categories: true,
    brands: false,
    price: true,
  });
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("110");
  const [sort, setSort] = useState("default");

  const filtered = useMemo(() => {
    // basic client filtering demo (by title contains query)
    return DEMO_PRODUCTS.filter((p) =>
      p.title.toLowerCase().includes(q.trim().toLowerCase())
    );
  }, [q]);

  const total = 742; // from screenshot copy; replace with real API count
  const showing = Math.min(filtered.length, 12);

  const toggleGroup = (id: string) =>
    setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <main className="bg-white text-neutral-900">
      {/* Container */}
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="text-sm text-neutral-500 mb-4">
          <a href="/" className="hover:text-emerald-700">Home</a>
          <span className="px-2">/</span>
          <span className="text-neutral-700">Products</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
          {/* LEFT RAIL */}
          <aside className="space-y-6">
            {/* Search */}
            <div>
              <label htmlFor="product-search" className="sr-only">Search products</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  id="product-search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full rounded-md border border-neutral-300 pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Categories group */}
            <FilterAccordion
              group={CATEGORY_FILTERS}
              isOpen={openGroups.categories}
              onToggle={() => toggleGroup("categories")}
            />

            {/* Brands group */}
            <FilterAccordion
              group={BRAND_FILTERS}
              isOpen={openGroups.brands}
              onToggle={() => toggleGroup("brands")}
            />

            {/* Price */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold">PRICE</h4>
                <button
                  onClick={() => toggleGroup("price")}
                  className="p-1 rounded hover:bg-neutral-100"
                  aria-label="Toggle price"
                >
                  {openGroups.price ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              </div>

              {openGroups.price && (
                <div className="mt-3 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
                      placeholder="Min"
                      inputMode="numeric"
                    />
                    <input
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
                      placeholder="Max"
                      inputMode="numeric"
                    />
                  </div>
                  <button
                    onClick={() => {
                      setMinPrice("0");
                      setMaxPrice("110");
                    }}
                    className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-50"
                  >
                    RESET
                  </button>
                </div>
              )}
            </div>
          </aside>

          {/* RIGHT CONTENT */}
          <section>
            {/* Title + sort row */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-4xl font-bold">Products</h1>
                <p className="mt-2 text-sm text-neutral-600">
                  Showing {showing}–{Math.max(12, showing)} of {total} results
                </p>
              </div>

              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-neutral-400" />
                <label htmlFor="sort" className="text-sm text-neutral-700">
                  Default sorting
                </label>
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="rounded-md border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="default">Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A–Z</option>
                  <option value="name-desc">Name: Z–A</option>
                </select>
              </div>
            </div>

            {/* 9 Main Categories */}
            <div className="mt-8">
              <h2 className="sr-only">Main Categories</h2>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
                {MAIN_CATEGORIES.map((c) => (
                  <a
                    key={c.id}
                    href={c.href}
                    className="group rounded-lg border border-neutral-200 bg-white p-4 hover:border-emerald-500/50 hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-emerald-50 text-2xl">
                        <span aria-hidden="true">{c.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-neutral-900 group-hover:text-emerald-700">
                          {c.name}
                        </h3>
                        <span className="mt-1 inline-block text-xs text-neutral-500">
                          Explore
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
                {/* View All */}
                <a
                  href="/categories"
                  className="rounded-lg border border-neutral-200 bg-white p-4 hover:border-orange-500/50 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-orange-50 text-2xl">
                      <span aria-hidden="true">📚</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-neutral-900 hover:text-orange-600">
                        View All Categories
                      </h3>
                      <span className="mt-1 inline-block text-xs text-neutral-500">
                        See the complete list
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Product grid */}
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.slice(0, 12).map((p) => (
                <article
                  key={p.id}
                  className="rounded-lg border border-neutral-200 bg-white hover:shadow-md transition group overflow-hidden"
                >
                  <a href={p.href} className="block">
                    <div className="relative mx-auto mt-6 h-40 w-40">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="h-full w-full object-contain"
                        loading="lazy"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = "/placeholder-product.jpg";
                        }}
                      />
                    </div>
                  </a>
                  <div className="px-4 pt-4">
                    <p className="text-xs text-neutral-500 uppercase tracking-wide">
                      {p.category}
                    </p>
                    <a href={p.href} className="mt-1 block">
                      <h3 className="text-sm font-semibold leading-snug hover:text-orange-600">
                        {p.title}
                      </h3>
                    </a>
                    <div className="mt-2 text-sm font-semibold">{p.price}</div>
                  </div>
                  <div className="px-4 py-4">
                    <button className="w-full rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 transition">
                      Add to cart
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

// Reusable filter accordion
const FilterAccordion: React.FC<{
  group: FilterGroup;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ group, isOpen, onToggle }) => {
  return (
    <div className="border-t pt-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold">{group.label}</h4>
        <button
          onClick={onToggle}
          className="p-1 rounded hover:bg-neutral-100"
          aria-label={`Toggle ${group.label}`}
        >
          {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
      </div>

      {isOpen && (
        <ul className="mt-3 space-y-2 max-h-[280px] overflow-auto pr-1">
          {group.items.map((g) => (
            <li key={g.id} className="flex items-center justify-between gap-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-neutral-700">{g.label}</span>
              </label>
              {typeof g.count === "number" && (
                <span className="text-xs text-neutral-500">({g.count})</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductsPage1;
