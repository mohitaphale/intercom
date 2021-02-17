import { readFileSync } from 'fs';

function getFileRecords(filePath) {
    const buffer = readFileSync(filePath);
    const lines = buffer.toString().split("\n");
    const records = lines.map(fromJsonToRecord);
    return records;
}

function fromJsonToRecord(line) {
    try {
        const record = JSON.parse(line);
        return record;
    }
    catch (ex) {
        console.error('Couldnt parse record', ex.stack);
        process.exitCode = -1;
    }
}

export { getFileRecords, fromJsonToRecord };
