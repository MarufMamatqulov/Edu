export interface IQuestion {
  id?: number;
  text?: string;
  type?: string;
  options?: string;
  courseItem?: any;
}

export class Question implements IQuestion {
  constructor(
    public id?: number,
    public text?: string,
    public type?: string,
    public options?: string,
    public courseItem?: any,
  ) {}
}
