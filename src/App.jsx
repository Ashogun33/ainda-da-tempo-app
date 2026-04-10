import { useMemo, useState } from 'react'
import Home from './screens/Home'
import Diagnostic from './screens/Diagnostic'
import Result from './screens/Result'
import { getDiagnosticResult } from './logic/diagnosticEngine'

export default function App() {
  const [screen, setScreen] = useState('home')
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState({
    pain: '',
    emotion: '',
    numbers: {
      renda: '',
      essencial: '',
      dividas: '',
      variavel: '',
      futuro: '',
    },
  })

  function handleStart() {
    setScreen('diagnostic')
    setStep(1)
  }

  function handleRestart() {
    setScreen('home')
    setStep(1)
    setAnswers({
      pain: '',
      emotion: '',
      numbers: {
        renda: '',
        essencial: '',
        dividas: '',
        variavel: '',
        futuro: '',
      },
    })
  }

  function handleSelect(field, value) {
    setAnswers((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  function handleNumberChange(field, value) {
    setAnswers((prev) => ({
      ...prev,
      numbers: {
        ...prev.numbers,
        [field]: value,
      },
    }))
  }

  function handleContinue() {
    if (step === 1 && answers.pain) {
      setStep(2)
      return
    }

    if (step === 2 && answers.emotion) {
      setStep(3)
      return
    }

    if (step === 3) {
      const diagnostic = getDiagnosticResult(answers)

      if (diagnostic.error) {
        alert(diagnostic.error)
        return
      }

      setScreen('result')
    }
  }

  function handleBack() {
    if (step === 3) {
      setStep(2)
      return
    }

    if (step === 2) {
      setStep(1)
      return
    }

    handleRestart()
  }

  const result = useMemo(() => getDiagnosticResult(answers), [answers])

  if (screen === 'home') {
    return <Home onStart={handleStart} />
  }

  if (screen === 'diagnostic') {
    return (
      <Diagnostic
        step={step}
        answers={answers}
        onBack={handleBack}
        onCancel={handleRestart}
        onContinue={handleContinue}
        onSelect={handleSelect}
        onNumberChange={handleNumberChange}
      />
    )
  }

  if (screen === 'result') {
    return <Result result={result} onRestart={handleRestart} />
  }

  return null
}
