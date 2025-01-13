export interface Category {
    id: string;
    name: string;
    weight: number;
}

export interface Assignment {
    id: string;
    categoryId: string;
    name: string;
    score: number | null;
    totalPoints: number;
    date: string;
    isGraded: boolean;
}

export interface GradingSystem {
    id: string;
    name: string;
    categories: Category[];
    useLetterGrades: boolean;
    letterGradeCutoffs?: LetterGradeCutoff[];
}

export interface LetterGradeCutoff {
    letter: string;
    minScore: number;
}
  