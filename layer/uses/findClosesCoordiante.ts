export function findClosestCoordinate(arrCoord: Locality[], nowCoord: {latitude: number, longitude: number}): Locality {
    // Функция для вычисления расстояния между двумя координатами
    function getDistance(coord1: any, coord2: any) {
        const R = 6371; // Радиус Земли в километрах
        const dLat = (coord2.latitude - coord1.latitude) * Math.PI / 180;
        const dLon = (coord2.longitude - coord1.longitude) * Math.PI / 180;
        const lat1 = coord1.latitude * Math.PI / 180;
        const lat2 = coord2.latitude * Math.PI / 180;

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    let closestCoord = arrCoord[0];
    let minDistance = Infinity;

    for (const coord of arrCoord) {
        const distance = getDistance(coord, nowCoord);
        if (distance < minDistance) {
            minDistance = distance;
            closestCoord = coord;
        }
    }

    return closestCoord;
}