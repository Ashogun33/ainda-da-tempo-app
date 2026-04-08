export default function Home({ onStart }) {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center">
        <div className="max-w-3xl">
          <span className="mb-4 inline-block rounded-full border border-yellow-500/40 bg-yellow-500/10 px-4 py-1 text-sm text-yellow-400">
            Diagnóstico inicial
          </span>

          <h1 className="text-4xl font-extrabold text-yellow-400 md:text-6xl">
            Ainda Dá Tempo
          </h1>

          <p className="mt-6 text-zinc-300">
            Um app para ajudar pessoas 40+ a enxergar sua situação atual com mais clareza.
          </p>

          <button
            onClick={onStart}
            className="mt-8 rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-black"
          >
            Começar diagnóstico
          </button>
        </div>
      </section>
    </main>
  )
}
