import './Button.css'

const Button = (props) => {
    return (
        <button 
            {...props}
            className={`${props?.className} confirm-btn`} 
            id={props?.id}
        >
            {props.children}
        </button>
    );
};

export default Button;