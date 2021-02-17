import { EOL } from 'os';

function parseCustomer(record) {

    if (!record) {
        return null;
    }

    const latitude = Number(record.latitude);
    if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90) {
        console.error(`[ERROR] Skipping record due to invalid latitude: ${JSON.stringify(record.latitude)}`);
        return null;
    }

    const longitude = Number(record.longitude);
    if (!Number.isFinite(longitude) || longitude < -180 || longitude > 180) {
        console.error(`[ERROR] Skipping record due to invalid longitude: ${JSON.stringify(record.longitude)}`);
        return null;
    }

    if (!Number.isInteger(record.user_id)) {
        console.error(`[ERROR] Skipping record due to invalid user_id: ${JSON.stringify(record.user_id)}`);
        return null;
    }

    if (typeof record.name !== 'string') {
        console.error(`[ERROR] Skipping record due to invalid name: ${JSON.stringify(record.name)}`);
        return null;
    }

    return record;
}

function formatCustomers(customers) {
    const formattedList = customers.map(c => `${c.name}, ${c.user_id}`);
    return formattedList.join(EOL);
}

function sortByUserId(c1, c2) {
    return Math.sign(c1.user_id - c2.user_id);
}

export { parseCustomer, formatCustomers, sortByUserId };
