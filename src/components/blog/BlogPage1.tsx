import React from "react";

// Replace with your preferred Unsplash URL or local image
const heroImg =
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1920&auto=format&fit=crop";

type BlogItem = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  href: string;
};

// Demo data for 9 cards (swap with real content)
const blogs: BlogItem[] = [
  {
    id: "b1",
    title: "The Ultimate Guide to Natural Cardiovascular Wellness: Beyond Supplements",
    excerpt:
      "Discover the ultimate guide to natural cardiovascular wellness, combining lifestyle changes, exercise, diet, and supplements for cardiovascular health to improve heart health naturally.",
    date: "Oct 1, 2024",
    category: "Blog",
    image:
      "/blog/b1.png",
    href: "/blog/a-comprehensive-analysis",
  },
  {
    id: "b2",
    title: "6 Amazing Vitamin D Benefits You Must Know",
    excerpt:
      "Vitamin D, known as the ‘Sunshine Vitamin’, supports immunity and bone health with wide-ranging wellness benefits.",
    date: "Nov 6, 2019",
    category: "Vitamins",
    image:
      "https://images.unsplash.com/photo-1514986888952-8cd320577b68?q=80&w=1200&auto=format&fit=crop",
    href: "/blog/6-vitamin-d-benefits",
  },
  {
    id: "b3",
    title: "Key Supplements for a Vegan Diet",
    excerpt:
      "A vegan diet can be low in specific nutrients. Here’s how to support wellness while following a plant-based plan.",
    date: "Oct 23, 2019",
    category: "Supplements",
    image:
      "https://images.unsplash.com/photo-1505577058444-a3dab90d4253?q=80&w=1200&auto=format&fit=crop",
    href: "/blog/vegan-diet-supplements",
  },
  {
    id: "b4",
    title: "Stress And Sleep: Natural Aids That Help",
    excerpt:
      "Discover gentle, natural approaches to reduce stress and improve sleep quality without harsh side effects.",
    date: "Oct 11, 2019",
    category: "Stress Relief",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop",
    href: "/blog/stress-and-sleep",
  },
  {
    id: "b5",
    title: "Herbal Immunity: Everyday Habits That Matter",
    excerpt:
      "Simple routines paired with time-tested herbs can help maintain a resilient immune system year-round.",
    date: "Oct 2, 2019",
    category: "Immune Support",
    image:
      "https://images.unsplash.com/photo-1511988617509-a57c8a288659?q=80&w=1200&auto=format&fit=crop",
    href: "/blog/herbal-immunity-habits",
  },
  {
    id: "b6",
    title: "Minerals 101: Why Balance Is Everything",
    excerpt:
      "From magnesium to zinc, minerals play vital roles in energy, mood, and metabolism—learn the basics.",
    date: "Sep 24, 2019",
    category: "Minerals",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop",
    href: "/blog/minerals-101",
  },
  {
    id: "b7",
    title: "Gut Health: Herbs And Probiotics Together",
    excerpt:
      "Support digestion with synergistic herbs and probiotics that nurture a balanced microbiome.",
    date: "Sep 15, 2019",
    category: "Digestive Health",
    image:
      "https://images.unsplash.com/photo-1543357480-c60d66a5c9d3?q=80&w=1200&auto=format&fit=crop",
    href: "/blog/gut-health-herbs-probiotics",
  },
  {
    id: "b8",
    title: "Energy & Vitality: Daily Foundations",
    excerpt:
      "Learn how steady routines, hydration, and targeted nutrients help sustain healthy energy all day.",
    date: "Sep 9, 2019",
    category: "Energy",
    image:
      "https://images.unsplash.com/photo-1514511547904-70d83b8ae2d1?q=80&w=1200&auto=format&fit=crop",
    href: "/blog/energy-vitality-foundations",
  },
  {
    id: "b9",
    title: "Children’s Health: Gentle Support",
    excerpt:
      "Evidence-informed approaches to bolster kids’ immune and cognitive development with gentle support.",
    date: "Aug 30, 2019",
    category: "Children's Health",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop",
    href: "/blog/childrens-health-gentle-support",
  },
];

const BlogPage1: React.FC = () => {
  return (
    <main className="bg-white text-neutral-900">
      {/* Hero with overlay; left-aligned, vertically centered “Blog” */}
      <div
        className="relative min-h-[240px] md:min-h-[300px] bg-center bg-cover flex items-center"
        style={{ backgroundImage: `url('${heroImg}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/70 to-orange-400/20" />
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative w-full max-w-[1200px] mx-auto px-6">
          <h1 className="text-white text-left font-bold text-[clamp(32px,5vw,64px)] drop-shadow-md">
            Blog
          </h1>
        </div>
      </div>

      {/* Blog grid */}
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((b) => (
            <article
              key={b.id}
              className="group rounded-md overflow-hidden border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <a href={b.href} className="block">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={b.image}
                    alt={b.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </a>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <span>{b.date}</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-medium">{b.category}</span>
                </div>
                <a href={b.href} className="mt-2 block">
                  <h3 className="text-lg font-semibold leading-snug group-hover:text-orange-600 transition-colors">
                    {b.title}
                  </h3>
                </a>
                <p className="mt-2 text-sm text-neutral-700 leading-6">{b.excerpt}</p>
                <a
                  href={b.href}
                  className="mt-4 inline-flex items-center gap-1 text-orange-600 font-semibold"
                >
                  READ MORE »
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-10 flex items-center justify-center gap-2">
          <a
            href="/blog"
            className="inline-flex h-9 min-w-9 items-center justify-center rounded border border-neutral-300 bg-orange-500 px-3 text-sm font-medium hover:bg-orange-600"
          >
            1
          </a>
          <a
            href="/blogpage2"
            className="inline-flex h-9 min-w-9 items-center justify-center rounded border border-neutral-300 bg-white px-3 text-sm font-medium hover:bg-orange-300"
          >
            2
          </a>
          <a
            href="/blogpage3"
            className="inline-flex h-9 min-w-9 items-center justify-center rounded border border-neutral-300 bg-white px-3 text-sm font-medium hover:bg-orange-300"
          >
            3
          </a>
          <a
            href="/blogpage4"
            className="inline-flex h-9 min-w-9 items-center justify-center rounded border border-neutral-300 bg-white px-3 text-sm font-medium hover:bg-orange-300"
          >
            4
          </a>
          <a
            href="/blogpage5"
            className="inline-flex h-9 min-w-9 items-center justify-center rounded border border-neutral-300 bg-white px-3 text-sm font-medium hover:bg-orange-300"
          >
            5
          </a>
          <a
            href="/blogpage2"
            className="ml-2 inline-flex h-9 items-center justify-center rounded border border-neutral-300 bg-white px-3 text-sm font-medium text-emerald-700 hover:bg-neutral-50"
          >
            Next »
          </a>
        </div>
      </div>
    </main>
  );
};

export default BlogPage1;
