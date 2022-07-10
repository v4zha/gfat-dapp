import { CreateElement, CreateProp } from "../../Types/types";
import CreateDep from "./CreateDep";
import CreateProj from "./CreateProj";
import CreateOff from "./CreateOff";

function Create (props:CreateProp):JSX.Element{
    switch(props.create){
        case CreateElement.Department:
            return (<CreateDep/>);
        case CreateElement.Officer:
            return (<CreateOff/>)
        case CreateElement.Project:
            return (<CreateProj/>)
        case CreateElement.Transaction:
          return(<></>)
    }
}
export default Create;



