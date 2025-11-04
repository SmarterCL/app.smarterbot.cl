export default function BackgroundPattern() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[#050508]" />
      <div
        className="absolute inset-0 bg-[linear-gradient(#1d1d20_1px,transparent_1px),linear-gradient(90deg,#1d1d20_1px,transparent_1px)] opacity-25"
        style={{ backgroundSize: "48px 48px" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1f2937_0%,transparent_55%)] opacity-60" />
    </div>
  )
}
