interface ButtonProps {
    icon?: string;
    label?: string;
    onClick?: () => void;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label = "Click me", onClick, disabled = false, icon = null }) => {
    return (
        <button onClick={onClick} disabled={disabled} className="flex items-center gap-2 px-8 py-2 bg-white text-primary text-sm border rounded disabled:opacity-50 font-semibold">
            {
                icon &&
                <img src={icon} alt={`${label} icon`} className="w-4 h-4" />
            }
            {label}
        </button>
    )
}

export default Button;