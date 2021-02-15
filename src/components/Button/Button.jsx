import './Button.scss';

const Button = (props) =>{
    let pressed = () =>{

        props.buttonPressed(props.value, props.type);
    }
    return(
            <button className='button' onClick={pressed}
                    disabled={((!props.isOperationAllowed && props.type==='operation' )
                        || (props.value==='.' && !props.isDotAllowed)
                        || ((props.type==='number' || props.value==='%') && !props.isNumberAllowed)
                    )}>
                {props.value}
            </button>
    );
}

export default Button;