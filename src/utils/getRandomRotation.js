import { Vector3 } from "three";

//La Coordenada de la capa y la direccion posible en la que puede rotar
const rotations = [
    { cordinate: 'x', axis: new Vector3(1, 0, 0) },
    { cordinate: 'x', axis: new Vector3(-1, 0, 0) },
    { cordinate: 'y', axis: new Vector3(0, 1, 0) },
    { cordinate: 'y', axis: new Vector3(0, -1, 0) },
    { cordinate: 'z', axis: new Vector3(0, 0, 1) },
    { cordinate: 'z', axis: new Vector3(0, 0, -1) },
];

export function getRandomRotation(){

    return rotations[Math.floor(Math.random() * rotations.length)];
}