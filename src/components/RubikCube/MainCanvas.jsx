import { OrbitControls, Stars, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import styled from "styled-components";
import RubikCube from "./RubikCube";

const StyledRubikCube = styled.div`

    //border: 1px solid blue;
    //margin: 20px auto;
    background-color: #03032c;
    position: relative;
`;

function MainCanvas({width = 960, height = 540}) {

    const canvasConteinerRef = useRef();


    return (<StyledRubikCube className="RubikCube" style={{width, height}} ref={canvasConteinerRef}>

        <Canvas>

            <ambientLight intensity={0.5} />

            <RubikCube />

            <axesHelper args={[10]} /> 
            <axesHelper args={[-10]} />   

            <Stars />

            <OrbitControls />

        </Canvas>

        <Stats className="position-absolute" parent={canvasConteinerRef} />

    </StyledRubikCube>);
}

export default MainCanvas;