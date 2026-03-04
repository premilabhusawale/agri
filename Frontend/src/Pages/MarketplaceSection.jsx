import { useTranslation } from 'react-i18next';
import ProductsGrid from './ProductsGrid';
import { motion } from 'framer-motion';

const MarketplaceSection = () => {
  const { t } = useTranslation();

  return (
    <section id="marketplace" className="py-24 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#133928 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="container mx-auto px-6 relative z-10">
        <ProductsGrid
          showHeader={true}
          headerTitle={t('marketplace')}
          headerSubtitle={t('marketplaceSubtitle')}
        />
      </div>
    </section>
  );
};

export default MarketplaceSection;