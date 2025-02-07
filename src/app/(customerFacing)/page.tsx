import db from '@/db/db';
import { Product } from '@prisma/client';

function getMostPopularProducts() {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { orders: { _count: 'desc' } },
    take: 6,
  });
}

function getNewestProducts() {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: 'desc' },
    take: 6,
  });
}

export default function HomePage() {
  return (
    <main className='space-y-12'>
      <ProductGridSection
        title='Most Popular'
        productsFetcher={getMostPopularProducts}
      />
      <ProductGridSection title='Newest' productsFetcher={getNewestProducts} />
    </main>
  );
}

type ProductGridSectionProps = {
  title: string;
  productsFetcher: () => Promise<Product[]>; //a function that returns a promise
};

function ProductGridSection({
  productsFetcher,
  title,
}: ProductGridSectionProps) {
  return (
    <div className='space-y-4'>
      <div className='flex gap-4'>
        <h2>{title}</h2>
      </div>
    </div>
  );
}
