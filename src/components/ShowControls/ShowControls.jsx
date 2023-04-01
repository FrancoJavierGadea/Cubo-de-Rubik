import styled from "styled-components";
import KeyboardKey from "./Key";

const StyledDiv = styled.div`

    position: absolute;
    bottom: 0;
    right: 0;
    background-color: #171616a7;
    color: white;
    border-top-left-radius: 10px;
    box-shadow: 0px 0px 3px 0px #f7f1f1bf;
    user-select: none;
    
    
`;


function ShowControls() {

    return (<StyledDiv className="p-3 pb-1">

        <h4 className="pb-2">Select a piece and rotate the cube</h4>

        <h5>
            <KeyboardKey keyChar={['W', 'w']}/>
            <KeyboardKey keyChar={['S', 's']}/> : Rotate around X axis
        </h5>

        <h5>
            <KeyboardKey keyChar={['A', 'a']}/>
            <KeyboardKey keyChar={['D', 'd']}/> : Rotate around Y axis
        </h5>

        <h5>
            <KeyboardKey keyChar={['Q', 'q']}/>
            <KeyboardKey keyChar={['E', 'e']}/> : Rotate around Z axis
        </h5>

        <h5>
            <KeyboardKey keyChar={['ArrowUp']} text="🡩"/>
            <KeyboardKey keyChar={['ArrowDown']} text="🡫"/>
            <KeyboardKey keyChar={['ArrowLeft']} text="🡨"/>
            <KeyboardKey keyChar={['ArrowRight']} text="🡪"/>
            : Rotate the cube
        </h5>

        <h5>
            <KeyboardKey keyChar={[' ']} text="Space"/> : Scramble
        </h5>
    </StyledDiv>);
}

export default ShowControls;