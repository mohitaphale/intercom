const customer = require('./customer');
const file = require('./file');
const distance = require('./distance');
const config = require('./config');

const argumentCount = process.argv.length;
const filePath = argumentCount >= 3 ? process.argv[2] : config.DEFAULT_FILEPATH;

const customers = file.getFileRecords(filePath).map(customer.parse).filter(x => x);

const isNearDublin = distance.isPointNearFn(config.DUBLIN_POINT, config.THRESHOLD);
const customersNearDublin = customers.filter(isNearDublin);

const customersSorted = customersNearDublin.sort(customer.sortByUserId);

console.log(customer.format(customersSorted));
