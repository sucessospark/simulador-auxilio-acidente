// Dados das perguntas e opções do quiz
const questions = [
  {
    title: 'Tipo de acidente',
    options: ['Acidente de trabalho', 'Acidente de trajeto', 'Acidente fora do trabalho']
  },
  {
    title: 'Tempo do acidente',
    options: ['Menos de 6 meses', 'Entre 6 meses e 2 anos', 'Mais de 2 anos']
  },
  {
    title: 'Afastamento',
    options: ['Fiquei afastado pelo INSS', 'Fiquei afastado sem benefício', 'Não fiquei afastado']
  },
  {
    title: 'Benefício anterior',
    options: ['Auxílio-doença acidentário (B91)', 'Auxílio-doença comum (B31)', 'Não recebi benefício']
  },
  {
    title: 'Sequela',
    options: ['Sim', 'Não', 'Não sei informar']
  },
  {
    title: 'Tipo de sequela',
    options: [
      'Redução de força ou movimento',
      'Limitação funcional parcial',
      'Amputação parcial ou total',
      'Sequela sensorial',
      'Outro tipo'
    ]
  },
  {
    title: 'Situação profissional',
    options: ['Voltei à mesma função', 'Voltei em função diferente', 'Não consegui retornar']
  },
  {
    title: 'Documentos',
    options: ['CAT', 'Laudos médicos', 'Exames', 'Nenhum documento']
  }
];

// Elementos principais da interface
const introSection = document.getElementById('intro');
const quizSection = document.getElementById('quiz');
const resultSection = document.getElementById('result');

const startBtn = document.getElementById('startBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');
const ctaBtn = document.getElementById('ctaBtn');

const progressFill = document.querySelector('.progress-fill');
const progressBar = document.querySelector('.progress-bar');
const currentStepEl = document.getElementById('currentStep');
const totalStepsEl = document.getElementById('totalSteps');
const questionTitle = document.getElementById('question-title');
const optionsContainer = document.getElementById('options');

let currentQuestion = 0;
const answers = new Array(questions.length).fill(null);

totalStepsEl.textContent = questions.length.toString();

// Exibe a primeira pergunta quando o usuário clica em "Começar"
startBtn.addEventListener('click', () => {
  introSection.classList.add('hidden');
  quizSection.classList.remove('hidden');
  renderQuestion();
});

// Navegação para a questão anterior
prevBtn.addEventListener('click', () => {
  if (currentQuestion > 0) {
    currentQuestion -= 1;
    renderQuestion();
  }
});

// Navegação para a próxima questão ou resultado final
nextBtn.addEventListener('click', () => {
  const selected = answers[currentQuestion];
  if (selected === null) return;

  const isLastQuestion = currentQuestion === questions.length - 1;
  if (isLastQuestion) {
    showResult();
    return;
  }

  currentQuestion += 1;
  renderQuestion();
});

// Permite refazer o questionário
restartBtn.addEventListener('click', () => {
  currentQuestion = 0;
  answers.fill(null);
  resultSection.classList.add('hidden');
  quizSection.classList.remove('hidden');
  renderQuestion();
});

// Botão de CTA pode redirecionar ou apenas informar a próxima etapa
ctaBtn.addEventListener('click', () => {
  alert('Um especialista poderá analisar os detalhes do seu caso na próxima etapa.');
});

// Renderiza a pergunta atual
function renderQuestion() {
  const { title, options } = questions[currentQuestion];

  questionTitle.textContent = title;
  optionsContainer.innerHTML = '';

  options.forEach((optionText, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'option-btn';
    button.textContent = optionText;
    button.setAttribute('data-index', index.toString());

    if (answers[currentQuestion] === optionText) {
      button.classList.add('selected');
    }

    button.addEventListener('click', () => selectOption(index, optionText));
    optionsContainer.appendChild(button);
  });

  updateProgress();
  updateNavigation();
}

// Seleciona uma opção e atualiza a interface
function selectOption(index, value) {
  answers[currentQuestion] = value;

  [...optionsContainer.children].forEach((child, idx) => {
    child.classList.toggle('selected', idx === index);
  });

  nextBtn.disabled = false;
}

// Atualiza o estado da barra de progresso e contador
function updateProgress() {
  const percentage = ((currentQuestion + 1) / questions.length) * 100;
  progressFill.style.width = `${percentage}%`;
  progressBar.setAttribute('aria-valuenow', percentage.toFixed(0));
  currentStepEl.textContent = (currentQuestion + 1).toString();
}

// Ajusta botões de navegação conforme o passo atual
function updateNavigation() {
  prevBtn.disabled = currentQuestion === 0;
  const answered = answers[currentQuestion] !== null;
  nextBtn.disabled = !answered;
  nextBtn.textContent = currentQuestion === questions.length - 1 ? 'Ver resultado' : 'Próxima';
}

// Mostra a tela de resultado final
function showResult() {
  quizSection.classList.add('hidden');
  resultSection.classList.remove('hidden');
}
