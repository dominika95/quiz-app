export interface State {
    quizConfig: {
        numberOfQuestions: number;
        category: string;
        difficulty: string;
        type: string;
    },
    questions: [],
    currentPage: number,
    answer: [],
}
