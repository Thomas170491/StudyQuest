export interface User {
    id: string;
    username: string;
    email: string;
    profilePictureUrl: string | null;
    schoolYear: string;
    group: string; 
    isAuth: boolean;
    completedExercises: Progress[];
  }

  export interface Chapter {
    id: string;
    title: string;
    description?: string;
    subjectsId: string[];
    progress: UserProgress[]; // Percentage of completion
    totalExercises: number;
  }
  export interface UserProgress {
    userId: string; // User ID to identify the user
    progress: number; // Progress percentage or level
  }

  export interface Subject {
    id: string;
    title: string;
    description?: string;
    introductionVideoUrl?: string;
    chapterId : string;
    
  }
  export interface Exercise {
    id: string;
    question: string;
    options?: string[];
    correctAnswer: string;
    feedback: string;
    subjectId : string;
    level : number;
    type : string;
  }
  export interface Progress {
    userId: string;
    chapterId: string;
    subjectId: string;
    exerciseId: string
    completedExercises?: number;
    totalExercises?: number;
    progressPercentage?: number;
    badges?: Reward[];
    trophies?: Reward[];
    tokens?: number;
    mastered?: boolean;
  }
  export interface Reward {
    id: string;
    type: 'badge' | 'token' | 'trophy';
    name : string;    
    value? : number;
    description: string;
    icon : string;
    criteria: string; // Conditions pour obtenir la récompense
  }
  export interface Notification {
    id: string;
    userId: string;
    title: string;
    message: string;
    timestamp: Date;
    type: 'reminder' | 'alert' | 'achievement';
  }

  export interface Settings {
    userId: string;
    theme: 'light' | 'dark';
    notificationsEnabled: boolean;
    personalizedProfessor?: boolean; // Option de personnalisation du personnage "Prof"
  }
  export interface Feedback {
    exerciseId: string;
    userId: string;
    feedbackText: string;
    rating?: number; // Optionnel: note attribuée à l'exercice
  }
  export interface Session {
    id: string;
    userId: string;
    type: 'revision' | 'mockExam';
    startTime: Date;
    endTime: Date;
    completed: boolean;
  }
  export interface LeaderboardEntry {
    username: string;
    badges: number;
    trophies: number; 
    tokens: number;
  }
  
    