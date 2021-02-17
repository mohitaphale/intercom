import { parseCustomer, formatCustomers, sortByUserId } from './customer.js';
import { getFileRecords } from './file.js';
import { isPointNearFn } from './distance.js';
import { DUBLIN_POINT, THRESHOLD, DEFAULT_FILEPATH } from './config.js';

const argumentCount = process.argv.length;
const filePath = argumentCount >= 3 ? process.argv[2] : DEFAULT_FILEPATH;

const customers = getFileRecords(filePath).map(parseCustomer);

const isNearDublin = isPointNearFn(DUBLIN_POINT, THRESHOLD);
const customersNearDublin = customers.filter(isNearDublin);

const customersSorted = customersNearDublin.sort(sortByUserId);

console.log(formatCustomers(customersSorted));
