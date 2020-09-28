export default class Utils {

    static stringDateToDateObject(inputDate: string): Date {
        let ISO8601DateString = inputDate.replace(' ', 'T') + 'Z';
        const date = new Date(ISO8601DateString);
        return date;
    }

    static getSecondsDiff(start: Date, end: Date): number {
        let secondsDiff = (end.getTime() - start.getTime()) / 1000;
        return Math.abs(Math.round(secondsDiff));
    }

    static createTimelineMinDate(): Date {
        let date = new Date();
        date.setMonth(date.getMonth() - 1)
        return date;
    }

    static allCharsAreNumbers(text): boolean {
        let numbers = /^[0-9]+$/;
        return text.match(numbers);
    }

    static createArrayOfObjectsFromMap(elementsToIterate: Map<string, number>, nElements: number): Array<any> {
        let dataToReturn = [];
        for (let [key, value] of elementsToIterate) {
            let row = {
                'pn!sn': key,
                'count': value,
                '%': ((value / nElements) * 100).toFixed(2)
            };
            dataToReturn.push(row);
        }
        return dataToReturn;
    }

    static filterArrayByPnSn(set: Set<string>, elementsToIterate: Array<any>): Array<any> {
        return elementsToIterate.filter((element) => {
            let pn = element[1]['Value'];
            let sn = element[2]['Value'];
            let key = pn + '!' + sn;

            return set.has(key);
        });
    }

    static createSetOfPn_SnFromArray(data: any[]): Set<string> {
        let set = new Set<string>();
        for (const element of data) {
            let key = element['pn!sn'];
            set.add(key);
        }
        return set;
    }

    static createSetOfTopicsFromArray(data: any[]): Set<string> {
        let set = new Set<string>();
        for (const element of data) {
            let topic = element[6]['Value'];
            set.add(topic);
        }
        return set;
    }

    static filterArrayByTopic(data: any[], topicsToInclude: string[]): any[] {
        return data.filter((element) => {
            let topicOfElement = element[6]['Value'];
            return topicsToInclude.includes(topicOfElement);
        });
    }

    static createCountMapFromArray(data: any[]) {
        //key: pn!sn
        //value: how many times appears printer in data
        //i.e: number of data ('howm many' xmls, jsons, etc) sent by that printer in the selected time range
        let printerCountMap = new Map();
        for (const element of data) {
            let pn = element[1]['Value'];
            let sn = element[2]['Value'];
            let key = pn + '!' + sn;

            if (printerCountMap.has(key)) {
                printerCountMap.set(key, printerCountMap.get(key) + 1);
            } else {
                printerCountMap.set(key, 1);
            }
        }

        //sort the map by value
        printerCountMap[Symbol.iterator] = function* () {
            yield* [...this.entries()].sort((a, b) => a[1] - b[1]);
        }
        return printerCountMap;
    }

    static stringToJsonObject(inputString: string): JSON | string {
        // The catch is mandatory because sometimes it receives the XML inestead of the JSON
        // because the observable of the data type (emited by another component) finishes before 
        //  the update of the S3 element.
        // This occurs because we have a global state in the component and can NOT ensure the order of
        // the asynchronus operations.
        // This can happen when the user selects an XML tand then selects a JSON,
        // the app trigers the element type change but the data (the JSON itself) hasn't been updatet yet.
        try {
            let json: JSON = JSON.parse(inputString);
            return json;
        } catch {
            return inputString;
        }
    }

    static shortRepresentationOf(d: Date) {
        return d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ':' + d.getMilliseconds();
    }

    static longRepresentationOf(d: Date) {
        return d.toLocaleString('en-GB') + ':' + d.getMilliseconds();
    }

    static milliSecondsToDate(epochMilliseconds: number): Date {
        return new Date(epochMilliseconds);
      }
}