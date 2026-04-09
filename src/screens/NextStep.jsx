import { useState } from 'react'

export default function NextStep({ result, onBackToResult, onRestart }) {
  const [channel, setChannel] = useState(null)

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

          {/* ================= HEAD ================= */}
          <h1 className="text-3xl font-extrabold leading-tight text-yellow-400 md:text-4xl">
            Você já entendeu o que está acontecendo.
          </h1>

          <p className="mt-4 text-base leading-7 text-zinc-300 md:text-lg">
            Agora precisa agir com clareza.
          </p>

          {/* VARIAÇÃO POR PERFIL */}
          <p className="mt-4 text-base text-zinc-400">
            {perfilAdjustment(result.perfil)}
          </p>

          {/* ================= PROMESSA ================= */}
          <div className="mt-8">
            <p className="text-base text-zinc-300">
              Eu organizei um material simples para te ajudar a dar o próximo passo sem complicação.
            </p>

            <p className="mt-3 text-sm text-zinc-400">
              Um guia direto para você começar a organizar sua vida financeira na prática — com base na sua realidade.
            </p>
          </div>

          {/* ================= VALOR ================= */}
          <div className="mt-8 rounded-2xl border border-zinc-800 bg-black p-5">
            <h2 className="text-sm font-semibold text-yellow-400">
              O que você vai receber
            </h2>

            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              <li>✔ Estrutura simples de organização financeira</li>
              <li>✔ Como parar de perder dinheiro sem perceber</li>
              <li>✔ Primeiros passos para sair do caos financeiro</li>
            </ul>
          </div>

          {/* ================= CTA ================= */}
          <button className="mt-8 w-full rounded-xl bg-yellow-400 px-6 py-4 font-semibold text-black transition hover:scale-[1.02]">
            Receber o guia agora
          </button>

          {/* ================= CAPTURA ================= */}
          <div className="mt-8">
            <p className="text-sm text-zinc-400">
              Escolha como você quer receber:
            </p>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => setChannel('email')}
                className={`flex-1 rounded-xl border px-4 py-3 text-sm ${
                  channel === 'email'
                    ? 'border-yellow-400 text-yellow-400'
                    : 'border-zinc-700 text-zinc-300'
                }`}
              >
                📩 Receber no meu email
              </button>

              <button
                onClick={() => setChannel('whatsapp')}
                className={`flex-1 rounded-xl border px-4 py-3 text-sm ${
                  channel === 'whatsapp'
                    ? 'border-yellow-400 text-yellow-400'
                    : 'border-zinc-700 text-zinc-300'
                }`}
              >
                📲 Receber no WhatsApp
              </button>
            </div>

            <p className="mt-3 text-xs text-zinc-500">
              Sem spam. Só conteúdo direto e útil.
            </p>
          </div>

          {/* ================= CONTINUIDADE ================= */}
          <div className="mt-10 border-t border-zinc-800 pt-6">
            <p className="text-sm text-zinc-400">
              Enquanto isso, você pode continuar:
            </p>

            <div className="mt-4 space-y-4">
              <button className="w-full rounded-xl border border-zinc-700 px-4 py-3 text-left text-sm text-zinc-300 hover:border-yellow-400 hover:text-yellow-400">
                ▶️ Assistir os próximos vídeos
              </button>

              <button className="w-full rounded-xl border border-zinc-700 px-4 py-3 text-left text-sm text-zinc-300 hover:border-yellow-400 hover:text-yellow-400">
                📊 Usar o app no dia a dia
              </button>
            </div>
          </div>

          {/* ================= URGÊNCIA ================= */}
          <p className="mt-8 text-xs text-zinc-500">
            Quanto mais você adiar, mais difícil fica organizar depois.
          </p>

          {/* ================= ACTIONS ================= */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
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

/* ================= LÓGICA ================= */

function perfilAdjustment(perfil) {
  const map = {
    sobrevivente:
      'Você não precisa fazer tudo de uma vez. Mas precisa começar agora.',
    desorganizado:
      'Você vai perceber rápido onde está perdendo dinheiro.',
    estavel:
      'O foco agora é sair do lugar com segurança.',
    em_evolucao:
      'Agora é sobre consistência e direção.',
  }

  return map[perfil] || ''
}
