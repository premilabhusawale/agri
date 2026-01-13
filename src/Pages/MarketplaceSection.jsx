import ProductsGrid from './ProductsGrid';

const MarketplaceSection = () => {
  return (
    <section id="marketplace" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <ProductsGrid />
      </div>
    </section>
  );
};

export default MarketplaceSection;