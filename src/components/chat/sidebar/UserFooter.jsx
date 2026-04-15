export default function UserFooter({ darkMode = false }) {
  return (
    <div className={`p-3 flex items-center gap-2 border-t ${darkMode ? "border-white/10" : "border-gray-200"}`}>
      <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0">
        U
      </div>
      <div>
        <p className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-700"}`}>User</p>
        {darkMode && <p className="text-xs text-white/40">Free plan</p>}
      </div>
    </div>
  );
}