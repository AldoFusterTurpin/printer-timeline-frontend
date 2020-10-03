import Utils from './utils';


describe('stringDateToDateObject()', () => {
    it('should create the correct date when date format is the expected', () => {
        let createdDate = Utils.stringDateToDateObject('2020-08-27 19:59:31.002');
        let expectedDate = new Date('2020-08-27T19:59:31.002Z');
        expect(createdDate).toEqual(expectedDate);
    });
});

describe('getSecondsDiff()', () => {
    it('getSecondsDiff() returns the appropiate difference in seconds', () => {
        let diff = Utils.getSecondsDiff(new Date('2020-10-01T08:30:00'), new Date('2020-10-01T17:30:00'));
        let expectedDiff = 32400;
        expect(diff).toEqual(expectedDiff);
    });

    it('getSecondsDiff() returns the appropiate difference in seconds', () => {
        let diff = Utils.getSecondsDiff(new Date('2020-10-01T09:41:16'), new Date('2020-10-01T20:09:11'));
        let expectedDiff = 37675;
        expect(diff).toEqual(expectedDiff);
    });

    it('getSecondsDiff() returns the appropiate difference in seconds', () => {
        let diff = Utils.getSecondsDiff(new Date('2020-10-06T11:01:59'), new Date('2020-10-06T11:23:21'));
        let expectedDiff = 1282;
        expect(diff).toEqual(expectedDiff);
    });

    it('getSecondsDiff() returns the appropiate difference in seconds', () => {
        let diff = Utils.getSecondsDiff(new Date('2020-10-06T11:01:59'), new Date('2020-10-07T22:00:50'));
        let expectedDiff = 125931;
        expect(diff).toEqual(expectedDiff);
    });
});

describe('allCharsAreNumbers()', () => {
    it('allCharsAreNumbers() returns true when all characters are numbers', () => {
        let result = Utils.allCharsAreNumbers('112121');
        expect(result).toEqual(true);
    });

    it('allCharsAreNumbers() returns true when all characters are numbers', () => {
        let result = Utils.allCharsAreNumbers('25');
        expect(result).toEqual(true);
    });

    it('allCharsAreNumbers() returns false when not all characters are numbers', () => {
        let result = Utils.allCharsAreNumbers('25-');
        expect(result).toEqual(false);
    });

    it('allCharsAreNumbers() returns false when not all characters are numbers', () => {
        let result = Utils.allCharsAreNumbers('dmnsalkdjmsalk');
        expect(result).toEqual(false);
    });

    it('allCharsAreNumbers() returns false when not all characters are numbers', () => {
        let result = Utils.allCharsAreNumbers('a18');
        expect(result).toEqual(false);
    });

    it('allCharsAreNumbers() returns false when not all characters are numbers', () => {
        let result = Utils.allCharsAreNumbers('/');
        expect(result).toEqual(false);
    });

    it('allCharsAreNumbers() returns false when not all characters are numbers', () => {
        let result = Utils.allCharsAreNumbers('24c55');
        expect(result).toEqual(false);
    });
});

describe('percentatge()', () => {
    it('percentatge returns the expected result', () => {
        let result = Utils.percentatge(12, 20);
        expect(result).toBe('60.00');
    });

    it('percentatge returns the expected result', () => {
        let result = Utils.percentatge(12, 14);
        expect(result).toBe('85.71');
    });

    it('percentatge returns the expected result', () => {
        let result = Utils.percentatge(12, 14);
        expect(result).toBe('85.71');
    });

    it('percentatge returns the expected result', () => {
        let result = Utils.percentatge(4, 4);
        expect(result).toBe('100.00');
    });

    it('percentatge returns the expected result', () => {
        let result = Utils.percentatge(1, 13);
        expect(result).toBe('7.69');
    });

    it('percentatge returns the expected result', () => {
        let result = Utils.percentatge(25, 1009);
        expect(result).toBe('2.48');
    });

    it('percentatge returns the expected result', () => {
        let result = Utils.percentatge(2, 1367);
        expect(result).toBe('0.15');
    });

    it('percentatge returns the expected result', () => {
        let result = Utils.percentatge(2, 3367);
        expect(result).toBe('0.06');
    });
});

describe('createArrayOfObjectsFromMap()', () => {
    it('createArrayOfObjectsFromMap returns the expected result', () => {
        let nElements = 14;
        let elemenstsToIterate = new Map<string, number>();
        elemenstsToIterate.set('1234!5678', 2);
        elemenstsToIterate.set('12!23', 1);
        elemenstsToIterate.set('89!11', 4);
        elemenstsToIterate.set('89!16', 7);

        let expected = [
            {
                'pn!sn': '1234!5678',
                'count': 2,
                '%': Utils.percentatge(2, nElements)
            },
            {
                'pn!sn': '12!23',
                'count': 1,
                '%': Utils.percentatge(1, nElements)
            },
            {
                'pn!sn': '89!11',
                'count': 4,
                '%': Utils.percentatge(4, nElements)
            },
            {
                'pn!sn': '89!16',
                'count': 7,
                '%': Utils.percentatge(7, nElements)
            }
        ];

        let result = Utils.createArrayOfObjectsFromMap(elemenstsToIterate, nElements);

        expect(result).toEqual(expected);
    });

    it('createArrayOfObjectsFromMap returns the expected result', () => {
        let nElements = 1123;
        let elemenstsToIterate = new Map<string, number>();
        elemenstsToIterate.set('1!2', 33);
        elemenstsToIterate.set('3!4', 456);
        elemenstsToIterate.set('5!6', 91);
        elemenstsToIterate.set('7!8', 543);

        let expected = [
            {
                'pn!sn': '1!2',
                'count': 33,
                '%': Utils.percentatge(33, nElements)
            },
            {
                'pn!sn': '3!4',
                'count': 456,
                '%': Utils.percentatge(456, nElements)
            },
            {
                'pn!sn': '5!6',
                'count': 91,
                '%': Utils.percentatge(91, nElements)
            },
            {
                'pn!sn': '7!8',
                'count': 543,
                '%': Utils.percentatge(543, nElements)
            }
        ];

        let result = Utils.createArrayOfObjectsFromMap(elemenstsToIterate, nElements);

        expect(result).toEqual(expected);
    });

    it('createArrayOfObjectsFromMap returns the expected result', () => {
        let nElements = 14;
        let elemenstsToIterate = new Map<string, number>();
        elemenstsToIterate.set('1!2', 1);
        elemenstsToIterate.set('3!4', 2);
        elemenstsToIterate.set('5!6', 2);
        elemenstsToIterate.set('7!8', 3);
        elemenstsToIterate.set('77!88', 4);
        elemenstsToIterate.set('87!88', 1);
        elemenstsToIterate.set('12!88', 1);

        let expected = [
            {
                'pn!sn': '1!2',
                'count': 1,
                '%': Utils.percentatge(1, nElements)
            },
            {
                'pn!sn': '3!4',
                'count': 2,
                '%': Utils.percentatge(2, nElements)
            },
            {
                'pn!sn': '5!6',
                'count': 2,
                '%': Utils.percentatge(2, nElements)
            },
            {
                'pn!sn': '7!8',
                'count': 3,
                '%': Utils.percentatge(3, nElements)
            },
            {
                'pn!sn': '77!88',
                'count': 4,
                '%': Utils.percentatge(4, nElements)
            },
            {
                'pn!sn': '87!88',
                'count': 1,
                '%': Utils.percentatge(1, nElements)
            },
            {
                'pn!sn': '12!88',
                'count': 1,
                '%': Utils.percentatge(1, nElements)
            }
        ];

        let result = Utils.createArrayOfObjectsFromMap(elemenstsToIterate, nElements);

        expect(result).toEqual(expected);
    });
});

describe('filterArrayByPnSn()', () => {
    it('filterArrayByPnSn returns the expected result', () => {
        let set = new Set<string>(['89!16', '1!32', '43!00']);

        let elementsPassFilter = [
            [
                {
                    'Field': '@timestamp',
                    'Value': '2020-08-27 19:59:31.126'
                },
                {
                    'Field': 'fields.ProductNumber',
                    'Value': '89'
                },
                {
                    'Field': 'fields.SerialNumber',
                    'Value': '16'
                }
            ],
            [
                {
                    'Field': '@timestamp',
                    'Value': '2020-08-27 19:59:31.126'
                },
                {
                    'Field': 'fields.ProductNumber',
                    'Value': '1'
                },
                {
                    'Field': 'fields.SerialNumber',
                    'Value': '32'
                }
            ],
            [
                {
                    'Field': '@timestamp',
                    'Value': '2020-08-27 19:59:31.126'
                },
                {
                    'Field': 'fields.ProductNumber',
                    'Value': '43'
                },
                {
                    'Field': 'fields.SerialNumber',
                    'Value': '00'
                }
            ]
        ];

        let elementsDoesntPassFilter = [
            [
                {
                    'Field': '@timestamp',
                    'Value': '2020-08-27 19:59:31.002'
                },
                {
                    'Field': 'fields.ProductNumber',
                    'Value': '42'
                },
                {
                    'Field': 'fields.SerialNumber',
                    'Value': '44'
                }
            ],
            [
                {
                    'Field': '@timestamp',
                    'Value': '2020-08-27 19:59:31.002'
                },
                {
                    'Field': 'fields.ProductNumber',
                    'Value': '11'
                },
                {
                    'Field': 'fields.SerialNumber',
                    'Value': '01'
                }
            ],
            [
                {
                    'Field': '@timestamp',
                    'Value': '2020-08-27 19:59:31.002'
                },
                {
                    'Field': 'fields.ProductNumber',
                    'Value': '09012'
                },
                {
                    'Field': 'fields.SerialNumber',
                    'Value': '32321'
                }
            ],
            [
                {
                    'Field': '@timestamp',
                    'Value': '2020-08-27 19:59:31.002'
                },
                {
                    'Field': 'fields.ProductNumber',
                    'Value': '12121'
                },
                {
                    'Field': 'fields.SerialNumber',
                    'Value': '1111'
                }
            ]
        ];

        //Spread syntax https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        let result = Utils.filterArrayByPnSn(set, [...elementsPassFilter, ...elementsDoesntPassFilter]);

        expect(result).toEqual(elementsPassFilter);
    });

    it('filterArrayByPnSn returns the expected result', () => {
        let set = new Set<string>(['12!23', '89!11', '89!16', '1!32', '43!00']);

        let elementsPassFilter = [
            [
                {
                    'Field': '@timestamp',
                    'Value': '2020-08-27 19:59:31.126'
                },
                {
                    'Field': 'fields.ProductNumber',
                    'Value': '12'
                },
                {
                    'Field': 'fields.SerialNumber',
                    'Value': '23'
                }
            ],
            [
                {
                    'Field': '@timestamp',
                    'Value': '2020-08-27 19:59:31.126'
                },
                {
                    'Field': 'fields.ProductNumber',
                    'Value': '89'
                },
                {
                    'Field': 'fields.SerialNumber',
                    'Value': '11'
                }
            ],
            [
                {
                    'Field': '@timestamp',
                    'Value': '2020-08-27 19:59:31.126'
                },
                {
                    'Field': 'fields.ProductNumber',
                    'Value': '89'
                },
                {
                    'Field': 'fields.SerialNumber',
                    'Value': '16'
                }
            ],
            [
                {
                    'Field': '@timestamp',
                    'Value': '2020-08-27 19:59:31.126'
                },
                {
                    'Field': 'fields.ProductNumber',
                    'Value': '1'
                },
                {
                    'Field': 'fields.SerialNumber',
                    'Value': '32'
                }
            ],
            [
                {
                    'Field': '@timestamp',
                    'Value': '2020-08-27 19:59:31.126'
                },
                {
                    'Field': 'fields.ProductNumber',
                    'Value': '43'
                },
                {
                    'Field': 'fields.SerialNumber',
                    'Value': '00'
                }
            ]
        ];

        let elementsDoesntPassFilter = [
            [
                {
                    'Field': '@timestamp',
                    'Value': '2020-08-27 19:59:31.002'
                },
                {
                    'Field': 'fields.ProductNumber',
                    'Value': '42'
                },
                {
                    'Field': 'fields.SerialNumber',
                    'Value': '44'
                }
            ],
            [
                {
                    'Field': '@timestamp',
                    'Value': '2020-08-27 19:59:31.002'
                },
                {
                    'Field': 'fields.ProductNumber',
                    'Value': '11'
                },
                {
                    'Field': 'fields.SerialNumber',
                    'Value': '01'
                }
            ]
        ];

        //Spread syntax https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        let result = Utils.filterArrayByPnSn(set, [...elementsPassFilter, ...elementsDoesntPassFilter]);

        expect(result).toEqual(elementsPassFilter);
    });
});

describe('createSetOfPn_SnFromArray()', () => {
    it('createSetOfPn_SnFromArray returns the correct result', () => {
        let expected = new Set<string>(['5!6', '3!4', '12!90', '89!16', '1!2', '1!32', '43!00']);

        let data = [
            { 'pn!sn': '1!2', },
            { 'pn!sn': '3!4', },
            { 'pn!sn': '3!4', },
            { 'pn!sn': '3!4', },
            { 'pn!sn': '3!4', },
            { 'pn!sn': '5!6', },
            { 'pn!sn': '12!90', },
            { 'pn!sn': '43!00', },
            { 'pn!sn': '1!32', },
            { 'pn!sn': '1!32', },
            { 'pn!sn': '89!16' },
            { 'pn!sn': '89!16' },
            { 'pn!sn': '89!16' }
        ];

        let result = Utils.createSetOfPn_SnFromArray(data)

        expect(result).toEqual(expected);
    });

    it('createSetOfPn_SnFromArray returns the correct result when empty input', () => {
        let expected = new Set<string>();
        let data = [];
        let result = Utils.createSetOfPn_SnFromArray(data)
        expect(result).toEqual(expected);
    });

    it('createSetOfPn_SnFromArray returns the correct result', () => {
        let expected = new Set<string>(['3!4', '89!16', '1!2']);

        let data = [
            { 'pn!sn': '1!2', },
            { 'pn!sn': '3!4', },
            { 'pn!sn': '89!16' }
        ];

        let result = Utils.createSetOfPn_SnFromArray(data)

        expect(result).toEqual(expected);
    });
});

describe('createSetOfTopicsFromArray()', () => {
    it('createSetOfTopicsFromArray() returns the correct result', () => {
        let expected = new Set<string>(['open_usage_30', 'open_status_30', 'open_media_30']);

        let data = [
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:31.002"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8AM1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_usage_30/K0Q45A!SG8AM1S001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_usage_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:30Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4Q2AEYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:31.126"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG97B1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG97B1S001-7956561f-1061-4074-8072-37f4425c7fb9"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_usage_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:30Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAGEjkaGAIF5itYHQAAAAKJmrCDAAX0gQfAAAAG0iABKJKrgYzDLjDrjIuMwy44xB5AjZhJSLG0DlCJoA4QjAgYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:31.189"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8AM1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q45A!SG8AM1S001-4245b727-ee1c-4d20-9c56-d7af37523c4a"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_usage_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:30Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4Q2QEYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:31.209"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG88K1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/K0Q46A!SG88K1S001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:31Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8QpBgYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:31.225"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "4DC17A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG93111001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "4DC17A!SG93111001-eba47869-62e9-451d-81b5-8e9be44cf125"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:30Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBABEjkaGAIF7VcXBwAAAAHT44rsAAX0gQOgAAAAciABKPWv/YvDLjD60oeMwy44/hlA0uM/SP27DFDYpwwQpw8YAQ=="
                }
            ]
        ];

        let result = Utils.createSetOfTopicsFromArray(data)

        expect(result).toEqual(expected);
    });

    it('createSetOfTopicsFromArray() returns the correct result', () => {
        let expected = new Set<string>(['open_usage_30', 'open_status_30', 'open_media_30', 'open_queue_30']);

        let data = [
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:31.002"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8AM1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_usage_30/K0Q45A!SG8AM1S001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_usage_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:30Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4Q2AEYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:31.126"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG97B1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG97B1S001-7956561f-1061-4074-8072-37f4425c7fb9"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_usage_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:30Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAGEjkaGAIF5itYHQAAAAKJmrCDAAX0gQfAAAAG0iABKJKrgYzDLjDrjIuMwy44xB5AjZhJSLG0DlCJoA4QjAgYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:31.189"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8AM1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q45A!SG8AM1S001-4245b727-ee1c-4d20-9c56-d7af37523c4a"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_usage_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:30Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4Q2QEYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:31.209"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG88K1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/K0Q46A!SG88K1S001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:31Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8QpBgYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:31.225"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "4DC17A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG93111001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "4DC17A!SG93111001-eba47869-62e9-451d-81b5-8e9be44cf125"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:30Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBABEjkaGAIF7VcXBwAAAAHT44rsAAX0gQOgAAAAciABKPWv/YvDLjD60oeMwy44/hlA0uM/SP27DFDYpwwQpw8YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:31.293"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "CZ056A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG3A31P001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_media_30/CZ056A!SG3A31P001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:31Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBABEjkaGAIF7VcXBwAAAAHT44rsAAX0gQOgAAAAciABKPWv/YvDLjD60oeMwy44/hlA0uM/SP27DFDYpwwQlRAYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:31.353"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "CZ056A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG3AP1P001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_media_30/CZ056A!SG3AP1P001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:31Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAGEjkaGAIF5itYHQAAAAKJmrCDAAX0gQfAAAAG0iABKJKrgYzDLjDrjIuMwy44xB5AjZhJSLG0DlCJoA4Q4QgYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:31.377"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K4T88A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG85H1N002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_media_30/K4T88A!SG85H1N002"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:31Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAAEjkaGAIF5w+RxAAAAARaXNdQAAX0gQiwAAAAQiABKJe6gozDLjCdqIyMwy445BxAh/dDSLOsDVCMmA0Q1wcYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:31.721"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG88K1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG88K1S001-9a5c78a6-8039-4c09-9765-c44bcaeeb0fc"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:31Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8QpRgYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:31.756"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "CZ056A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG3A31P001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "CZ056A!SG3A31P001-653f7cbb-81c5-4092-88ff-8dda9299540b"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:31Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBABEjkaGAIF7VcXBwAAAAHT44rsAAX0gQOgAAAAciABKPWv/YvDLjD60oeMwy44/hlA0uM/SP27DFDYpwwQlhAYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:31.786"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "4DC17A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG98T11002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/4DC17A!SG98T11002"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:31Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4QngEYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:31.804"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "CZ056A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG3AP1P001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "CZ056A!SG3AP1P001-88cfdbab-ce7c-4d97-8f34-51c4cfb9770d"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:31Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAGEjkaGAIF5itYHQAAAAKJmrCDAAX0gQfAAAAG0iABKJKrgYzDLjDrjIuMwy44xB5AjZhJSLG0DlCJoA4Q4ggYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:31.839"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K4T88A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG85H1N002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K4T88A!SG85H1N002-49393c35-8cd9-4176-8c1e-1d5980d3468b"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:31Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAAEjkaGAIF5w+RxAAAAARaXNdQAAX0gQiwAAAAQiABKJe6gozDLjCdqIyMwy445BxAh/dDSLOsDVCMmA0Q2AcYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:31.888"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG88K1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_queue_30/K0Q46A!SG88K1S001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_queue_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:31Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8QphgYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:32.002"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K4T88A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG81A1N001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/K4T88A!SG81A1N001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:31Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBABEjkaGAIF7VcXBwAAAAHT44rsAAX0gQOgAAAAciABKPWv/YvDLjD60oeMwy44/hlA0uM/SP27DFDYpwwQug8YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:32.149"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "4DC17A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG98T11002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "4DC17A!SG98T11002-e0790a04-c9d8-4906-bbb3-f6c818414e84"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:31Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4QnwEYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:32.214"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG88K1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG88K1S001-142d0bf4-40f6-4c5e-aa49-0f728709ab06"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_queue_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:31Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8QpxgYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:32.284"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG88K1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_media_30/K0Q46A!SG88K1S001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:32Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8QqBgYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:32.369"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "4DC17A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG95711001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/4DC17A!SG95711001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:32Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBABEjkaGAIF7VcXBwAAAAHT44rsAAX0gQOgAAAAciABKPWv/YvDLjD60oeMwy44/hlA0uM/SP27DFDYpwwQqRAYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:32.399"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K4T88A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG81A1N001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K4T88A!SG81A1N001-aa5e4f86-10fc-4d16-ad97-32e64cbc8e24"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:31Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8Q0RwYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:32.416"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG87U1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/K0Q46A!SG87U1S001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:32Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4Q6wEYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:32.424"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K4G10A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG6B71R002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/K4G10A!SG6B71R002"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:32Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4QsgEYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:32.475"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG88K1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG88K1S001-270eb443-a86f-490d-a81c-d2cff1d81125"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:32Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8QqRgYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:32.516"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8791S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_queue_30/K0Q45A!SG8791S001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_queue_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:32Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAGEjkaGAIF5itYHQAAAAKJmrCDAAX0gQfAAAAG0iABKJKrgYzDLjDrjIuMwy44xB5AjZhJSLG0DlCJoA4Q9QgYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:32.550"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG88K1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_usage_30/K0Q46A!SG88K1S001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_usage_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:32Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8QqxgYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:32.631"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K4T88A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG81V1N002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/K4T88A!SG81V1N002"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:32Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAAEjkaGAIF5w+RxAAAAARaXNdQAAX0gQiwAAAAQiABKJe6gozDLjCdqIyMwy445BxAh/dDSLOsDVCMmA0Q/gcYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:32.705"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG88K1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG88K1S001-be79fcd4-1e9e-425d-b3dd-4c652589bd7f"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_usage_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:32Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8QrBgYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:32.749"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "4DC17A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG95711001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "4DC17A!SG95711001-3d41956f-e8b4-4948-8c00-fcebd56e14d3"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:32Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBABEjkaGAIF7VcXBwAAAAHT44rsAAX0gQOgAAAAciABKPWv/YvDLjD60oeMwy44/hlA0uM/SP27DFDYpwwQqhAYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:32.789"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K4G10A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG6B71R002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K4G10A!SG6B71R002-b7035476-7d0c-4ee3-a88e-93a8e5f4086d"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:32Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4QswEYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:32.900"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG87U1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG87U1S001-acb5dbe2-225c-4f7e-998a-c7aecbd1f3fa"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:32Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4Q7AEYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:32.906"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG9BQ1S004"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_queue_30/K0Q46A!SG9BQ1S004"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_queue_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:32Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAAEjkaGAIF5w+RxAAAAARaXNdQAAX0gQiwAAAAQiABKJe6gozDLjCdqIyMwy445BxAh/dDSLOsDVCMmA0Q0ggYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:32.914"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "CZ056A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG46G1P003"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_media_30/CZ056A!SG46G1P003"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:32Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8Q5BwYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:32.947"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K4T88A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG6BT1N001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_media_30/K4T88A!SG6BT1N001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:32Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAFEjkaGAIF8NL2ewAAAAEkEffWAAX0gQgwAAADsiABKPS5gozDLjCao4uMwy44iBNAjIIwSPXbCVCnxAkQlQMYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:32.966"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG87U1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_queue_30/K0Q46A!SG87U1S001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_queue_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:32Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4Q7QEYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:33.007"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K4T88A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG81V1N002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K4T88A!SG81V1N002-91adc207-e87b-4332-97b5-c8dd310a73c3"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:32Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAAEjkaGAIF5w+RxAAAAARaXNdQAAX0gQiwAAAAQiABKJe6gozDLjCdqIyMwy445BxAh/dDSLOsDVCMmA0Q/wcYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:33.188"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG87U1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG87U1S001-26f24327-5352-400e-ac2f-150d493f30ca"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_queue_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:32Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4Q7gEYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:33.232"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG87U1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_media_30/K0Q46A!SG87U1S001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:33Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4Q7wEYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:33.248"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8791S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q45A!SG8791S001-0fc28e7f-0773-4e0d-93e5-c4bf895a5715"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_queue_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:32Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAGEjkaGAIF5itYHQAAAAKJmrCDAAX0gQfAAAAG0iABKJKrgYzDLjDrjIuMwy44xB5AjZhJSLG0DlCJoA4Q9ggYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:33.392"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K4T88A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG6BT1N001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K4T88A!SG6BT1N001-a1c3df3f-c46f-4204-abe8-b43ad6150106"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:32Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAFEjkaGAIF8NL2ewAAAAEkEffWAAX0gQgwAAADsiABKPS5gozDLjCao4uMwy44iBNAjIIwSPXbCVCnxAkQlgMYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:33.421"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG87U1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG87U1S001-36542491-8493-4de8-95e7-920617e9a0d4"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:33Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4Q8AEYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:33.461"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "CZ056A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG46G1P003"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "CZ056A!SG46G1P003-b5f5058a-fb83-46ca-bbbb-383f3be0c327"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:32Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8Q5RwYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:33.462"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG87U1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_usage_30/K0Q46A!SG87U1S001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_usage_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:33Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4Q8gEYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:33.556"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K4G10A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG71A1R001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/K4G10A!SG71A1R001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:33Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAGEjkaGAIF5itYHQAAAAKJmrCDAAX0gQfAAAAG0iABKJKrgYzDLjDrjIuMwy44xB5AjZhJSLG0DlCJoA4QiAkYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:33.608"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG93R1S003"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/K0Q45A!SG93R1S003"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:33Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAGEjkaGAIF5itYHQAAAAKJmrCDAAX0gQfAAAAG0iABKJKrgYzDLjDrjIuMwy44xB5AjZhJSLG0DlCJoA4QsQgYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:33.644"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG87U1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG87U1S001-73fa856e-f8da-4025-91ed-0daae6d60add"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_usage_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:33Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4Q8wEYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:33.675"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG9BQ1S004"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG9BQ1S004-c2e6c0c9-fc4d-4db5-b804-b6b4d9811a27"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_queue_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:32Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAAEjkaGAIF5w+RxAAAAARaXNdQAAX0gQiwAAAAQiABKJe6gozDLjCdqIyMwy445BxAh/dDSLOsDVCMmA0Q0wgYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:33.937"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K4G10A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG71A1R001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K4G10A!SG71A1R001-273d7f53-3547-4b19-a91e-dcc9a699d520"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:33Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAGEjkaGAIF5itYHQAAAAKJmrCDAAX0gQfAAAAG0iABKJKrgYzDLjDrjIuMwy44xB5AjZhJSLG0DlCJoA4QiQkYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:33.943"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "1HA07A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG9CI1R001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/1HA07A!SG9CI1R001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:33Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAFEjkaGAIF8NL2ewAAAAEkEffWAAX0gQgwAAADsiABKPS5gozDLjCao4uMwy44iBNAjIIwSPXbCVCnxAkQqQMYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:34.007"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "CZ056A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG39D1P001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/CZ056A!SG39D1P001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:33Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4QhQIYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:34.127"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG93R1S003"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q45A!SG93R1S003-c0cc7b43-f938-480c-bf19-e339d8bf98bf"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:33Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAGEjkaGAIF5itYHQAAAAKJmrCDAAX0gQfAAAAG0iABKJKrgYzDLjDrjIuMwy44xB5AjZhJSLG0DlCJoA4QsggYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:34.219"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG93R1S003"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_queue_30/K0Q45A!SG93R1S003"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_queue_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:34Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAGEjkaGAIF5itYHQAAAAKJmrCDAAX0gQfAAAAG0iABKJKrgYzDLjDrjIuMwy44xB5AjZhJSLG0DlCJoA4QswgYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:34.292"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "1HA07A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG9CI1R001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "1HA07A!SG9CI1R001-5e521f94-e622-46a9-864b-3039867e8ae7"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:33Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAFEjkaGAIF8NL2ewAAAAEkEffWAAX0gQgwAAADsiABKPS5gozDLjCao4uMwy44iBNAjIIwSPXbCVCnxAkQqgMYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:34.396"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "CZ056A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG39D1P001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "CZ056A!SG39D1P001-57087e6a-925d-48dd-b245-13766c9f4aad"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:33Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4QhgIYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:34.478"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG93R1S003"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q45A!SG93R1S003-ca40194e-c97e-4aac-baac-848388d80e9e"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_queue_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:34Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAGEjkaGAIF5itYHQAAAAKJmrCDAAX0gQfAAAAG0iABKJKrgYzDLjDrjIuMwy44xB5AjZhJSLG0DlCJoA4QtAgYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:34.552"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG93R1S003"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_media_30/K0Q45A!SG93R1S003"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:34Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8QuRkYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:34.749"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG93R1S003"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q45A!SG93R1S003-b5244784-63c0-4ec0-b6b0-0b2c625e13ad"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:34Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8QuhkYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:34.795"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG93R1S003"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_usage_30/K0Q45A!SG93R1S003"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_usage_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:34Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8QvBkYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:34.953"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG93R1S003"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q45A!SG93R1S003-82cea587-d0ee-4e26-8621-eab38f61488a"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_usage_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:34Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8QvRkYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:35.077"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "V7L47A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "MY61T1901V"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/V7L47A!MY61T1901V"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:34Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8Qnh0YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:35.227"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K4G10A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG57R1R00C"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/K4G10A!SG57R1R00C"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:35Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAAEjkaGAIF5w+RxAAAAARaXNdQAAX0gQiwAAAAQiABKJe6gozDLjCdqIyMwy445BxAh/dDSLOsDVCMmA0Q+AgYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:35.273"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K4G10A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG57R1R00C"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_media_30/K4G10A!SG57R1R00C"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:35Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8QzxkYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:35.290"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K4G10A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG6AR1R001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/K4G10A!SG6AR1R001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:35Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4QmQIYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:35.478"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "1HA07A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8BE1R001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/1HA07A!SG8BE1R001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:35Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8Q+x0YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:35.491"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "V7L47A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "MY61T1901V"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "V7L47A!MY61T1901V-04eab411-7f76-4deb-b160-a82bbf73f42c"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:34Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8Qnx0YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:35.523"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "4DC17A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG99R11001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_media_30/4DC17A!SG99R11001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:35Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4QwgIYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:35.537"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "V7L47A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "MY61T1901V"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_queue_30/V7L47A!MY61T1901V"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_queue_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:35Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8QoB0YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:35.656"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K4G10A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG57R1R00C"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K4G10A!SG57R1R00C-30ddf6a1-09a3-47f9-be1d-260ef7232896"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:35Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAAEjkaGAIF5w+RxAAAAARaXNdQAAX0gQiwAAAAQiABKJe6gozDLjCdqIyMwy445BxAh/dDSLOsDVCMmA0Q+QgYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:35.689"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K4G10A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG6AR1R001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K4G10A!SG6AR1R001-68b788f5-7e1a-498e-a8b3-f2c05e9abf89"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:35Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4QmgIYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:35.700"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "V7L47A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "MY61T1901V"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "V7L47A!MY61T1901V-1f3260d8-c95d-48fc-9b74-de8b9ca9e59b"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_queue_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:35Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8QoR0YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:35.727"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K4G10A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG57R1R00C"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K4G10A!SG57R1R00C-da693570-89aa-4efe-8dec-cc89d9d30a75"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:35Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8Q0BkYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:35.836"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "1HA07A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8BE1R001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "1HA07A!SG8BE1R001-c0c3a109-6d2d-4046-8cef-cd4825d30f53"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:35Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8Q/B0YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:35.850"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K4T88A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8751N001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/K4T88A!SG8751N001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:35Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBADEjkaGAIF8KWhbwAAAACZiTcFAAX0gQYwAAAF8iABKO3KgIzDLjDoy4mMwy44jRdAsOY6SLHLC1CKtwsQ6gsYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:35.918"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "4DC17A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG99R11001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "4DC17A!SG99R11001-3e9ab558-9f65-4acf-a09e-903fa12046ab"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:35Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4QwwIYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:35.962"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "2RM82A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "MY97I1T009"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/2RM82A!MY97I1T009"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:35Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4QrQIYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:36.249"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K4T88A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8751N001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K4T88A!SG8751N001-9eb5f295-b3e0-4d24-a325-7cd37fd34270"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:35Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBADEjkaGAIF8KWhbwAAAACZiTcFAAX0gQYwAAAF8iABKO3KgIzDLjDoy4mMwy44jRdAsOY6SLHLC1CKtwsQ6wsYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:36.342"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "1HA07A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG9CJ1R001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_media_30/1HA07A!SG9CJ1R001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:36Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4Q1gIYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:36.382"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG94O1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/K0Q46A!SG94O1S001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:36Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8Qsx0YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:36.415"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "2RM82A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "MY97I1T009"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "2RM82A!MY97I1T009-2175b016-bfbd-42c6-82e0-8145da634e85"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:35Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4QrgIYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:36.611"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "1HA07A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8C61R001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_media_30/1HA07A!SG8C61R001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:36Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBADEjkaGAIF8KWhbwAAAACZiTcFAAX0gQYwAAAF8iABKO3KgIzDLjDoy4mMwy44jRdAsOY6SLHLC1CKtwsQ/gsYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:36.755"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "1HA07A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG9CJ1R001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "1HA07A!SG9CJ1R001-f434b7c7-882b-4e80-8f07-82fac5f0db46"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:36Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4Q1wIYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:36.872"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG94O1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG94O1S001-013cd520-9fb9-480e-bda1-fe8426316e2c"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:36Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8QtB0YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:37.047"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "1HA07A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8C61R001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "1HA07A!SG8C61R001-a815e80b-c32a-4e2f-82d8-bf9ce4540cd4"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:36Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBADEjkaGAIF8KWhbwAAAACZiTcFAAX0gQYwAAAF8iABKO3KgIzDLjDoy4mMwy44jRdAsOY6SLHLC1CKtwsQ/wsYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:37.050"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG94O1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_queue_30/K0Q46A!SG94O1S001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_queue_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:36Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8QtR0YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:37.079"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K4G10A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG6991R002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/K4G10A!SG6991R002"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:37Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8Q9hkYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:37.136"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "CZ056A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG41K1P001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/CZ056A!SG41K1P001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:37Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4Q6gIYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:37.430"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K4G10A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG6991R002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K4G10A!SG6991R002-4d47e928-b370-4073-8003-851ef634a631"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:37Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8Q9xkYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:37.507"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "CZ056A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG41K1P001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "CZ056A!SG41K1P001-2ae7e15c-918e-451d-b3ad-6cfe2a9996dd"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:37Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4Q6wIYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:37.514"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K4G10A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG67P1R001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/K4G10A!SG67P1R001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:37Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8Q3RoYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:37.560"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG94O1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG94O1S001-2289861f-fe75-489f-8b3f-6c0f4e9a0c0c"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_queue_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:36Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8Qth0YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:37.690"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG94O1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_media_30/K0Q46A!SG94O1S001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:37Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8Qtx0YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:37.750"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "CZ056A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG46G1P003"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/CZ056A!SG46G1P003"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:37Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8QihoYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:37.780"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG94G1S002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/K0Q46A!SG94G1S002"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:37Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8Qoh4YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:37.827"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K4T88A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG79F1N002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/K4T88A!SG79F1N002"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:37Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAAEjkaGAIF5w+RxAAAAARaXNdQAAX0gQiwAAAAQiABKJe6gozDLjCdqIyMwy445BxAh/dDSLOsDVCMmA0QjAkYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:37.864"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG94O1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG94O1S001-581563d3-cdc4-4267-ac5b-114f891787cf"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:37Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8QuB0YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:37.887"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K4G10A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG67P1R001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K4G10A!SG67P1R001-3191f078-bb50-49d8-be70-7de90715ebe6"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:37Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8Q3hoYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:37.912"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "CZ056A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG37N1P001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/CZ056A!SG37N1P001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:37Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBADEjkaGAIF8KWhbwAAAACZiTcFAAX0gQYwAAAF8iABKO3KgIzDLjDoy4mMwy44jRdAsOY6SLHLC1CKtwsQpQwYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:37.935"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K4T88A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG7241N001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/K4T88A!SG7241N001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:37Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8QriAYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:37.944"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG94O1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_usage_30/K0Q46A!SG94O1S001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_usage_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:37Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8Quh0YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:38.057"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8691S002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_queue_30/K0Q46A!SG8691S002"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_queue_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:37Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4Q/gIYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:38.106"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "CZ056A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG46G1P003"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "CZ056A!SG46G1P003-e23fb12f-6bc2-4bfc-bcfd-3df73d7fc7b3"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:37Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8QixoYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:38.112"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG94O1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG94O1S001-3072f573-00d5-4cfd-bcef-b31fa1293595"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_usage_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:37Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8Qux0YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:38.212"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K4T88A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG79F1N002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K4T88A!SG79F1N002-eebd0a9e-652d-4ac4-bb7b-dcd77c4e63d8"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:37Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAAEjkaGAIF5w+RxAAAAARaXNdQAAX0gQiwAAAAQiABKJe6gozDLjCdqIyMwy445BxAh/dDSLOsDVCMmA0QjQkYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:38.258"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "CZ056A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG37N1P001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "CZ056A!SG37N1P001-531ad270-a1db-401f-975c-e0be992f4bc1"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:37Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBADEjkaGAIF8KWhbwAAAACZiTcFAAX0gQYwAAAF8iABKO3KgIzDLjDoy4mMwy44jRdAsOY6SLHLC1CKtwsQpgwYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:38.282"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K4T88A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG7241N001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K4T88A!SG7241N001-897afb03-c37c-4df8-917c-699fb926eae6"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:37Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8QryAYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:38.283"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG94G1S002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG94G1S002-477eb5e1-eb40-401f-9747-bd4e46133604"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:37Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8Qox4YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:38.291"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG87G1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/K0Q45A!SG87G1S001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:38Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAAEjkaGAIF5w+RxAAAAARaXNdQAAX0gQiwAAAAQiABKJe6gozDLjCdqIyMwy445BxAh/dDSLOsDVCMmA0QwwoYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:38.355"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG94G1S002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_queue_30/K0Q46A!SG94G1S002"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_queue_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:38Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8QpB4YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:38.449"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8691S002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG8691S002-798843ea-444e-4ffd-acec-06eeee81633c"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_queue_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:37Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4Q/wIYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:38.516"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG94G1S002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG94G1S002-8d72e7fa-d1bd-46e2-9f82-3f983efe7ab7"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_queue_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:38Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8QpR4YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:38.525"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "CZ056A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG42D1P001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/CZ056A!SG42D1P001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:38Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBADEjkaGAIF8KWhbwAAAACZiTcFAAX0gQYwAAAF8iABKO3KgIzDLjDoy4mMwy44jRdAsOY6SLHLC1CKtwsQuQwYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:38.548"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8961S003"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/K0Q46A!SG8961S003"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:38Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8QuB8YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:38.571"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG94G1S002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_media_30/K0Q46A!SG94G1S002"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:38Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8Qph4YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:38.665"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "4DC17A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG99R11001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/4DC17A!SG99R11001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:38Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8Q8RoYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:38.733"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG94G1S002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG94G1S002-a8526cad-dec2-4b85-8e04-c497c4bc7b25"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:38Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8Qpx4YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:38.772"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K4T88A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG97H1N002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/K4T88A!SG97H1N002"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:38Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4QkQMYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:38.793"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG94G1S002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_usage_30/K0Q46A!SG94G1S002"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_usage_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:38Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8QqR4YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:38.813"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG87G1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q45A!SG87G1S001-ada3421c-b00b-49d5-a52a-18fc078a21d7"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:38Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAAEjkaGAIF5w+RxAAAAARaXNdQAAX0gQiwAAAAQiABKJe6gozDLjCdqIyMwy445BxAh/dDSLOsDVCMmA0QxAoYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:38.830"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "CZ056A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG53J1P001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/CZ056A!SG53J1P001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:38Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8QzR0YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:38.872"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG87G1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_queue_30/K0Q45A!SG87G1S001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_queue_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:38Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAAEjkaGAIF5w+RxAAAAARaXNdQAAX0gQiwAAAAQiABKJe6gozDLjCdqIyMwy445BxAh/dDSLOsDVCMmA0QxQoYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:38.892"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG86S1S002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/K0Q45A!SG86S1S002"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:38Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8QwiAYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:38.911"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "CZ056A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG42D1P001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "CZ056A!SG42D1P001-446f0319-5983-4d39-8f62-388581329f8f"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:38Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBADEjkaGAIF8KWhbwAAAACZiTcFAAX0gQYwAAAF8iABKO3KgIzDLjDoy4mMwy44jRdAsOY6SLHLC1CKtwsQugwYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:38.948"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG94G1S002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG94G1S002-b2ac76cc-741d-4c03-a817-e557a5a7116a"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_usage_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:38Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8Qqh4YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:39.021"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8961S003"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG8961S003-e2a851ba-8f04-4010-8ec5-97726ee7ea99"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:38Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8QuR8YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:39.035"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "4DC17A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG99R11001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "4DC17A!SG99R11001-c2418171-f933-4ada-b842-7ff60b85af68"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:38Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8Q8hoYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:39.066"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8961S003"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_queue_30/K0Q46A!SG8961S003"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_queue_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:39Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8Quh8YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:39.102"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG87G1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q45A!SG87G1S001-c8832b96-872b-4657-937f-8f655e33516f"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_queue_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:38Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAAEjkaGAIF5w+RxAAAAARaXNdQAAX0gQiwAAAAQiABKJe6gozDLjCdqIyMwy445BxAh/dDSLOsDVCMmA0QxgoYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:39.149"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K4T88A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG97H1N002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K4T88A!SG97H1N002-87c368a8-e5c4-4dca-8358-233a75c0f79d"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:38Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4QkgMYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:39.157"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG87G1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_media_30/K0Q45A!SG87G1S001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:39Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAAEjkaGAIF5w+RxAAAAARaXNdQAAX0gQiwAAAAQiABKJe6gozDLjCdqIyMwy445BxAh/dDSLOsDVCMmA0QxwoYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:39.220"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "CZ056A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG53J1P001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "CZ056A!SG53J1P001-6abbd645-e2fe-4649-9cfd-f57cdc91c10c"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:38Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8Qzh0YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:39.246"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8961S003"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG8961S003-ca748a8d-03b4-4f6d-8477-37b64832d902"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_queue_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:39Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8Qux8YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:39.323"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG87G1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q45A!SG87G1S001-5036a02e-eac3-4a9e-b4e4-b0b42cc5f563"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:39Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAAEjkaGAIF5w+RxAAAAARaXNdQAAX0gQiwAAAAQiABKJe6gozDLjCdqIyMwy445BxAh/dDSLOsDVCMmA0QyAoYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:39.372"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG87G1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_usage_30/K0Q45A!SG87G1S001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_usage_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:39Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAAEjkaGAIF5w+RxAAAAARaXNdQAAX0gQiwAAAAQiABKJe6gozDLjCdqIyMwy445BxAh/dDSLOsDVCMmA0QygoYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:39.383"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8961S003"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_media_30/K0Q46A!SG8961S003"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:39Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8QvB8YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:39.394"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG86S1S002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q45A!SG86S1S002-3545d873-ce58-40c0-ba9c-1b745f786931"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:38Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8QwyAYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:39.455"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG95M1S003"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/K0Q46A!SG95M1S003"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:39Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4QpQMYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:39.473"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8AF1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/K0Q46A!SG8AF1S001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:39Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8QnhoYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:39.518"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG86S1S002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_queue_30/K0Q45A!SG86S1S002"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_queue_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:39Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8QxCAYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:39.532"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG87G1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q45A!SG87G1S001-438c63c0-d65b-41ab-ad8d-0d9fb8c8edbd"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_usage_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:39Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAAEjkaGAIF5w+RxAAAAARaXNdQAAX0gQiwAAAAQiABKJe6gozDLjCdqIyMwy445BxAh/dDSLOsDVCMmA0QywoYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:39.562"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8961S003"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG8961S003-0b12c8b2-aac2-4e31-b29b-bfed14e9c0fb"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:39Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8QvR8YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:39.605"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8961S003"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_usage_30/K0Q46A!SG8961S003"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_usage_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:39Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8Qvx8YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:39.758"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG86S1S002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q45A!SG86S1S002-bebb6b77-77b9-4d1c-abfe-27af7d5a1776"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_queue_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:39Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8QxSAYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:39.764"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8961S003"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG8961S003-ed05c5fc-78fc-4feb-8d87-3aa16cba2e85"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_usage_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:39Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8QwB8YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:39.845"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG86S1S002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_media_30/K0Q45A!SG86S1S002"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:39Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8QxiAYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:39.964"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8AF1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG8AF1S001-64b3201e-42d0-4f65-aac2-b1b5cb20c3b9"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:39Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8QnxoYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:39.972"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG95M1S003"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG95M1S003-a4c9cac4-0f95-4640-bed7-4e1f313e873e"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:39Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4QpgMYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:40.025"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG95M1S003"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_queue_30/K0Q46A!SG95M1S003"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_queue_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:39Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4QpwMYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:40.058"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8AF1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_queue_30/K0Q46A!SG8AF1S001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_queue_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:39Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8QoBoYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:40.069"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG86S1S002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q45A!SG86S1S002-3af28328-b798-4534-9f3a-f242e7905010"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:39Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8QxyAYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:40.125"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG86S1S002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_usage_30/K0Q45A!SG86S1S002"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_usage_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:40Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8QySAYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:40.190"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K4G10A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG65P1R001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_media_30/K4G10A!SG65P1R001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:40Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAAEjkaGAIF5w+RxAAAAARaXNdQAAX0gQiwAAAAQiABKJe6gozDLjCdqIyMwy445BxAh/dDSLOsDVCMmA0QxgkYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:40.197"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG95M1S003"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG95M1S003-dd745c39-e66d-4880-a790-f4fc2ff51b18"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_queue_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:39Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4QqAMYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:40.205"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG03E1S004"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/K0Q45A!SG03E1S004"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:40Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8Q0h8YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:40.242"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG95M1S003"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_media_30/K0Q46A!SG95M1S003"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:40Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4QqQMYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:40.249"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "L2E27A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG5CJ1Q001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_media_30/L2E27A!SG5CJ1Q001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:40Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8QhRsYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:40.256"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8AD1S002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/K0Q46A!SG8AD1S002"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:40Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAAEjkaGAIF5w+RxAAAAARaXNdQAAX0gQiwAAAAQiABKJe6gozDLjCdqIyMwy445BxAh/dDSLOsDVCMmA0Q3QoYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:40.285"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8AF1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG8AF1S001-fa2c1f51-e596-4b58-a85b-f9798f051844"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_queue_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:39Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8QoRoYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:40.289"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG86S1S002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q45A!SG86S1S002-e6be962c-2433-463b-9fe0-3f3d313c6575"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_usage_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:40Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8QyiAYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:40.318"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "1HA06A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG76R1Q001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/1HA06A!SG76R1Q001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:40Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8Q4R0YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:40.352"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8AF1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_media_30/K0Q46A!SG8AF1S001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:40Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8QohoYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:40.428"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG95M1S003"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG95M1S003-058f80af-92a2-44ad-9246-da293bd35ed7"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:40Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4QqgMYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:40.470"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG95M1S003"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_usage_30/K0Q46A!SG95M1S003"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_usage_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:40Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4QrAMYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:40.518"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8AF1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG8AF1S001-afabe006-236f-4bc4-9132-228979c9ecfb"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:40Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8QoxoYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:40.568"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8AF1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_usage_30/K0Q46A!SG8AF1S001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_usage_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:40Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8QpRoYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:40.651"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG95M1S003"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG95M1S003-6497e107-e1db-43ad-9c46-88b0bca44bc4"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_usage_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:40Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4QrQMYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:40.669"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "L2E27A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG5CJ1Q001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "L2E27A!SG5CJ1Q001-077b7fa5-bc70-40e7-aa73-9720e2a95871"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:40Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8QhhsYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:40.677"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K4G10A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG65P1R001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K4G10A!SG65P1R001-0574a664-2eeb-4dfc-96ff-2ecc259dab42"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:40Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAAEjkaGAIF5w+RxAAAAARaXNdQAAX0gQiwAAAAQiABKJe6gozDLjCdqIyMwy445BxAh/dDSLOsDVCMmA0QxwkYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:40.682"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "1HA06A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG76R1Q001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "1HA06A!SG76R1Q001-f3f52fe3-b813-404e-a7e6-0f8bc61fbf68"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:40Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8Q4h0YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:40.696"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG03E1S004"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q45A!SG03E1S004-986a91aa-3e9a-4d74-a54a-be65e36ef3ce"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:40Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8Q0x8YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:40.733"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8AF1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG8AF1S001-fcb79a9d-64ab-4b94-beac-401450ef2143"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_usage_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:40Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8QphoYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:40.752"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG03E1S004"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_queue_30/K0Q45A!SG03E1S004"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_queue_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:40Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8Q1B8YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:40.763"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8AD1S002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG8AD1S002-52adf930-04aa-47c1-82e8-466ae0e87a80"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:40Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAAEjkaGAIF5w+RxAAAAARaXNdQAAX0gQiwAAAAQiABKJe6gozDLjCdqIyMwy445BxAh/dDSLOsDVCMmA0Q3goYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:40.916"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "L2E27A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG56R1Q001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/L2E27A!SG56R1Q001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:40Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4QvwMYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:40.953"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8AD1S002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_media_30/K0Q46A!SG8AD1S002"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:40Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAAEjkaGAIF5w+RxAAAAARaXNdQAAX0gQiwAAAAQiABKJe6gozDLjCdqIyMwy445BxAh/dDSLOsDVCMmA0Q3woYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:40.955"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG03E1S004"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q45A!SG03E1S004-9f82705c-8ffd-4e91-8c87-85702556b6bc"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_queue_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:40Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8Q1R8YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:41.037"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG03E1S004"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_media_30/K0Q45A!SG03E1S004"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:40Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8Q1h8YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:41.118"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG89Q1S003"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/K0Q46A!SG89Q1S003"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:41Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8Q9R0YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:41.184"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8AD1S002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG8AD1S002-a2cd7afc-ce6e-44e6-aca4-6ec8472a2c98"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:40Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAAEjkaGAIF5w+RxAAAAARaXNdQAAX0gQiwAAAAQiABKJe6gozDLjCdqIyMwy445BxAh/dDSLOsDVCMmA0Q4AoYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:41.221"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG03E1S004"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q45A!SG03E1S004-3a5041ad-1648-4abd-b9eb-5b5b381b9345"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:40Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8Q1x8YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:41.231"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8AD1S002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_usage_30/K0Q46A!SG8AD1S002"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_usage_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:41Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAAEjkaGAIF5w+RxAAAAARaXNdQAAX0gQiwAAAAQiABKJe6gozDLjCdqIyMwy445BxAh/dDSLOsDVCMmA0Q4goYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:41.265"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG03E1S004"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_usage_30/K0Q45A!SG03E1S004"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_usage_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:41Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8Q2R8YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:41.307"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "L2E27A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG56R1Q001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "L2E27A!SG56R1Q001-3fe897aa-148d-4995-bb6c-2bd093241665"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:40Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4QwAMYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:41.319"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "1HA07A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG01D1R001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/1HA07A!SG01D1R001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:41Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8Qzx4YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:41.407"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8AD1S002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG8AD1S002-ea1108f5-c8cc-4315-a13c-8f39b85edfca"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_usage_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:41Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAAEjkaGAIF5w+RxAAAAARaXNdQAAX0gQiwAAAAQiABKJe6gozDLjCdqIyMwy445BxAh/dDSLOsDVCMmA0Q4woYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:41.421"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG03E1S004"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q45A!SG03E1S004-8c777331-0159-4ada-a082-8b378b95c216"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_usage_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:41Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8Q2h8YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:41.624"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "CZ056A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG52S1P002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/CZ056A!SG52S1P002"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:41Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8QuBoYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:41.638"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG89Q1S003"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG89Q1S003-4e30edad-ead1-4621-9dfe-a43802b046c1"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:41Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8QwRsYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:41.688"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "1HA07A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG01D1R001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "1HA07A!SG01D1R001-c4a07feb-27f9-4efc-b154-4256c5eca9f9"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:41Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8Q0B4YAQ=="
                }
            ]
        ];

        let result = Utils.createSetOfTopicsFromArray(data)

        expect(result).toEqual(expected);
    });
});

describe('filterArrayByTopic()', () => {
    it('filterArrayByTopic() returns the correct result', () => {
        let topicsToInclude = ['open_usage_30', 'open_queue_30'];

        let data = [
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:31.002"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8AM1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_usage_30/K0Q45A!SG8AM1S001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_usage_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:30Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4Q2AEYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:31.126"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG97B1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG97B1S001-7956561f-1061-4074-8072-37f4425c7fb9"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_usage_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:30Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAGEjkaGAIF5itYHQAAAAKJmrCDAAX0gQfAAAAG0iABKJKrgYzDLjDrjIuMwy44xB5AjZhJSLG0DlCJoA4QjAgYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:31.189"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8AM1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q45A!SG8AM1S001-4245b727-ee1c-4d20-9c56-d7af37523c4a"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_usage_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:30Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4Q2QEYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:31.209"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG88K1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/K0Q46A!SG88K1S001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:31Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8QpBgYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:31.225"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "4DC17A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG93111001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "4DC17A!SG93111001-eba47869-62e9-451d-81b5-8e9be44cf125"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:30Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBABEjkaGAIF7VcXBwAAAAHT44rsAAX0gQOgAAAAciABKPWv/YvDLjD60oeMwy44/hlA0uM/SP27DFDYpwwQpw8YAQ=="
                }
            ]
        ];

        let result = Utils.filterArrayByTopic(data, topicsToInclude)
        let expected = [[{ "Field": "@timestamp", "Value": "2020-08-27 19:59:31.002" }, { "Field": "fields.ProductNumber", "Value": "K0Q45A" }, { "Field": "fields.SerialNumber", "Value": "SG8AM1S001" }, { "Field": "fields.bucket_name", "Value": "cloudconnector-core-production" }, { "Field": "fields.bucket_region", "Value": "US_EAST_1" }, { "Field": "fields.key", "Value": "topics/open_usage_30/K0Q45A!SG8AM1S001" }, { "Field": "fields.topic", "Value": "open_usage_30" }, { "Field": "fields.metadata.date", "Value": "2020-08-27T19:59:30Z" }, { "Field": "@ptr", "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4Q2AEYAQ==" }], [{ "Field": "@timestamp", "Value": "2020-08-27 19:59:31.126" }, { "Field": "fields.ProductNumber", "Value": "K0Q46A" }, { "Field": "fields.SerialNumber", "Value": "SG97B1S001" }, { "Field": "fields.bucket_name", "Value": "cloudconnector-to-blacksea-production" }, { "Field": "fields.bucket_region", "Value": "US_WEST_1" }, { "Field": "fields.key", "Value": "K0Q46A!SG97B1S001-7956561f-1061-4074-8072-37f4425c7fb9" }, { "Field": "fields.topic", "Value": "open_usage_30" }, { "Field": "fields.metadata.date", "Value": "2020-08-27T19:59:30Z" }, { "Field": "@ptr", "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAGEjkaGAIF5itYHQAAAAKJmrCDAAX0gQfAAAAG0iABKJKrgYzDLjDrjIuMwy44xB5AjZhJSLG0DlCJoA4QjAgYAQ==" }], [{ "Field": "@timestamp", "Value": "2020-08-27 19:59:31.189" }, { "Field": "fields.ProductNumber", "Value": "K0Q45A" }, { "Field": "fields.SerialNumber", "Value": "SG8AM1S001" }, { "Field": "fields.bucket_name", "Value": "cloudconnector-to-blacksea-production" }, { "Field": "fields.bucket_region", "Value": "US_WEST_1" }, { "Field": "fields.key", "Value": "K0Q45A!SG8AM1S001-4245b727-ee1c-4d20-9c56-d7af37523c4a" }, { "Field": "fields.topic", "Value": "open_usage_30" }, { "Field": "fields.metadata.date", "Value": "2020-08-27T19:59:30Z" }, { "Field": "@ptr", "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4Q2QEYAQ==" }]];

        expect(result).toEqual(expected);
    });
});

describe('createCountMapFromArray()', () => {
    it('createCountMapFromArray() returns the correct result', () => {
        let data = [
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:31.002"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8AM1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_usage_30/K0Q45A!SG8AM1S001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_usage_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:30Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4Q2AEYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:31.126"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG97B1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG97B1S001-7956561f-1061-4074-8072-37f4425c7fb9"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_usage_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:30Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAGEjkaGAIF5itYHQAAAAKJmrCDAAX0gQfAAAAG0iABKJKrgYzDLjDrjIuMwy44xB5AjZhJSLG0DlCJoA4QjAgYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:31.189"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q45A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG8AM1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q45A!SG8AM1S001-4245b727-ee1c-4d20-9c56-d7af37523c4a"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_usage_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:30Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4Q2QEYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:31.209"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG88K1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/K0Q46A!SG88K1S001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:31Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8QpBgYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:31.225"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "4DC17A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG93111001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "4DC17A!SG93111001-eba47869-62e9-451d-81b5-8e9be44cf125"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:30Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBABEjkaGAIF7VcXBwAAAAHT44rsAAX0gQOgAAAAciABKPWv/YvDLjD60oeMwy44/hlA0uM/SP27DFDYpwwQpw8YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:31.293"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "CZ056A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG3A31P001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_media_30/CZ056A!SG3A31P001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:31Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBABEjkaGAIF7VcXBwAAAAHT44rsAAX0gQOgAAAAciABKPWv/YvDLjD60oeMwy44/hlA0uM/SP27DFDYpwwQlRAYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:31.353"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "CZ056A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG3AP1P001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_media_30/CZ056A!SG3AP1P001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:31Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAGEjkaGAIF5itYHQAAAAKJmrCDAAX0gQfAAAAG0iABKJKrgYzDLjDrjIuMwy44xB5AjZhJSLG0DlCJoA4Q4QgYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:31.377"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K4T88A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG85H1N002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_media_30/K4T88A!SG85H1N002"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:31Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAAEjkaGAIF5w+RxAAAAARaXNdQAAX0gQiwAAAAQiABKJe6gozDLjCdqIyMwy445BxAh/dDSLOsDVCMmA0Q1wcYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:31.721"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG88K1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG88K1S001-9a5c78a6-8039-4c09-9765-c44bcaeeb0fc"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:31Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8QpRgYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:31.756"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "CZ056A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG3A31P001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "CZ056A!SG3A31P001-653f7cbb-81c5-4092-88ff-8dda9299540b"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:31Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBABEjkaGAIF7VcXBwAAAAHT44rsAAX0gQOgAAAAciABKPWv/YvDLjD60oeMwy44/hlA0uM/SP27DFDYpwwQlhAYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:31.786"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "4DC17A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG98T11002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/4DC17A!SG98T11002"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:31Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4QngEYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:31.804"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "CZ056A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG3AP1P001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "CZ056A!SG3AP1P001-88cfdbab-ce7c-4d97-8f34-51c4cfb9770d"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:31Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAGEjkaGAIF5itYHQAAAAKJmrCDAAX0gQfAAAAG0iABKJKrgYzDLjDrjIuMwy44xB5AjZhJSLG0DlCJoA4Q4ggYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:31.839"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K4T88A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG85H1N002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K4T88A!SG85H1N002-49393c35-8cd9-4176-8c1e-1d5980d3468b"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:31Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAAEjkaGAIF5w+RxAAAAARaXNdQAAX0gQiwAAAAQiABKJe6gozDLjCdqIyMwy445BxAh/dDSLOsDVCMmA0Q2AcYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:31.888"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG88K1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_queue_30/K0Q46A!SG88K1S001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_queue_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:31Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8QphgYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:32.002"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K4T88A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG81A1N001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/K4T88A!SG81A1N001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:31Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBABEjkaGAIF7VcXBwAAAAHT44rsAAX0gQOgAAAAciABKPWv/YvDLjD60oeMwy44/hlA0uM/SP27DFDYpwwQug8YAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:32.149"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "4DC17A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG98T11002"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "4DC17A!SG98T11002-e0790a04-c9d8-4906-bbb3-f6c818414e84"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:31Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAEEjkaGAIF6gb0ZQAAAADDNrEZAAX0gQlgAAAAUiABKOqGg4zDLjCEjo2Mwy447B1Ans5JSOKyDlC6ng4QnwEYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:32.214"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG88K1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "K0Q46A!SG88K1S001-142d0bf4-40f6-4c5e-aa49-0f728709ab06"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_queue_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:31Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8QpxgYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:32.284"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K0Q46A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG88K1S001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_media_30/K0Q46A!SG88K1S001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_media_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:32Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBAHEjkaGAIF5nqE2QAAAAChxjYbAAX0gQJQAAAEkiABKPnb+4vDLjCRkIaMwy44wCFA9JNQSMLLD1Catw8QqBgYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:32.369"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "4DC17A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG95711001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-core-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_EAST_1"
                },
                {
                    "Field": "fields.key",
                    "Value": "topics/open_status_30/4DC17A!SG95711001"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:32Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBABEjkaGAIF7VcXBwAAAAHT44rsAAX0gQOgAAAAciABKPWv/YvDLjD60oeMwy44/hlA0uM/SP27DFDYpwwQqRAYAQ=="
                }
            ],
            [
                {
                    "Field": "@timestamp",
                    "Value": "2020-08-27 19:59:32.399"
                },
                {
                    "Field": "fields.ProductNumber",
                    "Value": "K4T88A"
                },
                {
                    "Field": "fields.SerialNumber",
                    "Value": "SG81A1N001"
                },
                {
                    "Field": "fields.bucket_name",
                    "Value": "cloudconnector-to-blacksea-production"
                },
                {
                    "Field": "fields.bucket_region",
                    "Value": "US_WEST_1"
                },
                {
                    "Field": "fields.akey",
                    "Value": "K4T88A!SG81A1N001-aa5e4f86-10fc-4d16-ad97-32e64cbc8e24"
                },
                {
                    "Field": "fields.topic",
                    "Value": "open_status_30"
                },
                {
                    "Field": "fields.metadata.date",
                    "Value": "2020-08-27T19:59:31Z"
                },
                {
                    "Field": "@ptr",
                    "Value": "CmMKJgoiNjY0ODI4NDA3MDgzOi9hd3MvbGFtYmRhL0FXU1VwbG9hZBACEjkaGAIF6kZMhwAAAADQ211cAAX0gQDAAAADciABKOGe+ovDLjDH9ISMwy449iBAzIBRSI3RD1DkvA8Q0RwYAQ=="
                }
            ]
        ];

        let expected = new Map([['K0Q45A!SG8AM1S001', 2], ['K0Q46A!SG97B1S001', 1], ['K0Q46A!SG88K1S001', 5], ['4DC17A!SG93111001', 1], ['CZ056A!SG3A31P001', 2], ['CZ056A!SG3AP1P001', 2], ['K4T88A!SG85H1N002', 2], ['4DC17A!SG98T11002', 2], ['K4T88A!SG81A1N001', 2], ['4DC17A!SG95711001', 1]]);

        let result = Utils.createCountMapFromArray(data);
        expect(result).toEqual(expected);
    });
});

describe('stringToJsonObject()', () => {
    it('stringToJsonObject() shoudl return the appropiate result', () => {
        let data = `<?xml version="1.0" encoding="UTF-8"?>
        <PrinterInfo version="1.7">
          <Printer version="3.0">
            <PPU_Account_Name>MiquelCCTest_3763</PPU_Account_Name>
            <Current_Printer_Configuration>
              <Product_Number>4VW13A</Product_Number>
              <Serial_Number>HP11CT0001</Serial_Number>
              <Product_Name>HP PageWide XL 4200 MFP</Product_Name>
              <FW_Version>TYPH_00_20_29.2</FW_Version>
              <FW_Date value="20200911184600">2020-09-11T18:46:00Z</FW_Date>
              <MAC_Address>48ba4ec01011</MAC_Address>
              <IP_Address>15.83.12.1</IP_Address>
            </Current_Printer_Configuration>
            <Timestamp value="20200927120601">2020-09-27T12:06:01Z</Timestamp>
          </Printer>
        </PrinterInfo>`;

        let result = Utils.stringToJsonObject(data);

        let expected = `<?xml version="1.0" encoding="UTF-8"?>
        <PrinterInfo version="1.7">
          <Printer version="3.0">
            <PPU_Account_Name>MiquelCCTest_3763</PPU_Account_Name>
            <Current_Printer_Configuration>
              <Product_Number>4VW13A</Product_Number>
              <Serial_Number>HP11CT0001</Serial_Number>
              <Product_Name>HP PageWide XL 4200 MFP</Product_Name>
              <FW_Version>TYPH_00_20_29.2</FW_Version>
              <FW_Date value="20200911184600">2020-09-11T18:46:00Z</FW_Date>
              <MAC_Address>48ba4ec01011</MAC_Address>
              <IP_Address>15.83.12.1</IP_Address>
            </Current_Printer_Configuration>
            <Timestamp value="20200927120601">2020-09-27T12:06:01Z</Timestamp>
          </Printer>
        </PrinterInfo>`;
        
        expect(result).toEqual(expected);
    });

    it('stringToJsonObject() shoudl return the appropiate result', () => {
        let data = "{ 'hi' : 'bye'}";

        let result = Utils.stringToJsonObject(data);

        let expected = "{ 'hi' : 'bye'}";
        
        expect(result).toEqual(expected);
    });
});
