import { useEffect, useRef } from "react"


export function useKeyboard(){

    const keys = useRef([]);

    useEffect(() => {
         
        const handlerKeyDown = ({key}) => {

            if(keys.current){

                keys.current[key] = true;
            };    
        }

        const handlerKeyUp = ({key}) => {

            if(keys.current){

               delete keys.current[key];
            };
        }

        document.addEventListener('keydown', handlerKeyDown);
        document.addEventListener('keyup', handlerKeyUp);

        return () => {

            document.removeEventListener('keydown', handlerKeyDown);
            document.removeEventListener('keyup', handlerKeyUp);
        }

    }, []);

    return keys;
}