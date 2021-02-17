const file = require('./file');

describe('getFileRecords', () => {

    it('should parse all valid record', () => {
        const filePath = './resources/customers.txt';
        const records = file.getFileRecords(filePath);
        expect(records).toHaveLength(32);
    });

    it('should gracefully ignore invalid records', () => {
        const filePath = './resources/customers-invalid.txt';
        const records = file.getFileRecords(filePath);
        expect(records).toHaveLength(30);
    });

    it('should gracefully fail with invalid file', () => {
        const filePath = './resources/nonexistant.txt';
        const records = file.getFileRecords(filePath);
        expect(records).toStrictEqual([]);
    });
});

describe('fromJsonToRecord', () => {

    it('should parse valid json', () => {
        const raw = '{"test":123}';
        const value = file.fromJsonToRecord(raw);
        expect(value).toStrictEqual({
            test: 123
        });
    });

    it('should reject invalid json', () => {
        const raw = '{"test":123"}';
        const value = file.fromJsonToRecord(raw);
        expect(value).toBeNull();
    });
});