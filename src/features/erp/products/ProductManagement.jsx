import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, ShieldAlert } from 'lucide-react';

const initialProducts = [
  { id: 1, name: 'Paracetamol 500mg', sku: 'MED-PC-500', category: 'Medical', brand: 'AstraMed', mrp: 5.50, wholesalePrice: 4.20, gstRate: 12, unit: 'box', stock: 120 },
  { id: 2, name: 'Amoxicillin 250mg', sku: 'MED-AMX-250', category: 'Medical', brand: 'Sandoz', mrp: 9.80, wholesalePrice: 7.80, gstRate: 12, unit: 'bottle', stock: 5 },
  { id: 3, name: 'Wireless Optical Mouse', sku: 'ELE-WM-04', category: 'Electronics', brand: 'Logitech', mrp: 19.99, wholesalePrice: 13.50, gstRate: 18, unit: 'piece', stock: 45 },
  { id: 4, name: 'LED Bulb 9W Premium', sku: 'HDW-LED-9W', category: 'Hardware', brand: 'Philips', mrp: 2.50, wholesalePrice: 1.60, gstRate: 18, unit: 'piece', stock: 0 },
  { id: 5, name: 'Organic Green Tea Bag', sku: 'SMK-GT-50', category: 'Supermarket', brand: 'Lipton', mrp: 4.99, wholesalePrice: 3.40, gstRate: 5, unit: 'pack', stock: 85 }
];

export default function ProductManagement() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const handleDelete = (id) => {
    if (window.confirm('Delete this product from catalog?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Product Catalog Directory</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search style={{ position: 'absolute', left: '10px', color: '#9ca3af' }} size={16} />
            <input 
              type="text" 
              placeholder="Search SKU, Brand..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: '8px 12px 8px 32px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', width: '200px', outline: 'none' }}
            />
          </div>
          <select 
            className="filter-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', backgroundColor: '#fff' }}
          >
            <option value="All">All Categories</option>
            <option value="Medical">Medical</option>
            <option value="Electronics">Electronics</option>
            <option value="Hardware">Hardware</option>
            <option value="Supermarket">Supermarket</option>
          </select>
          <button className="btn-primary" style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' }}>
            <Plus size={16} /> Add Product
          </button>
        </div>
      </div>

      <div className="dashboard-table-wrapper">
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f3f4f6' }}>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Product Details</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>SKU</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Category</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Tax Rate</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Wholesale Rate</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>MRP Price</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#6b7280' }}>
                      {p.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: '#1f2937' }}>{p.name}</div>
                      <div style={{ fontSize: '11px', color: '#9ca3af' }}>Brand: {p.brand} | per {p.unit}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '12px' }}>{p.sku}</td>
                <td style={{ padding: '12px' }}>{p.category}</td>
                <td style={{ padding: '12px' }}>{p.gstRate}% GST</td>
                <td style={{ padding: '12px', fontWeight: 600 }}>${p.wholesalePrice.toFixed(2)}</td>
                <td style={{ padding: '12px', fontWeight: 700, color: '#7c3aed' }}>${p.mrp.toFixed(2)}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                    <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#6b7280' }}><Edit size={14} /></button>
                    <button onClick={() => handleDelete(p.id)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="7" style={{ padding: '24px', textAlign: 'center', color: '#9ca3af' }}>No products found in catalog.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
