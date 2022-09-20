interface ResponseData {
    data: {
        results: {
            category: string;
            correct_answer: string,
            difficulty: string,
            incorrect_answers: string[],
            question: string,
            type: string,
        }[]
    }
}

interface ParseQuestion {
    category: string;
    difficulty: string,
    answers: string[],
    question: string,
    type: string,
}

interface InputData {
    category: string;
    difficulty: string;
    type: string;
    numberOfQuestions: number;
}
