import React from 'react';

function Settings({ node, updateNodeText, onBack }) {
  return (
    <div className="settings-panel">
      <button onClick={onBack} className="back-button">←</button>
      <h3>Message Settings</h3>
      <label htmlFor="text-input">Text</label>
      <textarea
        id="text-input"
        rows="4"
        value={node.data.label}
        onChange={(e) => updateNodeText(node.id, e.target.value)}
      />
    </div>
  );
}

export default Settings;