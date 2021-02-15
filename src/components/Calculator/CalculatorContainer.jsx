import Calculator from "./Calculator";
import {connect} from "react-redux";
import {buttonPressed} from "../../redux/buttonsReducer";



const CalculatorContainer = (props) =>{
    return(
        <Calculator {...props}/>
    );
}
let mapStateToProps = (state) =>{
    return{
        field:state.buttons.field,
        isOperationAllowed:state.buttons.isOperationAllowed,
        result:state.buttons.result,
        isDotAllowed: state.buttons.isDotAllowed,
        isNumberAllowed: state.buttons.isNumberAllowed
    }
}

export default connect(mapStateToProps, {buttonPressed})(CalculatorContainer);