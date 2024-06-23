const SettingsPanel = ({ value, closeSettingsPanel, onEdit }) => {
    return (
        <div className="settings-panel flex flex-col">
            <div className="panel-header">
                <div className="back-btn" onClick={closeSettingsPanel}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="#666"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
                </div>
                <span>Message</span>
            </div>
            <div className="panel-body flex flex-col">
                <label htmlFor="message-content">Text</label>
                <textarea name="message-content" rows={4} id="" value={value} onChange={onEdit} />
            </div>
        </div>
    );
}

export default SettingsPanel;