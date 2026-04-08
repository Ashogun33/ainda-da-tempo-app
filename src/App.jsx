import { useMemo, useState } from 'react'
import Home from './screens/Home'
import Diagnostic from './screens/Diagnostic'
import Result from './screens/Result'
import NextStep from './screens/NextStep'
import { getDiagnosticResult } from './data/diagnosticRules'

export default function App() {
  const [screen, setScreen] = useState('home')
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState({
    situation: '',
    focus: '',
  })

  function handleStart() {
    setScreen('diagnostic')
    setStep(1)
  }

  function handleRestart() {
    setScreen('home')
    setStep(1)
    setAnswers({
      situation: '',
      focus: '',
    })
  }

  function handleSelect(field, value) {
    setAnswers((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  function handleContinue() {
    if (step === 1 && answers.situation) {
      setStep(2)
      return
    }

    if (step === 2 && answers.focus) {
      setScreen('result')
    }
  }

  function handleBack() {
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
      />
    )
  }

  if (screen === 'result') {
    return (
      <Result
        result={result}
        answers={answers}
        onRestart={handleRestart}
        onNextStep={() => setScreen('next-step')}
      />
    )
  }

  if (screen === 'next-step') {
    return (
      <NextStep
        result={result}
        answers={answers}
        onBackToResult={() => setScreen('result')}
        onRestart={handleRestart}
      />
    )
  }

  return null
}
