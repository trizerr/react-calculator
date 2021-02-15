import './Field.scss';

const Field = (props) => {
    return (
        <div className='field'>
            <div className='field-main'>
                <span>
                       {props.field}
                </span>

            </div>
            <div className='field-additional'>
                <span>
                       {props.result}
                </span>

            </div>

        </div>
    );
}

export default Field;