import './CrytoItem.css';

const CryptoItem = ({ icon, title, description }) => {
    return (
      <div className="crypto-item">
        <div className="crypto-icon">{icon}</div>
        <div className="crypto-details">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    );
  };

  
export default CryptoItem;