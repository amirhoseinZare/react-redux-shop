import classes from "./Spinnser.module.scss"

function Spinner(props){
    const spinnerPartStyle = { backgroundColor:props.spinnerColor || '#000' }
    return (<div className={classes["loadingio-spinner-spinner-1pbw5j7hwri"]}>
                <div className={classes["ldio-sxcqhxvxw8c"]}>
                    <div style={spinnerPartStyle}></div>
                    <div style={spinnerPartStyle}></div>
                    <div style={spinnerPartStyle}></div>
                    <div style={spinnerPartStyle}></div>
                    <div style={spinnerPartStyle}></div>
                    <div style={spinnerPartStyle}></div>
                    <div style={spinnerPartStyle}></div>
                    <div style={spinnerPartStyle}></div>
                    <div style={spinnerPartStyle}></div>
                    <div style={spinnerPartStyle}></div>
                    <div style={spinnerPartStyle}></div>
                    <div style={spinnerPartStyle}></div>
                </div>
            </div>)
}

export {Spinner};
