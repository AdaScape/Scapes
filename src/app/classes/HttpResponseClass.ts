import { ErrorClass } from "./ErrorClass";

export class HttpResponseClass {
    public Data: Array<Object>;
    public ResultStatusID: number;
    public ResultStatus: string;
    public ErrorObject: ErrorClass;
    public Rows: number;
}