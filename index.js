const fs = require('fs');
const os = require('os');

const DUBLIN_POINT = {
    latitude: '53.339428',
    longitude: '-6.257664'
};

const THRESHOLD = 100;

function getArcLength(p1, p2) {

    const deltaLong = Math.abs(p1.longitude - p2.longitude);
    const meanRadius = 6371.009;
    
    const centralAngle = Math.acos((Math.sin(p1.latitude) * Math.sin(p1.latitude)) +
        (Math.cos(p1.latitude) * Math.cos(p1.latitude) * Math.cos(deltaLong)));

    return centralAngle * meanRadius;
}

function isPointNearFn(origin, threshold) {
    const originRad = degreeToRadian(origin);
    return (point) => {
        const pointRad = degreeToRadian(point);
        const distance = getArcLength(pointRad, originRad);
        return distance <= threshold;
    };
}

function degreeToRadian(point) {
    const multiplier = Math.PI / 180;
    return {
        latitude: +point.latitude * multiplier,
        longitude: +point.longitude * multiplier
    };
}

function fromJsonToRecord(line) {
    try {
        const record = JSON.parse(line);
        return record;
    }
    catch (ex) {
        console.log('Couldnt parse record', ex.stack);
        process.exitCode = -1;
    }
}

function getCustomers() {
    const buffer = fs.readFileSync('./resources/customers.txt');
    const lines = buffer.toString().split("\n");
    const customers = lines.map(fromJsonToRecord);

    return customers;
}

function formatCustomers(customers) {
    const formattedList = customers.map(c => `${c.name}, ${c.user_id}`);
    return formattedList.join(os.EOL);
}

function sortByUserId(c1, c2) {
    return Math.sign(c1.user_id - c2.user_id);
}

const isNearDublin = isPointNearFn(DUBLIN_POINT, THRESHOLD);

const customers = getCustomers();

const customersNearDublin = customers.filter(isNearDublin);
const customersSorted = customersNearDublin.sort(sortByUserId);

console.log(formatCustomers(customersSorted));
