const distance = require('./distance');

describe('getArcLength', () => {

    it('should calculate geographical distance (coincide)', () => {
        const x = { latitude: 0, longitude: 0 };
        const y = { latitude: 0, longitude: 0 };
        const arc = distance.getArcLength(x, y);
        expect(arc).toBe(0);
    });

    it('should calculate geographical distance (different)', () => {
        const x = distance.degreeToRadian({ latitude: '53.339428', longitude: '-6.257664' });
        const y = distance.degreeToRadian({ latitude: '52.986375', longitude: '-6.043701' });
        const arc = distance.getArcLength(x, y);
        expect(arc).toBeCloseTo(41.7687, 3);
    });
});

describe('isPointNearFn', () => {

    const dublin = { latitude: '53.339428', longitude: '-6.257664' };
    
    it('should compare nearby points (below threshold)', () => {
        const generatedFn = distance.isPointNearFn(dublin, 100);
        const result = generatedFn({ latitude: '52.986375', longitude: '-6.043701' });
        expect(result).toBe(true);
    });

    it('should compare far points (above threshold)', () => {
        const generatedFn = distance.isPointNearFn(dublin, 40);
        const result = generatedFn({ latitude: '52.986375', longitude: '-6.043701' });
        expect(result).toBe(false);
    });
});

describe('degreeToRadian', () => {

    it('should convert 0 degree to 0 radians', () => {
        const point = distance.degreeToRadian({ latitude: '0', longitude: '0' });
        expect(point).toBeDefined();
        expect(point.latitude).toBeDefined();
        expect(point.latitude).toBeCloseTo(0, 5);
    });
});