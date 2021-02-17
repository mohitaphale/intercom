function getArcLength(p1, p2) {

    const deltaLong = Math.abs(p1.longitude - p2.longitude);
    const meanRadius = 6371.009;
    
    const centralAngle = Math.acos((Math.sin(p1.latitude) * Math.sin(p2.latitude)) +
        (Math.cos(p1.latitude) * Math.cos(p2.latitude) * Math.cos(deltaLong)));

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

module.exports = { getArcLength, isPointNearFn, degreeToRadian };
