import { Chapter, User } from "./interfaces"

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
        subjectsId : ['1','2'],
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
        totalExercises : 0

    }

   

]