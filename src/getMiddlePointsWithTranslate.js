
import { getDistance } from './ThreeJsCanvas';

function getTranslatedPoints(point1, point2, point3, distanceUnits){
    const incenter = getIncenter(point1, point2, point3);
    
    const normalVector = getNormalVector(point1, point2, point3);
    
    const getPointAlongLine = (translateLength) => {
        let translatedPoint;
        if(normalVector[0] !== 0) {
            translatedPoint = translateX(incenter, normalVector, translateLength);
        } else if(normalVector[1] !== 0) {
            translatedPoint = translateY(incenter, normalVector, translateLength);
        } else {
            translatedPoint = translateZ(incenter, normalVector, translateLength);
        }

        const tempVector = translatedPoint.map( (val, idx) => val - incenter[idx]);

        const mod = Math.sqrt(tempVector[0] ** 2 + tempVector[1] ** 2 + tempVector[2] ** 2);
        const coefficient = distanceUnits / mod;

        const answerVector = tempVector.map(val => val * coefficient);
        const answerPoint = answerVector.map((val, idx) => val + incenter[idx]);

        return answerPoint;
    }

    const leftPoint = getPointAlongLine(-1);
    const rightPoint = getPointAlongLine(1);

    return leftPoint[2] >= rightPoint[2] ? [leftPoint, rightPoint] : [rightPoint, leftPoint];
}

export function getIncenter(a, b, c){
    let ab = getDistance(a, b);
    let ac = getDistance(a, c);
    let bc = getDistance(b, c);

    let p = ab + ac + bc;

    let x = (a[0] * bc + b[0] * ac + c[0] * ab) / p;
    let y = (a[1] * bc + b[1] * ac + c[1] * ab) / p;
    let z = (a[2] * bc + b[2] * ac + c[2] * ab) / p;

    return [x, y, z];
}

export function getPerimeter(a, b, c) {
    return getDistance(a, b) + getDistance(b, c) + getDistance(a, c);
}
function getNormalVector(point1, point2, point3){
    let vec_p1p2 = [point2[0] - point1[0], point2[1] - point1[1], point2[2] - point1[2]];
    let vec_p1p3 = [point3[0] - point1[0], point3[1] - point1[1], point3[2] - point1[2]];

    return [
        vec_p1p2[1] * vec_p1p3[2] - vec_p1p2[2] * vec_p1p3[1],
        vec_p1p2[2] * vec_p1p3[0] - vec_p1p2[0] * vec_p1p3[2],
        vec_p1p2[0] * vec_p1p3[1] - vec_p1p2[1] * vec_p1p3[0]
    ]
}


function translateX(point, normalVector, distance){
    //compute result by the line equation
    let x = point[0] + distance;
    let y = ((x - point[0]) / normalVector[0]) * normalVector[1] + point[1];
    let z = ((x - point[0]) / normalVector[0]) * normalVector[2] + point[2];

    return [x, y, z];
}

function translateY(point, normalVector, distance){
    //compute result by the line equation
    let y = point[1] + distance;
    let x = ((y - point[1]) / normalVector[1]) * normalVector[0] + point[0];
    let z = ((y - point[1]) / normalVector[1]) * normalVector[2] + point[2];

    return [x, y, z];
}

function translateZ(point, normalVector, distance){
    //compute result by the line equation
    let z = point[2] + distance;
    let x = ((z - point[2]) / normalVector[2]) * normalVector[0] + point[0];
    let y = ((z - point[2]) / normalVector[2]) * normalVector[1] + point[1];

    return [x, y, z];
}

export default getTranslatedPoints;