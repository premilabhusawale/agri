import LivePricesComponent from '../Components/LivePricesComponent';

const LivePrices = () => {
  return (
    <section id="prices" className="py-20 bg-gradient-to-b from-[#EBF1ED] to-gray-50">
      <div className="container mx-auto px-4">
        <LivePricesComponent 
          theme="green"
          showHeader={true}
        />
      </div>
    </section>
  );
};

export default LivePrices;
