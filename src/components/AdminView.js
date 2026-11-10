'use client';

import DataTable from './DataTable';
import PageShell from './PageShell';
import { useStore } from '@/context/StoreContext';
import { ADMIN_CUSTOMERS, ADMIN_ORDERS, ADMIN_STATS } from '@/data/site';
import { ALL_PRODUCTS } from '@/lib/products';

// Demo admin dashboard: stats, stock, recent orders, customers
export default function AdminView() {
  const { orders } = useStore();
  const recent = [...orders.filter((o) => o.fresh), ...ADMIN_ORDERS];

  return (
    <PageShell title="Admin dashboard">
      <div className="g4">
        {ADMIN_STATS.map(([label, value]) => (
          <div key={label} className="glass p-[22px]">
            <div className="mut">{label}</div>
            <div className="font-serif font-medium text-[34px]">{value}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-6 mt-6">
        <div className="glass flex-[1_1_420px] p-6 overflow-x-auto">
          <h3 className="text-[26px]">Products</h3>
          <DataTable columns={['Name', 'Price', 'Stock']} rows={ALL_PRODUCTS.map((p) => [p.name, `$${p.price}`, p.stock])} />
        </div>
        <div className="glass flex-[1_1_420px] p-6 overflow-x-auto">
          <h3 className="text-[26px]">Recent orders</h3>
          <DataTable columns={['Order', 'Customer', 'Total', 'Status']} rows={recent.map((o) => [o.id, o.who, `$${o.total}`, o.status])} />
          <h3 className="text-[26px] mt-[22px]">Customers</h3>
          <DataTable columns={['Name', 'Orders', 'Spend']} rows={ADMIN_CUSTOMERS} />
        </div>
      </div>
    </PageShell>
  );
}
