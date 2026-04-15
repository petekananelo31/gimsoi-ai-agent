export default function BotIcon({ size = 8 }) {
  const px = size * 4;
  return (
    <div style={{ width: px, height: px }}
      className="bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
      <svg viewBox="0 0 40 40" width={px * 0.45} height={px * 0.45}>
        <rect x="8" y="12" width="24" height="18" rx="4" fill="white" />
        <rect x="14" y="17" width="5" height="5" rx="1.5" fill="#2563eb" />
        <rect x="21" y="17" width="5" height="5" rx="1.5" fill="#2563eb" />
        <rect x="15" y="26" width="10" height="2" rx="1" fill="#2563eb" />
        <rect x="18" y="8" width="4" height="5" rx="1" fill="white" />
      </svg>
    </div>
  );
}