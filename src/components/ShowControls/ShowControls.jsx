import styled from "styled-components";

const StyledDiv = styled.div`

    position: absolute;
    bottom: 0;
    right: 0;
    background-color: #171616a7;
    color: white;
    border-top-left-radius: 10px;
    box-shadow: 0px 0px 3px 0px #f7f1f1bf;
    user-select: none;
    
    span {
        display: inline-block;
        box-sizing: border-box;
        background-color: #000000;
        padding: 5px 10px;
        min-width: 40px;
        border-radius: 2px;
        text-align: center;
        color: #d7d6d6;
        box-shadow: 1px 1px 3px 0px #f7f1f1bf;
    }
`;


function ShowControls() {

    return (<StyledDiv className="p-3 pb-1">

        <h4 className="pb-2">Select a piece and rotate the cube</h4>

        <h5>
            <span>W</span> <span>S</span> : Rotate around X axis
        </h5>

        <h5>
            <span>A</span> <span>D</span> : Rotate around Y axis
        </h5>

        <h5>
            <span>Q</span> <span>E</span> : Rotate around Z axis
        </h5>

        <h5>
            <span>🡩</span> <span>🡫</span> <span>🡨</span> <span>🡪</span> : Rotate the cube
        </h5>

        <h5>
            <span>Space</span> : Scramble
        </h5>
    </StyledDiv>);
}

export default ShowControls;