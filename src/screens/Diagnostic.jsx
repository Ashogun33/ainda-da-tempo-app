import OptionCard from '../components/OptionCard'

export default function Diagnostic({
  step,
  answers,
  onBack,
  onCancel,
  onContinue,
  onSelect,
}) {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <section className="mx-auto max-w-3xl">
        <button
          onClick={onBack}
          className="mb-8 rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:border-yellow-400 hover:text-yellow-400"
        >
          ← Voltar
        </button>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8">
          <span className="mb-4 inline-block rounded-full border border-yellow-500/40 bg-yellow-500/10 px-4 py-1 text-sm font-medium text-yellow-400">
            Etapa {step} de 2
          </span>

          {step === 1 && (
            <>
              <h1 className="text-3xl font-extrabold leading-tight text-yellow-400 md:text-4xl">
                Hoje, qual dessas situações mais se parece com você?
              </h1>

              <p className="mt-4 text-base leading-7 text-zinc-300">
                Escolha a opção que mais representa sua realidade atual.
              </p>

              <div className="mt-8 grid gap-4">
                <OptionCard
                  title="Não consigo me organizar financeiramente"
                  description="Meu dinheiro entra e sai, mas eu não tenho clareza real do que está acontecendo."
                  isSelected={answers.situation === 'nao_consigo_me_organizar'}
                  onClick={() =>
                    onSelect('situation', 'nao_consigo_me_organizar')
                  }
                />

                <OptionCard
                  title="Preciso recomeçar minha vida financeira"
                  description="Sinto que errei muito, perdi tempo e agora preciso reconstruir com mais consciência."
                  isSelected={answers.situation === 'preciso_recomecar'}
                  onClick={() => onSelect('situation', 'preciso_recomecar')}
                />

                <OptionCard
                  title="Quero crescer, mas com direção"
                  description="Já dei alguns passos, mas sinto que estou avançando sem estrutura."
                  isSelected={answers.situation === 'quero_crescer_com_direcao'}
                  onClick={() =>
                    onSelect('situation', 'quero_crescer_com_direcao')
                  }
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="text-3xl font-extrabold leading-tight text-yellow-400 md:text-4xl">
                Qual é o seu maior foco neste momento?
              </h1>

              <p className="mt-4 text-base leading-7 text-zinc-300">
                Escolha o que mais importa para você agora.
              </p>

              <div className="mt-8 grid gap-4">
                <OptionCard
                  title="Organizar minhas finanças"
                  description="Quero entender melhor meu dinheiro, meus gastos e minhas prioridades."
                  isSelected={answers.focus === 'organizar_financas'}
                  onClick={() => onSelect('focus', 'organizar_financas')}
                />

                <OptionCard
                  title="Sair do caos e recomeçar"
                  description="Quero retomar o controle e reconstruir com mais calma e lucidez."
                  isSelected={answers.focus === 'sair_do_caos'}
                  onClick={() => onSelect('focus', 'sair_do_caos')}
                />

                <OptionCard
                  title="Aumentar renda com direção"
                  description="Quero crescer, mas sem repetir erros e sem agir no impulso."
                  isSelected={answers.focus === 'aumentar_renda'}
                  onClick={() => onSelect('focus', 'aumentar_renda')}
                />
              </div>
            </>
          )}

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={onContinue}
              className={`rounded-xl px-6 py-3 font-semibold transition ${
                canContinue(step, answers)
                  ? 'bg-yellow-400 text-black hover:scale-[1.02]'
                  : 'cursor-not-allowed bg-zinc-800 text-zinc-500'
              }`}
            >
              {step === 2 ? 'Ver resultado' : 'Continuar'}
            </button>

            <button
              onClick={onCancel}
              className="rounded-xl border border-zinc-700 px-6 py-3 font-semibold text-white transition hover:border-yellow-400 hover:text-yellow-400"
            >
              Cancelar
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

function canContinue(step, answers) {
  if (step === 1) return Boolean(answers.situation)
  if (step === 2) return Boolean(answers.focus)
  return false
}
