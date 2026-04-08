export default function OptionCard({ title, description, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl border p-5 text-left transition ${
        isSelected
          ? 'border-yellow-400 bg-yellow-400/10'
          : 'border-zinc-800 bg-black hover:border-yellow-400/50'
      }`}
    >
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="mt-2 text-sm text-zinc-400">{description}</p>
    </button>
  )
}
