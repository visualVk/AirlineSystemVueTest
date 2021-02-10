export interface QuestionInf {
  title: string,
  content: string,
  questionId: string,
  date: Date
}

export class QuestionImp implements QuestionInf {
  title!: string;
  content!: string;
  questionId!: string;
  date!: Date;
}