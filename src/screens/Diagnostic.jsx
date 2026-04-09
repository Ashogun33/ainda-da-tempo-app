import OptionCard from '../components/OptionCard'
import { painOptions, emotionOptions } from '../data/diagnosticQuestions'

export default function Diagnostic({
  step,
  answers,
  onBack,
  onCancel,
  onContinue,
  onSelect,
  onNumberChange,
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
            Etapa {step} de 3
          </span>

          {step === 1 && (
            <>
              <h1 className="text-3xl font-extrabold leading-tight text-yellow-400 md:text-4xl">
                Qual dessas situações mais parece com a sua realidade hoje?
              </h1>

              <p className="mt-4 text-base leading-7 text-zinc-300">
                Escolha a opção que melhor descreve sua principal dor financeira.
              </p>

              <div className="mt-8 grid gap-4">
                {painOptions.map((option) => (
                  <OptionCard
                    key={option.id}
                    title={option.title}
                    description=""
                    isSelected={answers.pain === option.id}
                    onClick={() => onSelect('pain', option.id)}
                  />
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="text-3xl font-extrabold leading-tight text-yellow-400 md:text-4xl">
                E emocionalmente, o que mais descreve como você se sente?
              </h1>

              <p className="mt-4 text-base leading-7 text-zinc-300">
                Escolha a emoção que mais combina com sua situação atual.
              </p>

              <div className="mt-8 grid gap-4">
                {emotionOptions.map((option) => (
                  <OptionCard
                    key={option.id}
                    title={option.title}
                    description=""
                    isSelected={answers.emotion === option.id}
                    onClick={() => onSelect('emotion', option.id)}
                  />
                ))}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h1 className="text-3xl font-extrabold leading-tight text-yellow-400 md:text-4xl">
                Agora vamos olhar seus números
              </h1>

              <p className="mt-4 text-base leading-7 text-zinc-300">
                Preencha os valores médios mensais para o app gerar seu diagnóstico.
              </p>

              <div className="mt-8 grid gap-5">
                <NumberField
                  label="Renda mensal"
                  value={answers.numbers.renda}
                  onChange={(value) => onNumberChange('renda', value)}
                />

                <NumberField
                  label="Gastos essenciais"
                  value={answers.numbers.essencial}
                  onChange={(value) => onNumberChange('essencial', value)}
                />

                <NumberField
                  label="Dívidas"
                  value={answers.numbers.dividas}
                  onChange={(value) => onNumberChange('dividas', value)}
                />

                <NumberField
                  label="Gastos variáveis"
                  value={answers.numbers.variavel}
                  onChange={(value) => onNumberChange('variavel', value)}
                />

                <NumberField
                  label="Valor destinado ao futuro"
                  value={answers.numbers.futuro}
                  onChange={(value) => onNumberChange('futuro', value)}
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
              {step === 3 ? 'Ver resultado' : 'Continuar'}
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

function NumberField({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-zinc-300">
        {label}
      </span>
      <input
        type="number"
        min="0"
        step="0.01"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none transition focus:border-yellow-400"
        placeholder="0.00"
      />
    </label>
  )
}

function canContinue(step, answers) {
  if (step === 1) return Boolean(answers.pain)
  if (step === 2) return Boolean(answers.emotion)

  if (step === 3) {
    const { renda, essencial, dividas, variavel, futuro } = answers.numbers
    return (
      renda !== '' &&
      essencial !== '' &&
      dividas !== '' &&
      variavel !== '' &&
      futuro !== ''
    )
  }

  return false
}
