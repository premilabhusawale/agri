import LivePricesComponent from '../Components/LivePricesComponent'

const LivePricesSection = () => {
  return (
    <section id="prices" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <LivePricesComponent 
          theme="orange"
          showHeader={true}
        />
      </div>
    </section>
  );
};

export default LivePricesSection;