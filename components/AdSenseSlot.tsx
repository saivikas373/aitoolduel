interface AdSenseSlotProps {
  position?: "top" | "mid" | "bottom";
  className?: string;
}

export default function AdSenseSlot({
  position = "mid",
  className = "",
}: AdSenseSlotProps) {
  const heights: Record<string, string> = {
    top: "min-h-[90px]",
    mid: "min-h-[250px]",
    bottom: "min-h-[90px]",
  };

  return (
    <div
      className={`adsense-slot ${heights[position]} ${className}`}
      data-ad-position={position}
      aria-hidden="true"
    />
  );
}
