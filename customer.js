import { EOL } from 'os';

function parseCustomer(record) {
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
