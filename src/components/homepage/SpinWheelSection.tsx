import React, { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

/**
 * Functional Spin Wheel (6 slices) with highly visible labels
 * - Validates email
 * - Prevents multiple spins per email in current session
 * - Spins to a random slice and lands under the top pointer
 * - Labels pushed outward, outlined, and optional chip for readability
 */

const SLICES = [
  { label: "Not Lucky", color: "#a06d2f" },
  { label: "$15 OFF",   color: "#f28a1c" },
  { label: "5% OFF",    color: "#a06d2f" },
  { label: "$10 OFF",   color: "#7aaa3a" },
  { label: "Free Ship", color: "#7aaa3a" },
  { label: "Not Lucky", color: "#a06d2f" },
] as const;

const FULL_ROT = 360;

const SpinWheelSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0); // current resting rotation (0–359)
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const sliceAngle = 360 / SLICES.length; // 60°

  // Session-level "already spun" check
  const hasSpun = useMemo(() => {
    if (!email) return false;
    return sessionStorage.getItem(`spun:${email}`) === "1";
  }, [email]);

  function validateEmail(e: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  }

  function pickRandomIndex() {
    // Simple uniform random across 6 slices
    return Math.floor(Math.random() * SLICES.length);
  }

  function handleSpin() {
    setError(null);
    setResult(null);

    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }
    if (hasSpun) {
      setError("This email has already spun in this session.");
      return;
    }
    if (isSpinning) return;

    setIsSpinning(true);

    // Choose a winning slice
    const winIndex = pickRandomIndex();

    // Center angle of the winning slice
    const sliceCenter = winIndex * sliceAngle + sliceAngle / 2;

    // Rotate so the chosen slice center lands at 0° (pointer at top),
    // adding several full spins for flair.
    const extraSpins = 5;
    const target = rotation + extraSpins * FULL_ROT + (FULL_ROT - sliceCenter);

    if (wheelRef.current) {
      wheelRef.current.style.transition =
        "transform 3.2s cubic-bezier(0.2, 0.8, 0.2, 1)";
      // force reflow so transition applies
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      wheelRef.current.offsetHeight;
      wheelRef.current.style.transform = `rotate(${target}deg)`;
    }

    const onEnd = () => {
      if (!wheelRef.current) return;
      wheelRef.current.removeEventListener("transitionend", onEnd);

      const normalized = ((target % FULL_ROT) + FULL_ROT) % FULL_ROT;
      setRotation(normalized);
      wheelRef.current.style.transition = "";

      setIsSpinning(false);
      setResult(SLICES[winIndex].label);
      sessionStorage.setItem(`spun:${email}`, "1");
    };

    wheelRef.current?.addEventListener("transitionend", onEnd);
  }

  // Paint the wheel using a conic-gradient
  const wheelBackground = useMemo(() => {
    const stops: string[] = [];
    for (let i = 0; i < SLICES.length; i++) {
      const start = i * sliceAngle;
      const end = start + sliceAngle;
      stops.push(`${SLICES[i].color} ${start}deg ${end}deg`);
    }
    return `conic-gradient(${stops.join(",")})`;
  }, [sliceAngle]);

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column: heading + bullets + form */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight text-gray-900">
              Get Latest Discounts
              <br /> and Offer By Spinning
              <br /> A Wheel
            </h2>

            {/* Green underline */}
            <div className="mt-6 h-1 w-24 bg-green-600 rounded-full" />

            {/* Bullets */}
            <ul className="mt-6 space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 mt-0.5" />
                <span>Try your luck to get discount coupon</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 mt-0.5" />
                <span>1 spin per email</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 mt-0.5" />
                <span>No cheating</span>
              </li>
            </ul>

            {/* Email + CTA */}
            <div className="mt-8 max-w-xl">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Please enter your email"
                  className="w-full sm:flex-1 h-12 rounded-md border border-gray-300 px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 disabled:opacity-50"
                  disabled={isSpinning}
                />
                <Button
                  className="h-12 px-6 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-semibold disabled:opacity-60"
                  onClick={handleSpin}
                  disabled={isSpinning}
                >
                  {isSpinning ? "SPINNING..." : "TRY YOUR LUCK"}
                </Button>
              </div>
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              {result && !error && (
                <p className="mt-3 text-sm font-semibold text-gray-800">
                  Result: <span className="text-green-700">{result}</span>
                </p>
              )}
            </div>
          </div>

          {/* Right column: Wheel */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Base shadow disc (purely for depth) */}
              <div className="w-[520px] h-[520px] rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.15)]" />

              {/* Wheel face (relative so labels can z-index above) */}
              <div
                ref={wheelRef}
                className="absolute inset-0 rounded-full  "
                style={{
                  background: wheelBackground,
                  transform: `rotate(${rotation}deg)`,
                }}
              >
                {/* Slice dividers */}
                {[...Array(SLICES.length)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute left-1/2 top-1/2 bg-black/20 origin-top"
                    style={{
                      width: "2px",
                      height: "50%",
                      transform: `rotate(${i * sliceAngle}deg) translate(-50%, -100%)`,
                    }}
                  />
                ))}

                {/* Labels: farther from hub, bold, outlined + chip for contrast */}
                {SLICES.map((s, i) => {
                  const angle = i * sliceAngle + sliceAngle / 2; // center of slice
                  const r = 0.72; // push outward so it clears the hub
                  return (
                    <div
                      key={s.label + i}
                      className="absolute left-1/2 top-1/2 z-[2]"
                      style={{
                        transform: `
                          rotate(${angle}deg)
                          translate(0, -${r * 50}%)
                          rotate(-${angle}deg)
                        `,
                        transformOrigin: "center",
                        pointerEvents: "none",
                      }}
                    >
                      <span
                        className="block text-center font-bold select-none"
                        style={{
                          fontSize: "clamp(12px, 1.8vw, 16px)",
                          lineHeight: 1.1,
                          color: "#fff",
                          WebkitTextStroke: "1px rgba(0,0,0,0.55)",
                          textShadow:
                            "0 1px 2px rgba(0,0,0,0.6), 0 0 2px rgba(0,0,0,0.6)",
                          whiteSpace: "nowrap",
                          padding: "2px 6px",
                          borderRadius: "6px",
                          background: "rgba(0,0,0,0.22)", // guaranteed contrast
                          boxShadow: "0 1px 2px rgba(0,0,0,0.25)",
                        }}
                      >
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Center hub (slightly smaller to avoid covering labels) */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white shadow-md border border-black/10" />

              {/* Pointer at top */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[18px] border-b-red-600 drop-shadow" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpinWheelSection;
