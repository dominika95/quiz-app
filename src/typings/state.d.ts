export interface State {
    quizConfig: {
        numberOfQuestions: number;
        category: string;
        difficulty: string;
        type: string;
    },
    questions: [],
    currentPage: number,
    answer: string[],
    correctAnswer: string[],
    result: {
        numberOfCorrectlyAnswers: number,
        startTime: number,
        endTime: number,
    },
    previousResult : {
        numberOfCorrectlyAnswers: number,
        numberOfQuestions: number,
        startTime: number,
        endTime: number,
    }
}
