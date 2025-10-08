import Button from "../Button"

const NavBar: React.FC = () => {
    return (
        <div className="flex justify-end px-16 py-3 border-b border-gray-300 bg-neutral-100">
            <Button 
                label="Save Changes"
            />
        </div>
    )
}

export default NavBar;