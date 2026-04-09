export default function Result({ result, onRestart, onNextStep }) {
  if (result?.error) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <p className="text-lg text-red-400">{result.error}</p>

          <button
            onClick={onRestart}
            className="mt-6 rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-black"
          >
            Voltar
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <section className="mx-auto max-w-3xl">
        <button
          onClick={onRestart}
          className="mb-8 rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:border-yellow-400 hover:text-yellow-400"
        >
          ← Voltar ao início
        </button>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8">
          <span className="mb-4 inline-block rounded-full border border-yellow-500/40 bg-yellow-500/10 px-4 py-1 text-sm font-medium text-yellow-400">
            Diagnóstico inicial
          </span>

          <h1 className="text-3xl font-extrabold leading-tight text-yellow-400 md:text-4xl">
            Perfil: {formatPerfil(result.perfil)}
          </h1>

          <div className="mt-6 space-y-4 text-base leading-7 text-zinc-300 md:text-lg">
            {splitParagraphs(result.mensagem_base).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {result.amplificacao_emocional && (
            <p className="mt-6 text-base leading-7 text-zinc-400">
              {result.amplificacao_emocional}
            </p>
          )}

          <div className="mt-8 rounded-2xl border border-zinc-800 bg-black p-5">
            <h2 className="text-sm font-semibold text-yellow-400">
              Direção inicial
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-300">
              {result.direcao_base}
            </p>
          </div>

          {result.alertas_dinamicos?.length > 0 && (
            <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/5 p-5">
              <h2 className="text-sm font-semibold text-red-400">
                Pontos de atenção
              </h2>

              <div className="mt-3 space-y-4 text-sm text-red-300">
                {result.alertas_dinamicos.map((alerta) => (
                  <div key={alerta.id}>
                    <p className="font-semibold">{alerta.titulo}</p>
                    {splitParagraphs(alerta.mensagem).map((paragraph, index) => (
                      <p key={index} className="mt-1 leading-7">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 rounded-2xl border border-zinc-800 bg-black p-5">
            <h2 className="text-sm font-semibold text-yellow-400">
              Leitura dos seus números
            </h2>

            <ul className="mt-3 space-y-2 text-sm text-zinc-400">
              <li>
                Saldo:{' '}
                <span className="text-white">
                  R$ {formatCurrency(result.metricas.saldo)}
                </span>
              </li>
              <li>Dívidas: {percent(result.metricas.peso_divida)}</li>
              <li>Variável: {percent(result.metricas.peso_variavel)}</li>
              <li>Futuro: {percent(result.metricas.peso_futuro)}</li>
              <li>Essencial: {percent(result.metricas.peso_essencial)}</li>
            </ul>
          </div>

          <div className="mt-8">
            <p className="text-base leading-7 text-zinc-300">
              {result.cta_base}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={onNextStep}
              className="rounded-xl bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:scale-[1.02]"
            >
              Ver próximo passo
            </button>

            <button
              onClick={onRestart}
              className="rounded-xl border border-zinc-700 px-6 py-3 font-semibold text-white transition hover:border-yellow-400 hover:text-yellow-400"
            >
              Refazer diagnóstico
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

function formatPerfil(perfil) {
  const map = {
    sobrevivente: 'Sobrevivente',
    desorganizado: 'Desorganizado',
    estavel: 'Estável',
    em_evolucao: 'Em evolução',
  }

  return map[perfil] || perfil
}

function percent(value) {
  return `${Math.round(value * 100)}%`
}

function formatCurrency(value) {
  return Number(value).toFixed(2)
}

function splitParagraphs(text) {
  return String(text).split('\n\n')
}
