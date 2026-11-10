import ProductCard from './ProductCard';

// Grid of product cards
export default function ProductGrid({ products, className = '' }) {
  return (
    <div className={`g3 ${className}`}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
