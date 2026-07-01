export default function StarRating({
  rating,
  size = "sm",
}: {
  rating: number;
  size?: "sm" | "lg";
}) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);
  const starClass = size === "lg" ? "text-lg" : "text-sm";

  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: full }).map((_, i) => (
        <span key={`f-${i}`} className={`text-orange-400 ${starClass}`}>★</span>
      ))}
      {hasHalf && <span className={`text-orange-300 ${starClass}`}>★</span>}
      {Array.from({ length: empty }).map((_, i) => (
        <span key={`e-${i}`} className={`text-slate-600 ${starClass}`}>★</span>
      ))}
      <span className={`ml-1 font-semibold text-slate-300 ${size === "lg" ? "text-sm" : "text-xs"}`}>
        {rating}/5
      </span>
    </span>
  );
}
