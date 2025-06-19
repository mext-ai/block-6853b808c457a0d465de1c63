import React, { useState, useEffect } from 'react';

interface BlockProps {
  title?: string;
  description?: string;
  theme?: 'light' | 'dark';
}

const Block: React.FC<BlockProps> = ({ 
  title = "Sample Block", 
  description = "This is a placeholder block with fake content",
  theme = 'light'
}) => {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([
    { id: 1, name: "Fake Item 1", description: "Lorem ipsum dolor sit amet" },
    { id: 2, name: "Fake Item 2", description: "Consectetur adipiscing elit" },
    { id: 3, name: "Fake Item 3", description: "Sed do eiusmod tempor incididunt" }
  ]);

  // Send completion event on first load
  useEffect(() => {
    window.postMessage({ 
      type: 'BLOCK_COMPLETION', 
      blockId: '6853b808c457a0d465de1c63', 
      completed: true 
    }, '*');
    window.parent.postMessage({ 
      type: 'BLOCK_COMPLETION', 
      blockId: '6853b808c457a0d465de1c63', 
      completed: true 
    }, '*');
  }, []);

  const handleAddItem = () => {
    const newItem = {
      id: items.length + 1,
      name: `Fake Item ${items.length + 1}`,
      description: "Newly added fake content"
    };
    setItems([...items, newItem]);
  };

  const containerStyle: React.CSSProperties = {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: theme === 'dark' ? '#2d2d2d' : '#f5f5f5',
    color: theme === 'dark' ? '#ffffff' : '#333333',
    minHeight: '400px',
    borderRadius: '8px'
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: theme === 'dark' ? '#404040' : '#ffffff',
    padding: '15px',
    margin: '10px 0',
    borderRadius: '6px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    border: theme === 'dark' ? '1px solid #555' : '1px solid #ddd'
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    margin: '5px'
  };

  const headerStyle: React.CSSProperties = {
    borderBottom: theme === 'dark' ? '2px solid #555' : '2px solid #ddd',
    paddingBottom: '10px',
    marginBottom: '20px'
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>{title}</h1>
        <p style={{ margin: '0', fontSize: '16px', opacity: 0.8 }}>{description}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Interactive Counter</h2>
        <p>Current count: <strong>{count}</strong></p>
        <button 
          style={buttonStyle} 
          onClick={() => setCount(count + 1)}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
        >
          Increment
        </button>
        <button 
          style={{...buttonStyle, backgroundColor: '#dc3545'}} 
          onClick={() => setCount(0)}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c82333'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc3545'}
        >
          Reset
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Fake Content List</h2>
        <button 
          style={{...buttonStyle, backgroundColor: '#28a745'}} 
          onClick={handleAddItem}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#218838'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
        >
          Add Fake Item
        </button>
        
        <div style={{ marginTop: '15px' }}>
          {items.map(item => (
            <div key={item.id} style={cardStyle}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>{item.name}</h3>
              <p style={{ margin: '0', fontSize: '14px', opacity: 0.8 }}>{item.description}</p>
              <small style={{ opacity: 0.6 }}>ID: {item.id}</small>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: theme === 'dark' ? '#1a1a1a' : '#e9ecef', borderRadius: '4px' }}>
        <h3 style={{ fontSize: '16px', margin: '0 0 10px 0' }}>Fake Statistics</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#007bff' }}>42</div>
            <div style={{ fontSize: '12px', opacity: 0.7 }}>Fake Metric</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#28a745' }}>87%</div>
            <div style={{ fontSize: '12px', opacity: 0.7 }}>Success Rate</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffc107' }}>{items.length}</div>
            <div style={{ fontSize: '12px', opacity: 0.7 }}>Total Items</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center', opacity: 0.6, fontSize: '12px' }}>
        🎭 This is placeholder content - Edit src/block.tsx to customize!
      </div>
    </div>
  );
};

export default Block;