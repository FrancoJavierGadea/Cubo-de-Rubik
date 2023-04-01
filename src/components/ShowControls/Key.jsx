import { memo, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const StyledSpan = styled.span`
    
    display: inline-block;
    box-sizing: border-box;
    background-color: #000000;
    padding: 5px 10px;
    min-width: 40px;
    border-radius: 2px;
    text-align: center;
    color: #d7d6d6;
    box-shadow: 1px 1px 3px 0px #f7f1f1bf;
    margin: 1px 3px;
`;

function KeyboardKey({keyChar = ['W', 'w'], text}) {

    const spanRef = useRef();

    useEffect(() => {

        const handlerKeyDown = ({key}) => {

            if(keyChar.includes(key)){

                spanRef.current.style.boxShadow = '-1px -1px 3px 0px #f7f1f1bf';
            };    
        }

        const handlerKeyUp = ({key}) => {

            if(keyChar.includes(key)){

                spanRef.current.style.boxShadow = '';
            };   
        }

        document.addEventListener('keydown', handlerKeyDown);
        document.addEventListener('keyup', handlerKeyUp);

        return () => {

            document.removeEventListener('keydown', handlerKeyDown);
            document.removeEventListener('keyup', handlerKeyUp);
        }

    }, []);


    const handlerMouseDown = ({button}) => {

        if(button === 0){

            document.dispatchEvent(new KeyboardEvent('keydown',{key: keyChar[0]}));
        }
    }
    
    const handlerMouseUp = ({button}) => {

        if(button === 0){

            document.dispatchEvent(new KeyboardEvent('keyup',{key: keyChar[0]}));
        }
    } 



    return (<StyledSpan onMouseDown={handlerMouseDown} onMouseUp={handlerMouseUp} ref={spanRef}>
        {text || keyChar[0]}
    </StyledSpan>);
}

export default KeyboardKey;