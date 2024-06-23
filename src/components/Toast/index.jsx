const Toast = ({ show, type }) => {
    const toastMsg = {
        "success": 'Flow saved successfully',
        "error": 'Cannot save Flow'
    }

    return (
        <div className={`toast border-radius-5 ${type} ${show ? 'active' : ''}`}>
            {toastMsg[type]}
        </div>
    );
}

export default Toast;