export default function Marquee({ text = "AVID CAFFEINE CONSUMER • CARPE DIEM • MEMENTO MORI • DPS HAS MY HEART •" }: { text?: string }) {
  return (
    <div aria-hidden="true" className="marquee-wrapper">
      <div className="marquee-track">
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
}
