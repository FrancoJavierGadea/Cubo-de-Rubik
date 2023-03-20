import { useFrame } from "@react-three/fiber";
import TWEEN from "@tweenjs/tween.js";
import { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import { useKeyboard } from "../../hooks/useKeyboard";
import Cube from "./Cube";


function RubikCube({epsilon = 0.5}) {


    const RubikCubeRef = useRef(null);

    const [selectedCube, setSelectedCube] = useState(null);
    
    const [rotating, setRotating] = useState(false);

    const cubesInSame = (coordinate = 'x') => {

        return RubikCubeRef.current?.children.filter(cube => {

            const aux = Math.abs(cube.position[coordinate] - selectedCube.cube.position[coordinate]);

            return aux < 0.5; 
        });
    }

    const rotate = (cubes = [], axis) => {

        setRotating(true);

        const from = {angle: 0};
        const prev = {angle: 0};
        const end = {angle: Math.PI / 2};

        const tween = new TWEEN.Tween(from).to(end, 500)
        .onStart(() => {

            console.log('Rotating');
        })
        .onUpdate(({angle}, elapsed) => {

            cubes.forEach(cube => {

                cube.position.applyAxisAngle(axis, angle - prev.angle);
                cube.rotateOnWorldAxis(axis, angle - prev.angle);
            });

            prev.angle = angle;
        })
        .onComplete(() => {

            setRotating(false);
            console.log('complete');
        });

        tween.start();
    }

    const keys = useKeyboard();

    useFrame(() => {

        TWEEN.update();

        if(!selectedCube || rotating) return;

        switch(true){

            case keys.current['w'] || keys.current['W']:
     
                rotate(cubesInSame('x'), new Vector3(-1, 0, 0)); 
                break;
    
            case keys.current['s'] || keys.current['S']:

                rotate(cubesInSame('x'), new Vector3(1, 0, 0));
                break;
        
            case keys.current['a'] || keys.current['A']:

                rotate(cubesInSame('y'), new Vector3(0, -1, 0));
                break;
        
            case keys.current['d'] || keys.current['D']:
        
                rotate(cubesInSame('y'), new Vector3(0, 1, 0));
                break;
        
            case keys.current['q'] || keys.current['Q']:
        
                rotate(cubesInSame('z'), new Vector3(0, 0, 1));
                break;
        
            case keys.current['e'] || keys.current['E']:

                rotate(cubesInSame('z'), new Vector3(0, 0, -1));
                break;

            case keys.current['ArrowUp']:

                rotate(RubikCubeRef.current.children, new Vector3(-1, 0, 0));
                break;
                
            case keys.current['ArrowDown']:

                rotate(RubikCubeRef.current.children, new Vector3(1, 0, 0));
                break;
              
            case keys.current['ArrowLeft']:

                rotate(RubikCubeRef.current.children, new Vector3(0, -1, 0));
                break;
                
            case keys.current['ArrowRight']:

                rotate(RubikCubeRef.current.children, new Vector3(0, 1, 0));
                break;     
        }
    });
    
    const handlerClick = (cube) => {

        setSelectedCube(cube);
    }

    return (<group ref={RubikCubeRef} >

        {/* Front face */}
        <Cube onClick={handlerClick} selectedCube={selectedCube} position={[-1, 1, 1]} sides={['front', 'top', 'left']}/>
        <Cube onClick={handlerClick} selectedCube={selectedCube} position={[0, 1, 1]} sides={['front', 'top']} />
        <Cube onClick={handlerClick} selectedCube={selectedCube} position={[1, 1, 1]} sides={['front', 'top', 'right']} />
        <Cube onClick={handlerClick} selectedCube={selectedCube} position={[-1, 0, 1]} sides={['front', 'left']} />
        <Cube onClick={handlerClick} selectedCube={selectedCube} position={[0, 0, 1]} sides={['front']} />
        <Cube onClick={handlerClick} selectedCube={selectedCube} position={[1, 0, 1]} sides={['front', 'right']} />
        <Cube onClick={handlerClick} selectedCube={selectedCube} position={[-1, -1, 1]} sides={['front', 'bottom', 'left']} />
        <Cube onClick={handlerClick} selectedCube={selectedCube} position={[0, -1, 1]} sides={['front', 'bottom']} />
        <Cube onClick={handlerClick} selectedCube={selectedCube} position={[1, -1, 1]} sides={['front', 'bottom', 'right']} />
        
        {/* Middle face */}
        <Cube onClick={handlerClick} selectedCube={selectedCube} position={[-1, 1, 0]} sides={['top', 'left']}/>
        <Cube onClick={handlerClick} selectedCube={selectedCube} position={[0, 1, 0]} sides={['top']}/>
        <Cube onClick={handlerClick} selectedCube={selectedCube} position={[1, 1, 0]} sides={['top', 'right']}/>
        <Cube onClick={handlerClick} selectedCube={selectedCube} position={[-1, 0, 0]} sides={['left']}/>
        <Cube onClick={handlerClick} selectedCube={selectedCube} position={[1, 0, 0]} sides={['right']}/>
        <Cube onClick={handlerClick} selectedCube={selectedCube} position={[-1, -1, 0]} sides={['bottom', 'left']}/>
        <Cube onClick={handlerClick} selectedCube={selectedCube} position={[0, -1, 0]} sides={['bottom']}/>
        <Cube onClick={handlerClick} selectedCube={selectedCube} position={[1, -1, 0]} sides={['bottom', 'right']}/>

        {/* Back face */}
        <Cube onClick={handlerClick} selectedCube={selectedCube} position={[-1, 1, -1]} sides={['back', 'top', 'left']}/>
        <Cube onClick={handlerClick} selectedCube={selectedCube} position={[0, 1, -1]} sides={['back', 'top']}/>
        <Cube onClick={handlerClick} selectedCube={selectedCube} position={[1, 1, -1]} sides={['back', 'top', 'right']}/>
        <Cube onClick={handlerClick} selectedCube={selectedCube} position={[-1, 0, -1]} sides={['back', 'left']}/>
        <Cube onClick={handlerClick} selectedCube={selectedCube} position={[0, 0, -1]} sides={['back']}/>
        <Cube onClick={handlerClick} selectedCube={selectedCube} position={[1, 0, -1]} sides={['back', 'right']}/>
        <Cube onClick={handlerClick} selectedCube={selectedCube} position={[-1, -1, -1]} sides={['back', 'bottom', 'left']}/>
        <Cube onClick={handlerClick} selectedCube={selectedCube} position={[0, -1, -1]} sides={['back', 'bottom']}/>
        <Cube onClick={handlerClick} selectedCube={selectedCube} position={[1, -1, -1]} sides={['back', 'bottom', 'right']}/>
        
    </group>);
}

export default RubikCube;