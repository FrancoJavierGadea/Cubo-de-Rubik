import { useEffect, useRef, useState } from "react";

import { BoxGeometry } from "three";
import { generateUUID } from "three/src/math/MathUtils";
import Stickers from "./Stickers";

const geometry = new BoxGeometry(1, 1, 1);


export default function Cube({position = [0, 0, 0], onClick = () => {}, selectedCube = null, sides = []}){

    const cubeRef = useRef();

    const [hover, setHover] = useState(false);

    const [select, setSelect] = useState(false);

    const [id, setId] = useState( generateUUID() );

    useEffect(() => {

        if(selectedCube){

            setSelect(id === selectedCube.id);
        }
        else {
            
            setSelect(false);
        }

    }, [selectedCube]);


    const handlerHover = (e) => {

        e.stopPropagation();
        setHover(true)
    }

    const handlerOut = (e) => {

        e.stopPropagation();
        setHover(false);
    }

    const handlerClick = (e) => {

        e.stopPropagation();

        onClick({id, cube: cubeRef.current});
    }


    return (<group position={position} ref={cubeRef} scale={0.9}>

        <mesh geometry={geometry} onPointerOver={handlerHover} onPointerOut={handlerOut} onClick={handlerClick}>

            <meshBasicMaterial args={[{color: 0x000000}]} />

        </mesh>

        <lineSegments>

            <edgesGeometry args={[geometry]} />

            <Stickers all={false} sides={sides} />

            <lineBasicMaterial color={select ? '#b613e8' : hover ? '#a7a1a1' : '#000000'} />

        </lineSegments>

    </group>);
}   
