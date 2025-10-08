import '@xyflow/react/dist/style.css';
import './index.css';
import NavBar from './components/NavBar';
import FlowPanel from './components/FlowPanel';
import SideBar from './components/SideBar';

const App: React.FC = () => {
    return (
        <div className='flex flex-col h-full'>
            <NavBar />
            <div className="flex flex-auto">
                <FlowPanel />
                <SideBar />
            </div>
        </div>
    )
}

export default App
