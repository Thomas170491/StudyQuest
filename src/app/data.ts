import { Chapter, Subject, User } from "./interfaces"

export const usersData : User[] = [
    {
      id: '1',
      username: 'john_doe',
      email: 'john.doe@example.com',
      profilePictureUrl: 'https://example.com/profile/john_doe.png',
      schoolYear: '9ème',
      group: 'R3',
      isAuth: true
    },
    {
      id: '2',
      username: 'jane_smith',
      email: 'jane.smith@example.com',
      schoolYear: '9ème',
      group: 'R3',
      isAuth: false
    }
]

export const chapterData : Chapter[] = [
    {
        id :'1',
        title : 'Nombres naturels et décimaux',
        description : 'Sujets vus dans ce chapitre : Critères de divisibilité, Nombres premiers, PGDC et PPMC, Les 4 opérations avec les nombres décimux',
        subjectsId : ['nombres_premiers','2'],
        progress : [
            {
                userId : '1',
                progress : 0
            },

            {
                userId :'2',
                progress : 0
            }
        ],
        totalExercises : 50

    },

    {
      id :'2',
      title : 'Test Chapter',
      subjectsId : ['Test1','Test2'],
      progress : [
          {
              userId : '1',
              progress : 0
          },

          {
              userId :'2',
              progress : 0
          }
      ],
      totalExercises : 50

  }

   

]

export const subjectData : Subject[] =[

   {
    id: 'nombres_premiers',
    title: 'Nombres Premiers',
    description: 'Un nombre premier est un nombre divisible par un et par lui-même',
    chapterId : '1',
    
  }
]
export const ExerciseData = [
  {
    id: 'L1Q1',
    question: 'Lequel des nombres suivants est un nombre premier ?',
    options: ['A. 24', 'B. 31', 'C. 42', 'D. 50'],
    correctAnswer: 'B',
    feedback:
      '31 est un nombre premier car il est divisible seulement par 1 et par lui-même. En effet, 24 =6*4, 42=6*7 et 50 = 5*10',
    subjectId: 'nombres_premiers',
    level: 1,
    type: 'multiple_choice',
  },
  {
    id: 'L1Q2',
    question: 'Identifiez le nombre premier :',
    options: ['A. 55', 'B. 39', 'C. 61', 'D. 75'],
    correctAnswer: 'C',
    feedback:
      '61 est un nombre premier car il ne peut être divisé que par 1 et 61.En effet, 55 =5*11, 39=3*12 et 75 = 5*15',
    subjectId: 'nombres_premiers',
    level: 1,
    type: 'multiple_choice',
  },
  {
    id: 'L1Q3',
    question: 'Lequel de ces nombres est un nombre premier ?',
    options: ['A. 97', 'B. 85', 'C. 49', 'D. 81'],
    correctAnswer: 'A',
    feedback:
      "97 est un nombre premier car il n'a pas d'autres diviseurs que 1 et 97.En effet, 85= 5*17, 49=7*7 et 81 = 9*9",
    subjectId: 'nombres_premiers',
    level: 1,
    type: 'multiple_choice',
  },
  {
    id: 'L1Q4',
    question: 'Trouvez le nombre premier :',
    options: ['A. 27', 'B. 51', 'C. 71', 'D. 100'],
    correctAnswer: 'C',
    feedback:
      '71 est un nombre premier car il est divisible uniquement par 1 et 71.',
    subjectId: 'nombres_premiers',
    level: 1,
    type: 'multiple_choice',
  },
  {
    id: 'L1Q5',
    question: 'Lequel des nombres suivants est un nombre premier ?',
    options: ['A. 19', 'B. 57', 'C. 45', 'D. 33'],
    correctAnswer: 'A',
    feedback: '19 est un nombre premier car ses seuls diviseurs sont 1 et 19.',
    subjectId: 'nombres_premiers',
    level: 1,
    type: 'multiple_choice',
  },
  {
    id: 'L2Q1',
    question:
      "Prouvez que 126 n'est pas un nombre premier en utilisant les critères de divisibilité.",
    options: [],
    correctAnswer:
      "126 est divisible par 2 et 3, donc ce n'est pas un nombre premier.",
    feedback: "Puisque 126 est divisible par 2 et 3, il n'est pas premier.",
    subjectId: 'nombres_premiers',
    level: 2,
    type: 'long_answer',
  },
  {
    id: 'L2Q2',
    question:
      'Le nombre 150 est-il un nombre premier ? Justifiez votre réponse.',
    options: [],
    correctAnswer:
      "150 est divisible par 2 et 5, donc ce n'est pas un nombre premier.",
    feedback: '150 est divisible par 2 et 5, ce qui le rend composé.',
    subjectId: 'nombres_premiers',
    level: 2,
    type: 'long_answer',
  },
  {
    id: 'L2Q3',
    question: "Lequel de ces nombres n'est pas premier, et pourquoi ?",
    options: ['A. 131', 'B. 145', 'C. 109', 'D. 101'],
    correctAnswer: 'B',
    feedback:
      "145 est divisible par 5, donc ce n'est pas un nombre premier. Il se décompose en 5 * 29.",
    subjectId: 'nombres_premiers',
    level: 2,
    type: 'multiple_choice',
  },
  {
    id: 'L2Q4',
    question:
      "Prouvez que 225 n'est pas un nombre premier en utilisant les critères de divisibilité.",
    options: [],
    correctAnswer:
      "225 est divisible par 5 et 25, donc ce n'est pas un nombre premier.",
    feedback: '225 est divisible par 5 et 25, ce qui le rend composé.',
    subjectId: 'nombres_premiers',
    level: 2,
    type: 'long_answer',
  },
  {
    id: 'L2Q5',
    question: "Lequel de ces nombres n'est pas premier ?",
    options: ['A. 73', 'B. 75', 'C. 83', 'D. 89'],
    correctAnswer: 'B',
    feedback: '75 est divisible par 3 et 5, ce qui le rend non premier.',
    subjectId: 'nombres_premiers',
    level: 2,
    type: 'multiple_choice',
  },
  {
    id: 'L2Q6',
    question:
      "Prouvez que 54 n'est pas un nombre premier en utilisant les critères de divisibilité.",
    options: [],
    correctAnswer:
      "54 est divisible par 2 et 3, donc ce n'est pas un nombre premier.",
    feedback: 'Comme 54 est divisible par 2 et 3, il est composé.',
    subjectId: 'nombres_premiers',
    level: 2,
    type: 'long_answer',
  },
  {
    id: 'L2Q7',
    question: "Lequel de ces nombres n'est pas premier ?",
    options: ['A. 91', 'B. 101', 'C. 97', 'D. 89'],
    correctAnswer: 'A',
    feedback:
      "91 est divisible par 7 (91 ÷ 7 = 13., donc ce n'est pas un nombre premier.",
    subjectId: 'nombres_premiers',
    level: 2,
    type: 'multiple_choice',
  },
  {
    id: 'L2Q8',
    question: "Montrez que 180 n'est pas un nombre premier.",
    options: [],
    correctAnswer:
      "180 est divisible par 2, 3 et 5, donc ce n'est pas un nombre premier.",
    feedback: '180 est divisible par 2, 3 et 5, ce qui le rend composé.',
    subjectId: 'nombres_premiers',
    level: 2,
    type: 'long_answer',
  },
  {
    id: 'L2Q9',
    question: "Lequel de ces nombres n'est pas premier et pourquoi ?",
    options: ['A. 143', 'B. 137', 'C. 149', 'D. 151'],
    correctAnswer: 'A',
    feedback:
      "143 est divisible par 11 (143 ÷ 11 = 13., donc ce n'est pas un nombre premier.",
    subjectId: 'nombres_premiers',
    level: 2,
    type: 'multiple_choice',
  },
  {
    id: 'L2Q10',
    question:
      "Prouvez que 90 n'est pas premier en utilisant les critères de divisibilité.",
    options: [],
    correctAnswer:
      "90 est divisible par 2, 3 et 5, donc ce n'est pas un nombre premier.",
    feedback:
      '90 est divisible par plusieurs facteurs, ce qui le rend composé.',
    subjectId: 'nombres_premiers',
    level: 2,
    type: 'long_answer',
  },
  {
    id: 'L3Q1',
    question: 'Trouvez la décomposition en facteurs premiers de 72.',
    options: [],
    correctAnswer: '72 = 2^3 * 3^2',
    feedback:
      '72 est divisible par 2 et 3, donnant la décomposition en facteurs premiers 2^3 * 3^2.',
    subjectId: 'nombres_premiers',
    level: 3,
    type: 'long_answer',
  },
  {
    id: 'L3Q2',
    question: 'Quelle est la décomposition en facteurs premiers de 75 ?',
    options: [],
    correctAnswer: '75 = 3 * 5^2',
    feedback:
      '75 est divisible par 3 et 5, ce qui donne la décomposition en facteurs premiers 3 * 5^2.',
    subjectId: 'nombres_premiers',
    level: 3,
    type: 'long_answer',
  },
  {
    id: 'L3Q3',
    question: 'Effectuez la décomposition en facteurs premiers de 90.',
    options: [],
    correctAnswer: '90 = 2 * 3^2 * 5',
    feedback:
      '90 se décompose en 2, 3^2 et 5, donnant sa décomposition en facteurs premiers.',
    subjectId: 'nombres_premiers',
    level: 3,
    type: 'long_answer',
  },
  {
    id: 'L3Q4',
    question: 'Quelle est la décomposition en facteurs premiers de 50 ?',
    options: [
      'A. 2 * 5^2',
      'B. 2^2 * 5',
      'C. 5 * 5 * 2',
      'D. Aucune des réponses ci-dessus',
    ],
    correctAnswer: 'A',
    feedback: '50 est divisible par 2 et 5, donnant la décomposition 2 * 5^2.',
    subjectId: 'nombres_premiers',
    level: 3,
    type: 'multiple_choice',
  },
  {
    id: 'L3Q5',
    question:
      'Lequel des choix suivants est la décomposition en facteurs premiers correcte de 84 ?',
    options: [
      'A. 2^2 * 3 * 7',
      'B. 2 * 3 * 7',
      'C. 3^2 * 2 * 7',
      'D. 2 * 3^2 * 7',
    ],
    correctAnswer: 'A',
    feedback: '84 se décompose en 2^2 * 3 * 7.',
    subjectId: 'nombres_premiers',
    level: 3,
    type: 'multiple_choice',
  },
  {
    id: 'L3Q6',
    question: 'Quelle est la décomposition en facteurs premiers de 63 ?',
    options: [
      'A. 3 * 3 * 7',
      'B. 2 * 3 * 7',
      'C. 3^2 * 7',
      'D. Aucune des réponses ci-dessus',
    ],
    correctAnswer: 'C',
    feedback: '63 se décompose en 3^2 * 7.',
    subjectId: 'nombres_premiers',
    level: 3,
    type: 'multiple_choice',
  },
  {
    id: 'L4Q1',
    question: 'Quelle est la décomposition en facteurs premiers de 120 ?',
    options: [],
    correctAnswer: '120 = 2^3 * 3 * 5',
    feedback: '120 se décompose en 2^3 * 3 * 5.',
    subjectId: 'nombres_premiers',
    level: 4,
    type: 'long_answer',
  },
  {
    id: 'L4Q2',
    question: 'Effectuez la décomposition en facteurs premiers de 150.',
    options: [],
    correctAnswer: '150 = 2 * 3 * 5^2',
    feedback: '150 se décompose en 2 * 3 * 5^2.',
    subjectId: 'nombres_premiers',
    level: 4,
    type: 'long_answer',
  },
  {
    id: 'L4Q3',
    question: 'Trouvez la décomposition en facteurs premiers de 144.',
    options: [],
    correctAnswer: '144 = 2^4 * 3^2',
    feedback: '144 se décompose en 2^4 * 3^2.',
    subjectId: 'nombres_premiers',
    level: 4,
    type: 'long_answer',
  },
  {
    id: 'L4Q4',
    question: 'Quelle est la décomposition en facteurs premiers de 98 ?',
    options: [
      'A. 2 * 7^2',
      'B. 2 * 7 * 7',
      'C. 2^2 * 7',
      'D. Aucune des réponses ci-dessus',
    ],
    correctAnswer: 'A',
    feedback: '98 se décompose en 2 * 7^2.',
    subjectId: 'nombres_premiers',
    level: 4,
    type: 'multiple_choice',
  },
  {
    id: 'L4Q5',
    question:
      'Quel est la décomposition en facteurs premiers correcte pour 84 ?',
    options: [
      'A. 2^2 * 3 * 7',
      'B. 2 * 2 * 3 * 7',
      'C. 2 * 3^2 * 7',
      'D. Aucune des réponses ci-dessus',
    ],
    correctAnswer: 'A',
    feedback: '84 se décompose en 2^2 * 3 * 7.',
    subjectId: 'nombres_premiers',
    level: 4,
    type: 'multiple_choice',
  },

  {
    id: 'L4Q6',
    question: 'Quelle est la décomposition en facteurs premiers de 225 ?',
    options: [],
    correctAnswer: '225 = 3^2 * 5^2',
    feedback: '225 se décompose en 3^2 * 5^2.',
    subjectId: 'nombres_premiers',
    level: 4,
    type: 'long_answer',
  },
  {
    id: 'L4Q7',
    question: 'Trouvez la décomposition en facteurs premiers de 210.',
    options: [],
    correctAnswer: '210 = 2 * 3 * 5 * 7',
    feedback: '210 se décompose en 2 * 3 * 5 * 7.',
    subjectId: 'nombres_premiers',
    level: 4,
    type: 'long_answer',
  },
  {
    id: 'L4Q8',
    question: 'Quelle est la décomposition en facteurs premiers de 300 ?',
    options: [],
    correctAnswer: '300 = 2^2 * 3 * 5^2',
    feedback: '300 se décompose en 2^2 * 3 * 5^2.',
    subjectId: 'nombres_premiers',
    level: 4,
    type: 'long_answer',
  },
  {
    id: 'L4Q9',
    question: 'Quelle est la décomposition en facteurs premiers de 324 ?',
    options: ['A. 2^2 * 3^4', 'B. 2^2 * 3^2', 'C. 2^3 * 3^2', 'D. 2 * 3^3'],
    correctAnswer: 'B',
    feedback: '324 se décompose en 2^2 * 3^4.',
    subjectId: 'nombres_premiers',
    level: 4,
    type: 'multiple_choice',
  },
  {
    id: 'L4Q10',
    question: 'Quelle est la décomposition en facteurs premiers de 360 ?',
    options: [
      'A. 2^3 * 3^2 * 5',
      'B. 2^2 * 3 * 5^2',
      'C. 2 * 3^2 * 5',
      'D. Aucune des réponses ci-dessus',
    ],
    correctAnswer: 'A',
    feedback: '360 se décompose en 2^3 * 3^2 * 5.',
    subjectId: 'nombres_premiers',
    level: 4,
    type: 'multiple_choice',
  },
  {
    id: 'L4Q11',
    question: 'Trouvez la décomposition en facteurs premiers de 420.',
    options: [],
    correctAnswer: '420 = 2^2 * 3 * 5 * 7',
    feedback: '420 se décompose en 2^2 * 3 * 5 * 7.',
    subjectId: 'nombres_premiers',
    level: 4,
    type: 'long_answer',
  },
  {
    id: 'L4Q12',
    question: 'Quelle est la décomposition en facteurs premiers de 384 ?',
    options: [],
    correctAnswer: '384 = 2^7 * 3',
    feedback: '384 se décompose en 2^7 * 3.',
    subjectId: 'nombres_premiers',
    level: 4,
    type: 'long_answer',
  },
  {
    id: 'L4Q13',
    question: 'Quelle est la décomposition en facteurs premiers de 432 ?',
    options: [],
    correctAnswer: '432 = 2^4 * 3^3',
    feedback: '432 se décompose en 2^4 * 3^3.',
    subjectId: 'nombres_premiers',
    level: 4,
    type: 'long_answer',
  },
  {
    id: 'L4Q14',
    question: 'Quelle est la décomposition en facteurs premiers de 462 ?',
    options: [
      'A. 2 * 3 * 7 * 11',
      'B. 2^2 * 3 * 7 * 11',
      'C. 2 * 3 * 5 * 7',
      'D. Aucune des réponses ci-dessus',
    ],
    correctAnswer: 'A',
    feedback: '462 se décompose en 2 * 3 * 7 * 11.',
    subjectId: 'nombres_premiers',
    level: 4,
    type: 'multiple_choice',
  },
  {
    id: 'L4Q15',
    question: 'Quelle est la décomposition en facteurs premiers de 540 ?',
    options: [
      'A. 2^3 * 3^3 * 5',
      'B. 2^2 * 3^3 * 5',
      'C. 2^3 * 3^2 * 5^2',
      'D. 2^2 * 3 * 5^2',
    ],
    correctAnswer: 'A',
    feedback: '540 se décompose en 2^3 * 3^3 * 5.',
    subjectId: 'nombres_premiers',
    level: 4,
    type: 'multiple_choice',
  },
  {
    id: 'L5Q1',
    question: 'Est-ce que n² + n + 5 est toujours premier pour n = 1 ?',
    options: [],
    correctAnswer:
      'Non, n² + n + 5 pour n = 1 est 7, qui est un nombre premier.',
    feedback: 'Pour n = 1, n² + n + 5 = 1 + 1 + 5 = 7, qui est premier.',
    subjectId: 'nombres_premiers',
    level: 5,
    type: 'long_answer',
  },
  {
    id: 'L5Q2',
    question: 'Est-ce que n² + n + 5 est toujours premier pour n = 2 ?',
    options: [],
    correctAnswer:
      'Non, n² + n + 5 pour n = 2 est 11, qui est un nombre premier.',
    feedback: 'Pour n = 2, n² + n + 5 = 4 + 2 + 5 = 11, qui est premier.',
    subjectId: 'nombres_premiers',
    level: 5,
    type: 'long_answer',
  },
  {
    id: 'L5Q3',
    question: 'Est-ce que n² + n + 5 est toujours premier pour n = 3 ?',
    options: [],
    correctAnswer:
      'Non, n² + n + 5 pour n = 3 est 17, qui est un nombre premier.',
    feedback: 'Pour n = 3, n² + n + 5 = 9 + 3 + 5 = 17, qui est premier.',
    subjectId: 'nombres_premiers',
    level: 5,
    type: 'long_answer',
  },
  {
    id: 'L5Q4',
    question: 'Est-ce que n² + n + 5 est toujours premier pour n = 4 ?',
    options: [],
    correctAnswer:
      "Non, n² + n + 5 pour n = 4 est 25, qui n'est pas un nombre premier.",
    feedback:
      "Pour n = 4, n² + n + 5 = 16 + 4 + 5 = 25, qui n'est pas premier.",
    subjectId: 'nombres_premiers',
    level: 5,
    type: 'long_answer',
  },
  {
    id: 'L5Q5',
    question: 'Est-ce que n² + n + 5 est toujours premier pour n = 5 ?',
    options: [],
    correctAnswer:
      "Non, n² + n + 5 pour n = 5 est 35, qui n'est pas un nombre premier.",
    feedback:
      "Pour n = 5, n² + n + 5 = 25 + 5 + 5 = 35, qui n'est pas premier.",
    subjectId: 'nombres_premiers',
    level: 5,
    type: 'long_answer'
  },
];
      
  
  