import { train } from '@tensorflow/tfjs-core';
import { useEffect } from 'react';
import { getDistance } from './ThreeJsCanvas';

const point1 = [4, 10, 7];
const point2 = [-2, 1, 5];
const point3 = [1, -6, 2];

function Test(){
    useEffect(()=>{
        main();
    })

    return (
        <></>
    )
}

function main(){
    const incenter = getIncenter(point1, point2, point3);

    const normalVec = getNormalVector(point1, point2, point3);

    console.log(incenter, normalVec)

}

function getIncenter(a, b, c){
    let ab = getDistance(a, b);
    let ac = getDistance(a, c);
    let bc = getDistance(b, c);

    let p = ab + ac + bc;

    let x = (a[0] * bc + b[0] * ac + c[0] * ab) / p;
    let y = (a[1] * bc + b[2] * ac + c[1] * ab) / p;
    let z = (a[2] * bc + b[2] * ac + c[2] * ab) / p;

    return [x, y, z];
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
export default Test;