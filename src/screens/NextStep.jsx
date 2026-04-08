export default function NextStep({ result, answers, onBackToResult, onRestart }) {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <section className="mx-auto max-w-3xl">
        <button
          onClick={onBackToResult}
          className="mb-8 rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:border-yellow-400 hover:text-yellow-400"
        >
          ← Voltar ao resultado
        </button>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8">
          <span className="mb-4 inline-block rounded-full border border-yellow-500/40 bg-yellow-500/10 px-4 py-1 text-sm font-medium text-yellow-400">
            Próximo passo recomendado
          </span>

          <h1 className="text-3xl font-extrabold leading-tight text-yellow-400 md:text-4xl">
            {result.nextTitle}
          </h1>

          <p className="mt-6 text-base leading-7 text-zinc-300 md:text-lg">
            {result.nextDescription}
          </p>

          <div className="mt-8 rounded-2xl border border-zinc-800 bg-black p-5">
            <h2 className="text-sm font-semibold text-yellow-400">
              Ação inicial sugerida
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-300">
              {result.nextAction}
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-zinc-800 bg-black p-5">
            <h2 className="text-sm font-semibold text-yellow-400">
              Base usada para esta sugestão
            </h2>

            <ul className="mt-3 space-y-2 text-sm text-zinc-400">
              <li>
                <span className="text-white">Situação atual:</span> {labelSituation(answers.situation)}
              </li>
              <li>
                <span className="text-white">Maior foco agora:</span> {labelFocus(answers.focus)}
              </li>
            </ul>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={onRestart}
              className="rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:scale-[1.02]"
            >
              Refazer diagnóstico
            </button>

            <button
              onClick={onBackToResult}
              className="rounded-xl border border-zinc-700 px-6 py-3 font-semibold text-white transition hover:border-yellow-400 hover:text-yellow-400"
            >
              Voltar
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

function labelSituation(value) {
  const map = {
    nao_consigo_me_organizar: 'Não consigo me organizar financeiramente',
    preciso_recomecar: 'Preciso recomeçar minha vida financeira',
    quero_crescer_com_direcao: 'Quero crescer, mas com direção',
  }

  return map[value] || '-'
}

function labelFocus(value) {
  const map = {
    organizar_financas: 'Organizar minhas finanças',
    sair_do_caos: 'Sair do caos e recomeçar',
    aumentar_renda: 'Aumentar renda com direção',
  }

  return map[value] || '-'
}
