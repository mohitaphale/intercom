import { readFileSync } from 'fs';
import { exit } from 'process';

function getFileRecords(filePath) {
    try {
        const content = readFileSync(filePath, { encoding: 'utf8' });
        const lines = content.split("\n");
        const records = lines.map(fromJsonToRecord);
        return records;
    }
    catch (err) {
        console.error(`[ERROR] Unable to read file at path [${filePath}]: ${err.message}`);
        exit(-1);
    }
}

function fromJsonToRecord(line, index) {
    try {
        const record = JSON.parse(line);
        return record;
    }
    catch (err) {
        console.error(`[ERROR] Couldnt parse record [index ${index}]: ${err.message}`);
        return null;
    }
}

export { getFileRecords, fromJsonToRecord };
