// NavBar: Top navigation bar with Save button
import Button from "../Button"

interface NavBarProps {
    onSave?: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onSave }) => {
    return (
        <div className="flex justify-end px-16 py-3 border-b border-gray-300 bg-neutral-100">
            {/* Save button triggers flow save */}
            <Button 
                label="Save Changes"
                onClick={onSave}
            />
        </div>
    )
}

export default NavBar;