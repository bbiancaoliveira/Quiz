const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("btn"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

//Lista de questoes
let questions = [
    {
        question: "O que significa MHB?",
        choice1: "Movimento heteronormativo brasileiro",
        choice2: "Movimento homossexualidade do Brasil",
        choice3: "Movimento homossexual brasileiro",
        answer: 3        
    },
    {
        question: "O que significa GLS?",
        choice1: "Gays, Lésbicas e Simpatizantes",
        choice2: "Genero, Legalidade e Sexualidade",
        choice3: "Gays, Lésbicas e Safados",
        answer: 1
    },
    {
        question: "O que é Transgênero?",
        choice1: "Pessoa cuja identidade de gênero coincide com o sexo biológico",
        choice2: "Pessoa cuja identidade de gênero difere do sexo biológico",
        choice3: "Pessoa que se identifica com sua orientação sexual",
        answer: 2
    },
    {
        question: "O que significa LGBT?",
        choice1: "Lésbicas, Gays, Bissexuais e Two-spirit",
        choice2: "Lésbicas, Gays, Bissexuais e Travestis, Transexuais ou Transgêneros",
        choice3: "Lésbicas, Gays, Binários e em Transição",
        answer: 2
    },
    {
        question: "O que é Orientaçao Sexual?",
        choice1: "Termo que está relacionado com as diferentes formas de atração afetiva e sexual de cada um." ,
        choice2: "É a forma que a pessoa se expessa.",
        choice3: "Termo que está relacionado as pessoas não se identificam com sua orientação sexual.",
        answer: 1
    },
    {        
        question: "O que significa LGBTQIA+?",
        choice1: "Lésbicas, Gays, Binários, Transexuais, Queer, Intersexuais e Assexuais",
        choice2: "Lésbicas, Gays, Bissexuais, Travestis, Queridos, Inteirados e Apaixonados ",
        choice3: "Lésbicas, Gays, Bissexuais, Travestis, Transexuais ou Transgêneros, Queer, Intersexuais e Assexuais, Arromânticos ou Aliados (Simpatizantes)",
        answer: 3
    },
    {
        question: "O que é Pansexual?",
        choice1: "Pessoa que sente atração sexual ou romântica por qualquer sexo ou identidade de gênero.",
        choice2: "Mulher que sente atração sexual/afetiva por outras mulheres.",
        choice3: "Pessoa que se monta de acordo com o gênero oposto para performances artísticas.",
        answer: 1
    },
    {
        question: "O que significa Identidade de Gênero?",
        choice1: "É a forma que a pessoa se relaciona.",
        choice2: "É a forma que a pessoa se expessa.",
        choice3: "É a forma que a pessoa se entende como um indivíduo social.",
        answer: 3
    },
    {
        question: "O que Assexual?",
        choice1: "Pessoas que se identificam com sua orientação sexual.",
        choice2: "Pessoas que sentem atração por qualquer gênero.",
        choice3: "Pessoas que não possuem desejos sexuais.",
        answer: 3
    }
];

//Constantes
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if(availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem("mostRecentScore", score);
        //ir para final da página        
        return window.location.assign("end.html");
    }

    questionCounter++;
    questionCounterText.innerHTML = `${questionCounter}/${MAX_QUESTIONS}`; /*atualizar contagem das questoes*/

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return ;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        
        const classToApply = 
            selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
            //console.log(classToApply);
            
        if(classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }
        
        selectedChoice.parentElement.classList.add(classToApply);
        
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);           

        console.log(classToApply);
    });
});

//Incrementar Pontuacao
incrementScore = num => {
    score +=num;
    scoreText.innerHTML = score;
}

startGame();


