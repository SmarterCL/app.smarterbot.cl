export default function SoftBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/50 to-background" />
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(20, 160, 140, 0.18), transparent 55%), radial-gradient(circle at 80% 10%, rgba(20, 160, 140, 0.15), transparent 60%)",
        }}
      />
    </div>
  )
}
