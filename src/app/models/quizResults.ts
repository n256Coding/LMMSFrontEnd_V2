import { Questions } from "./questions";

export class QuizResults{
    public checkFileFormat: String;
    public analyzeType: String;
    public totalQuestions: number;
    public multiChoice: number;
    public trueFalse: number;
    public shortAnsQues: number;
    public matchingQues: number;
    public numericalQues: number;
    public essayQues: number;
    public noOfSingleAnswers: number;
    public noOfMultipleAnswers: number;
    public allQues: Questions[]; 
    public correctAnsQ: Questions[];
    public incorrectAnsQ: Questions[];
    public userSelections: string[];
}