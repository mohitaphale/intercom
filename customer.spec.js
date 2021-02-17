const customer = require('./customer');
const os = require('os');
const validRecord = { latitude: '0', longitude: '0', user_id: 0, name: '' };

describe('parse', () => {

    it('should reject blank value', () => {
        const value = customer.parse(undefined);
        expect(value).toBeNull();
    });

    it('should reject invalid latitude', () => {
        const record = Object.assign({}, validRecord, { latitude: 'x' });
        const value = customer.parse(record);
        expect(value).toBeNull();
    });

    it('should reject out of range latitude (underflow)', () => {
        const record = Object.assign({}, validRecord, { latitude: '-91' });
        const value = customer.parse(record);
        expect(value).toBeNull();
    });

    it('should reject out of range latitude (overflow)', () => {
        const record = Object.assign({}, validRecord, { latitude: '91' });
        const value = customer.parse(record);
        expect(value).toBeNull();
    });

    it('should accept & parse valid latitude', () => {
        const record = Object.assign({}, validRecord, { latitude: '0' });
        const value = customer.parse(record);
        expect(value).toBeDefined();
        expect(value.latitude).toBe('0');
    });

    it('should reject invalid longitude', () => {
        const record = Object.assign({}, validRecord, { longitude: 'x' });
        const value = customer.parse(record);
        expect(value).toBeNull();
    });

    it('should reject out of range longitude (underflow)', () => {
        const record = Object.assign({}, validRecord, { longitude: '-181' });
        const value = customer.parse(record);
        expect(value).toBeNull();
    });

    it('should reject out of range longitude (overflow)', () => {
        const record = Object.assign({}, validRecord, { longitude: '181' });
        const value = customer.parse(record);
        expect(value).toBeNull();
    });

    it('should accept & parse valid longitude', () => {
        const record = Object.assign({}, validRecord, { longitude: '0' });
        const value = customer.parse(record);
        expect(value).toBeDefined();
        expect(value.longitude).toBe('0');
    });

    it('should reject alphanumeric user_id', () => {
        const record = Object.assign({}, validRecord, { user_id: '14abc' });
        const value = customer.parse(record);
        expect(value).toBeNull();
    });

    it('should accept valid integer user_id', () => {
        const record = Object.assign({}, validRecord, { user_id: 0 });
        const value = customer.parse(record);
        expect(value.user_id).toBe(0);
    });

    it('should reject invalid name (object)', () => {
        const record = Object.assign({}, validRecord, { name: { x: true } });
        const value = customer.parse(record);
        expect(value).toBeNull();
    });

    it('should reject invalid name (numeric)', () => {
        const record = Object.assign({}, validRecord, { name: 16 });
        const value = customer.parse(record);
        expect(value).toBeNull();
    });

    it('should accept valid string name', () => {
        const record = Object.assign({}, validRecord, { name: 'Ah ' });
        const value = customer.parse(record);
        expect(value.name).toBe('Ah ');
    });
});

describe('format', () => {

    it('should format a list of customers', () => {
        const list = [{ name: 'A', user_id: 0 }, { name: 'B', user_id: 42 }];
        const formatted = customer.format(list);
        expect(formatted).toMatch("A, 0" + os.EOL + "B, 42");
    });

    it('should gracefully handle empty list', () => {
        const list = [];
        const formatted = customer.format(list);
        expect(formatted).toMatch("");
    });
});

describe('sortByUserId', () => {

    it('should compare equal user ids', () => {
        const x = { user_id: 5 };
        const y = { user_id: 5 };
        const compare = customer.sortByUserId(x, y);
        expect(compare).toBe(0);
    });

    it('should compare with larger user id', () => {
        const x = { user_id: 5 };
        const y = { user_id: 15 };
        const compare = customer.sortByUserId(x, y);
        expect(compare).toBe(-1);
    });

    it('should compare with smaller user id', () => {
        const x = { user_id: 15 };
        const y = { user_id: 5 };
        const compare = customer.sortByUserId(x, y);
        expect(compare).toBe(1);
    });
});