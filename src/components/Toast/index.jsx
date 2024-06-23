const Toast = ({type = 'error', show = false }) => {
    return (
        <div className={`toast ${type} ${show ? 'active' : ''}`}>
            Cannot save Flow
        </div>
    );
}

export default Toast;