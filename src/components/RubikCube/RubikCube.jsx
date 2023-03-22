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

    const cubesInSame = (coordinate = 'x', targetCube = selectedCube?.cube) => {

        return RubikCubeRef.current?.children.filter(cube => {

            const aux = Math.abs(cube.position[coordinate] - targetCube.position[coordinate]);

            return aux < 0.5; 
        });
    }

    const rotate = (cubes = [], axis) => {

        setRotating(true);

        const from = {angle: 0};
        const end = {angle: Math.PI / 2};

        const tween = new TWEEN.Tween(from).to(end, 500)
        .onStart((value) => {

            console.log('Rotating');
            value.prev = {
                angle: 0
            }
        })
        .onUpdate((value, elapsed) => {

            const {angle, prev} = value;

            cubes.forEach(cube => {

                cube.position.applyAxisAngle(axis, angle - prev.angle);
                cube.rotateOnWorldAxis(axis, angle - prev.angle);
            });

            value.prev.angle = angle;
        })
        .onComplete((value) => {

            setRotating(false);
            console.log('complete');
            value.prev.angle = 0;
        });

        tween.start();
    }

    const scramble = (moves = 10, time = 500) => {

        if(!RubikCubeRef.current) return;

        setRotating(true);

        const tween = new Array(moves).fill(null)
        .map((_, index) => {

            return (new TWEEN.Tween({angle: 0}).to({angle: Math.PI / 2}, time)
                .onStart((value) => {

                    const cubes = RubikCubeRef.current.children;

                    const randomCube = cubes[Math.floor(Math.random() * cubes.length )];

                    const randomAxis = ([
                        { cordinate: 'x', axis: new Vector3(1, 0, 0) },
                        { cordinate: 'y', axis: new Vector3(0, 1, 0) },
                        { cordinate: 'z', axis: new Vector3(0, 0, 1) },
                    ])[Math.floor(Math.random() * 3)];

                    value.layer = cubesInSame(randomAxis.cordinate, randomCube);
                    value.axis = randomAxis.axis;

                    console.log('Rotating');
                    value.prev = {angle: 0};
                })
                .onUpdate((value, elapsed) => {

                    const {angle, prev, layer, axis} = value;

                    layer.forEach(cube => {

                        cube.position.applyAxisAngle(axis, angle - prev.angle);
                        cube.rotateOnWorldAxis(axis, angle - prev.angle);
                    });

                    value.prev.angle = angle;
                })
                .onComplete((value) => {

                    //setRotating(false);
                    console.log('complete');
                    value.prev.angle = 0;
                })
            );
        })
        .reduce((acc, value, index, array) => {
  
            if(index === array.length - 1){

                value.onComplete(() => {

                    setRotating(false);
                    console.log('complete end');
                });

                acc.chain(value);
                
                return array[0];
            }

            acc.chain(value);
  
            return value;
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

            case keys.current[' ']:

                scramble(21, 300);
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