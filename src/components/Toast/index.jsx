const Toast = ({type = 'error', show = false }) => {
    return (
        <div className={`toast border-radius-5 ${type} ${show ? 'active' : ''}`}>
            Cannot save Flow
        </div>
    );
}

export default Toast;