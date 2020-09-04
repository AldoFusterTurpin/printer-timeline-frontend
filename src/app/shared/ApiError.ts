
export enum ErrorType {
    S3Error = "S3Error",
    OpenXmlError = "OpenXMLError",
    CloudJsonError = "Cloud JSON Error",
    RtaError = "RTA Error",
    HbError = "HB Error",
    PrinterSubscriptionsError = "Printer Subscriptions Error"
}

export class ApiError {
    public errorType: ErrorType;
    public error: any; 

    constructor(errorType: ErrorType, error: any) {
        this.errorType = errorType;
        this.error = error;
    }
}