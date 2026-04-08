export function getDiagnosticResult(answers) {
  if (
    answers.situation === 'nao_consigo_me_organizar' &&
    answers.focus === 'organizar_financas'
  ) {
    return {
      title: 'Perfil: Clareza e Organização',
      description:
        'Você parece estar em um momento de reorganização prática. Antes de pensar em crescer, o mais importante é recuperar visibilidade sobre sua vida financeira e criar estrutura básica.',
      nextTitle: 'Comece pela organização visível',
      nextDescription:
        'Seu próximo passo não é tentar ganhar mais imediatamente. Primeiro, você precisa enxergar melhor entradas, saídas, dívidas, prioridades e vazamentos.',
      nextAction:
        'Liste suas fontes de renda, anote seus gastos fixos e variáveis, identifique atrasos e separe o que é essencial do que é impulso.',
    }
  }

  if (
    answers.situation === 'preciso_recomecar' &&
    answers.focus === 'sair_do_caos'
  ) {
    return {
      title: 'Perfil: Recomeço Consciente',
      description:
        'Seu momento pede reconstrução com calma, lucidez e direção. O foco agora não é velocidade, e sim retomar controle sem fantasia e sem improviso.',
      nextTitle: 'Reconstrua a base antes de acelerar',
      nextDescription:
        'Seu próximo passo é reduzir confusão e criar um ponto mínimo de estabilidade. Você não precisa resolver tudo hoje, mas precisa parar de operar no escuro.',
      nextAction:
        'Defina suas urgências reais, interrompa decisões impulsivas e monte uma visão simples da sua situação atual: renda, dívidas, contas atrasadas e prioridades.',
    }
  }

  if (
    answers.situation === 'quero_crescer_com_direcao' &&
    answers.focus === 'aumentar_renda'
  ) {
    return {
      title: 'Perfil: Crescimento com Direção',
      description:
        'Você já demonstra intenção de avançar, mas precisa alinhar crescimento com estratégia. O melhor próximo passo é estruturar melhor suas decisões para não crescer no escuro.',
      nextTitle: 'Cresça com critério, não no impulso',
      nextDescription:
        'Seu próximo passo é identificar onde existe potencial real de avanço e quais decisões precisam de mais método para gerar crescimento sustentável.',
      nextAction:
        'Escolha um objetivo financeiro principal, revise seus esforços atuais e defina uma linha clara entre ações que geram resultado e ações que só ocupam tempo.',
    }
  }

  return {
    title: 'Perfil: Diagnóstico Inicial',
    description:
      'Sua resposta mostra que você precisa de mais clareza antes de tomar decisões maiores. O ponto de partida agora é entender sua realidade, organizar prioridades e seguir com direção.',
    nextTitle: 'Seu próximo passo é criar leitura da realidade',
    nextDescription:
      'Antes de pensar em expansão ou mudanças maiores, você precisa organizar a base e transformar confusão em visão prática.',
    nextAction:
      'Anote o que entra, o que sai, o que está atrasado, o que é prioridade e o que está consumindo energia sem gerar avanço.',
  }
}
