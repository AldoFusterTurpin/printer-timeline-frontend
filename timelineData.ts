import { ApiResponse } from 'apiResponse';
import { ElementType } from 'ElementType';

export class TimelineData {
    public apiResponse: ApiResponse;
    public elementName: ElementType; 
    public tableDescription: string;

    constructor(apiResponse: ApiResponse, elementName: ElementType, tableDescription: string) {
        this.apiResponse = apiResponse;
        this.elementName = elementName;
        this.tableDescription = tableDescription;
    }
}