import { ApiResponse } from 'src/app/shared/apiResponse';
import { ElementType } from 'src/app/shared/ElementType';

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