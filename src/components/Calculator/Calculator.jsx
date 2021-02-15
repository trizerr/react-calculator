import './Calculator.scss';
import Button from "../Button/Button";
import Field from "../Field/Field";

const Calculator = (props) =>{

    return(
        <div className='calculator'>
            <div className='calculator-field'>
                <Field {...props}/>
            </div>
            <div className='calculator-buttons'>
                <Button value='AC' type='functional' {...props}/>
                <Button value='C' type='functional' {...props}/>
                <Button value='%' type='operation' {...props}/>
                <Button value='/' type='operation' {...props}/>
                <Button value='7' type='number' {...props}/>
                <Button value='8' type='number' {...props}/>
                <Button value='9' type='number' {...props}/>
                <Button value='*' type='operation' {...props}/>
                <Button value='4' type='number' {...props}/>
                <Button value='5' type='number' {...props}/>
                <Button value='6' type='number' {...props}/>
                <Button value='-' type='operation' {...props}/>
                <Button value='1' type='number' {...props}/>
                <Button value='2' type='number' {...props}/>
                <Button value='3' type='number' {...props}/>
                <Button value='+' type='operation' {...props}/>
                <Button value='.'  type='number' {...props}/>
                <Button value='0' type='number' {...props}/>
                <div className='equal-button'>
                    <Button value='=' type='functional' color='orange' {...props}/>
                </div>





            </div>
        </div>
    );
}

export default Calculator;