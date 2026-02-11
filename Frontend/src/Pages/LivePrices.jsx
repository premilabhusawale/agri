import { useLocation } from 'react-router-dom';
import LivePricesComponent from '../Components/LivePricesComponent';

const LivePrices = () => {

  const location = useLocation();

  const isLivePricesPage = location.pathname === '/LivePrices';
  return (
    <section id="prices" className="py-20 bg-gradient-to- from-[#EBF1ED] to-gray-50">
      <div className={`${isLivePricesPage ? 'px-9 w-full' : ''}`}>
        <LivePricesComponent 
          theme="green"
          showHeader={true}
        />
      </div>
    </section>
  );
};

export default LivePrices;
