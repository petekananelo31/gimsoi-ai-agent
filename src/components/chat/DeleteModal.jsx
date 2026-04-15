export default function DeleteModal({ chatTitle, onConfirm, onCancel }) {
  return (
    <div className="absolute inset-0 bg-black/50 z-30 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl p-5 w-full max-w-xs shadow-xl">
        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-3">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" className="text-red-500">
            <polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <h3 className="font-semibold text-gray-800 text-sm mb-1">Delete chat?</h3>
        <p className="text-xs text-gray-500 mb-4">
          "<span className="font-medium text-gray-700">{chatTitle}</span>" will be permanently deleted.
        </p>
        <div className="flex gap-2">
          <button onClick={onCancel}
            className="flex-1 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition">
            Cancel
          </button>
          <button onClick={onConfirm}
            className="flex-1 py-2 rounded-xl bg-red-500 text-white text-sm hover:bg-red-600 transition">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}