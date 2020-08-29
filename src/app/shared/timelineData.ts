import { ElementType } from 'src/app/shared/ElementType';

export class TimelineData {
    public apiResponse: JSON;
    public elementName: ElementType; 
    public tableDescription: string;

    constructor(apiResponse: JSON, elementName: ElementType, tableDescription: string) {
        this.apiResponse = apiResponse;
        this.elementName = elementName;
        this.tableDescription = tableDescription;
    }
}