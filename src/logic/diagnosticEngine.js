function toNumber(value) {
  const numeric = Number(value)
  return Number.isFinite(numeric) ? numeric : 0
}

function round(value) {
  return Math.round(value * 100) / 100
}

export function getDiagnosticResult(answers) {
  const renda = toNumber(answers.numbers.renda)
  const essencial = toNumber(answers.numbers.essencial)
  const dividas = toNumber(answers.numbers.dividas)
  const variavel = toNumber(answers.numbers.variavel)
  const futuro = toNumber(answers.numbers.futuro)

  if (renda <= 0) {
    return {
      error: 'A renda precisa ser maior que zero para fechar o diagnóstico.',
    }
  }

  const saldo = renda - (essencial + dividas + variavel + futuro)

  const pesoDivida = dividas / renda
  const pesoVariavel = variavel / renda
  const pesoFuturo = futuro / renda
  const pesoEssencial = essencial / renda

  let perfil = ''

  if (saldo < 0 || essencial + dividas > renda) {
    perfil = 'sobrevivente'
  } else if (pesoVariavel > 0.3) {
    perfil = 'desorganizado'
  } else if (pesoFuturo < 0.1) {
    perfil = 'estavel'
  } else {
    perfil = 'em_evolucao'
  }

  const alertas = getDynamicAlerts({
    pesoDivida,
    pesoVariavel,
    futuro,
    pesoEssencial,
    emotion: answers.emotion,
  })

  const baseContent = getBaseContent(perfil)
  const emotionalContent = getEmotionalAmplification(answers.emotion)

  return {
    perfil,
    mensagem_base: baseContent.mensagem_base,
    amplificacao_emocional: emotionalContent,
    direcao_base: baseContent.direcao_base,
    cta_base: baseContent.cta_base,
    alertas_dinamicos: alertas,
    metricas: {
      saldo: round(saldo),
      peso_divida: round(pesoDivida),
      peso_variavel: round(pesoVariavel),
      peso_futuro: round(pesoFuturo),
      peso_essencial: round(pesoEssencial),
      renda: round(renda),
      essencial: round(essencial),
      dividas: round(dividas),
      variavel: round(variavel),
      futuro: round(futuro),
    },
    respostas: {
      dor: answers.pain,
      emocao: answers.emotion,
    },
  }
}

function getBaseContent(perfil) {
  const content = {
    sobrevivente: {
      mensagem_base:
        'Hoje o seu dinheiro não está sustentando a sua vida como deveria.\n\nNão é falta de esforço.\n\nÉ que a sua estrutura financeira perdeu o controle.',
      direcao_base:
        'Antes de pensar em crescer, você precisa recuperar o controle do básico.',
      cta_base:
        'Use o app para enxergar sua realidade e reorganizar sua base a partir de hoje.',
    },
    desorganizado: {
      mensagem_base:
        'O problema não é o quanto você ganha.\n\nÉ que o seu dinheiro não tem direção.',
      direcao_base:
        'Você precisa entender para onde o dinheiro está indo antes de tentar mudar qualquer coisa.',
      cta_base:
        'Use o app para transformar confusão em clareza e retomar o controle do seu dinheiro.',
    },
    estavel: {
      mensagem_base:
        'Você conseguiu se manter.\n\nMas ainda não construiu segurança.',
      direcao_base:
        'O próximo passo é transformar estabilidade em proteção e margem de segurança.',
      cta_base:
        'Use o app para começar a organizar sua estrutura e construir segurança real.',
    },
    em_evolucao: {
      mensagem_base:
        'Você já saiu do caos.\n\nAgora precisa de consistência para continuar evoluindo.',
      direcao_base:
        'Continue organizando e comece a direcionar seu dinheiro com mais intenção.',
      cta_base:
        'Use o app para acompanhar sua evolução e manter consistência no que está funcionando.',
    },
  }

  return content[perfil]
}

function getEmotionalAmplification(emotion) {
  const map = {
    ansiedade: 'Isso gera uma sensação constante de pressão.',
    frustracao:
      'E isso pode dar a sensação de estar se esforçando sem sair do lugar.',
    medo: 'E isso faz qualquer imprevisto parecer uma ameaça.',
    culpa:
      'E isso pode vir acompanhado da sensação de que você poderia ter feito diferente.',
    cansado:
      'E com o tempo isso vai desgastando sua energia para tentar mudar.',
  }

  return map[emotion] || ''
}

function getDynamicAlerts({
  pesoDivida,
  pesoVariavel,
  futuro,
  pesoEssencial,
  emotion,
}) {
  const alerts = []

  if (pesoDivida > 0.25) {
    alerts.push({
      id: 'pressao_divida',
      titulo: 'Pressão por dívida',
      mensagem:
        'Parte do seu dinheiro já está comprometida com decisões passadas.\n\nSe isso não for controlado, pode comprometer toda a sua estrutura.',
    })
  }

  if (pesoVariavel > 0.4) {
    alerts.push({
      id: 'variavel_critico',
      titulo: 'Variável crítico',
      mensagem:
        'Uma parte relevante do seu dinheiro hoje está sem direção clara.',
    })
  }

  if (futuro === 0) {
    alerts.push({
      id: 'futuro_zerado',
      titulo: 'Futuro zerado',
      mensagem:
        'Hoje você não está construindo nenhuma proteção para o futuro.',
    })
  }

  if (pesoEssencial > 0.7) {
    alerts.push({
      id: 'essencial_muito_alto',
      titulo: 'Essencial muito alto',
      mensagem:
        'Sua estrutura básica já está consumindo quase tudo o que você ganha.',
    })
  }

  if (['ansiedade', 'medo', 'cansado'].includes(emotion)) {
    alerts.push({
      id: 'emocao_sensivel',
      titulo: 'Emoção sensível',
      mensagem:
        'E isso mostra que essa situação já está afetando você mais do que deveria.',
    })
  }

  return alerts
}
