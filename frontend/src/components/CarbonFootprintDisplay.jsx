import { useCarbonFootprint } from 'react-carbon-footprint';

const CarbonFootprintDisplay = () => {
  const [gCO2, bytesTransferred] = useCarbonFootprint();
  return (
    <div style={{
      position: 'fixed', bottom: 10, right: 10,
      background: 'rgba(255,255,255,0.9)', padding: '15px',
      borderRadius: '8px', zIndex: 1000,
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      border: '1px solid #e2e8f0',
      maxWidth: '250px'
    }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#16a34a' }}>🌱 Carbon Footprint</h3>
      <p style={{ margin: '0 0 5px 0', fontSize: '13px' }}><strong>Bytes:</strong> {bytesTransferred} bytes</p>
      <p style={{ margin: '0 0 5px 0', fontSize: '13px' }}><strong>Emissions:</strong> {gCO2 ? gCO2.toFixed(4) : "0.0000"} g CO₂</p>
      <p style={{ margin: '0', fontSize: '11px', color: '#64748b' }}>
        (Estimates based on network data transfer during this session)
      </p>
    </div>
  );
}

export default CarbonFootprintDisplay;
