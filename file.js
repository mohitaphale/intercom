const fs = require('fs');

function getFileRecords(filePath) {
    try {
        const content = fs.readFileSync(filePath, { encoding: 'utf8' });
        const lines = content.split("\n");
        const records = lines.map(fromJsonToRecord).filter(x => x);
        return records;
    }
    catch (err) {
        console.error(`[ERROR] Unable to read file at path [${filePath}]: ${err.message}`);
        return [];
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

module.exports = { getFileRecords, fromJsonToRecord };
