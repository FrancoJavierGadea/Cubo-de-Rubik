
export default function Stickers({scale = 0.9, size = 1, distance = 0.001, all = true, sides = []}){

    const position = (size / 2) + distance;

    return(<>

        {
            (all || sides.includes('top')) && <mesh scale={scale} position={[0, position, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[size, size]} />
                <meshBasicMaterial color={'#ffffff'} />
            </mesh>
        }

        {
            (all || sides.includes('bottom')) && <mesh scale={scale} position={[0, -position, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <planeGeometry args={[size, size]} />
                <meshBasicMaterial color={'#ffd600'} />
            </mesh>
        }

        {
            (all || sides.includes('front')) && <mesh scale={scale} position={[0, 0, position]} rotation={[0, 0, 0]}>
                <planeGeometry args={[size, size]} />
                <meshBasicMaterial color={'#0044af'} />
            </mesh>
        }
    
    
        {
            (all || sides.includes('back')) && <mesh scale={scale} position={[0, 0, -position]} rotation={[Math.PI, 0, 0]}>
                <planeGeometry args={[size, size]} />
                <meshBasicMaterial color={'#009c46'} />
            </mesh>
        }

        {
            (all || sides.includes('right')) && <mesh scale={scale} position={[position, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                <planeGeometry args={[size, size]} />
                <meshBasicMaterial color={'#b80a31'} />
            </mesh>
        }

        {

            (all || sides.includes('left')) && <mesh scale={scale} position={[-position, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
                <planeGeometry args={[size, size]} />
                <meshBasicMaterial color={'#ff5700'} />
            </mesh>
        }
    
    </>);
}