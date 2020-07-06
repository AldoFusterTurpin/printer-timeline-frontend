import { ApiResponse } from 'apiResponse';
import { ElementType } from 'ElementType';

export class TimelineData {
    public apiResponse: ApiResponse;
    public elementName: ElementType; 

    constructor(apiResponse: ApiResponse, elementName: ElementType, ) {
        this.apiResponse = apiResponse;
        this.elementName = elementName;
    }
}