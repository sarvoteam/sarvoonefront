import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  X, 
  Edit, 
  Trash2, 
  ChevronRight, 
  FileText,
  AlertCircle,
  TrendingUp,
  Barcode
} from 'lucide-react';
import StockStatusBadge from '../components/StockStatusBadge';
import InventoryForm from '../components/InventoryForm';
import './InventoryList.css';

const initialProducts = [
  { id: 1, name: 'Paracetamol 500mg', sku: 'MED-PC-500', category: 'Medical', stock: 120, reorderLevel: 20, unit: 'box', purchasePrice: 4.00, sellingPrice: 5.50, description: 'Standard painkiller and fever reducer tablets.' },
  { id: 2, name: 'Amoxicillin 250mg', sku: 'MED-AMX-250', category: 'Medical', stock: 5, reorderLevel: 15, unit: 'bottle', purchasePrice: 7.50, sellingPrice: 9.80, description: 'Antibiotic syrup for bacterial infections.' },
  { id: 3, name: 'Wireless Optical Mouse', sku: 'ELE-WM-04', category: 'Electronics', stock: 45, reorderLevel: 10, unit: 'piece', purchasePrice: 12.00, sellingPrice: 19.99, description: '2.4Ghz ergonomic wireless mouse.' },
  { id: 4, name: 'LED Bulb 9W Premium', sku: 'HDW-LED-9W', category: 'Hardware', stock: 0, reorderLevel: 15, unit: 'piece', purchasePrice: 1.20, sellingPrice: 2.50, description: 'Energy saving bright daylight LED light.' },
  { id: 5, name: 'Organic Green Tea Bag', sku: 'SMK-GT-50', category: 'Supermarket', stock: 85, reorderLevel: 25, unit: 'pack', purchasePrice: 3.10, sellingPrice: 4.99, description: 'Natural green tea pack containing 50 bags.' }
];

export default function InventoryList() {
  const [products, setProducts] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // Modal controllers
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleRowClick = (product) => {
    setSelectedProduct(product);
  };

  const handleFormSubmit = (productData) => {
    if (editingProduct) {
      // Edit mode
      const updatedList = products.map(p => p.id === productData.id ? { ...p, ...productData } : p);
      setProducts(updatedList);
      if (selectedProduct?.id === productData.id) {
        setSelectedProduct({ ...selectedProduct, ...productData });
      }
    } else {
      // Add mode
      setProducts([...products, productData]);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const openEditModal = (e, product) => {
    e.stopPropagation();
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = (e, productId) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this item from inventory?')) {
      const filtered = products.filter(p => p.id !== productId);
      setProducts(filtered);
      if (selectedProduct?.id === productId) {
        setSelectedProduct(null);
      }
    }
  };

  const adjustStock = (productId, amount) => {
    const updated = products.map(p => {
      if (p.id === productId) {
        const nextStock = Math.max(0, p.stock + amount);
        const updatedItem = { ...p, stock: nextStock };
        if (selectedProduct?.id === productId) {
          setSelectedProduct(updatedItem);
        }
        return updatedItem;
      }
      return p;
    });
    setProducts(updated);
  };

  // Filtering
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="inventory-container">
      {/* Table Main Panel */}
      <div className="inventory-main-content">
        <div className="inventory-actions-bar">
          <div className="actions-left">
            <div className="search-input-wrapper">
              <Search className="search-icon" size={16} />
              <input 
                type="text" 
                placeholder="Search SKU or Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select 
              className="filter-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Medical">Medical</option>
              <option value="Electronics">Electronics</option>
              <option value="Hardware">Hardware</option>
              <option value="Supermarket">Supermarket</option>
            </select>
          </div>
          
          <button className="btn-primary" onClick={openAddModal}>
            <Plus size={16} />
            <span>Add Stock Item</span>
          </button>
        </div>

        {/* Data Table */}
        <div className="inventory-table-wrapper">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Stock Quantity</th>
                <th>Status</th>
                <th>Selling Price</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(p => (
                <tr 
                  key={p.id} 
                  onClick={() => handleRowClick(p)}
                  className={selectedProduct?.id === p.id ? 'selected' : ''}
                >
                  <td>
                    <div className="product-cell">
                      <div className="product-avatar">
                        {p.name.charAt(0)}
                      </div>
                      <div>
                        <div className="product-name-txt">{p.name}</div>
                        <div className="product-unit-txt">per {p.unit}</div>
                      </div>
                    </div>
                  </td>
                  <td>{p.sku}</td>
                  <td>{p.category}</td>
                  <td style={{ fontWeight: 700 }}>{p.stock} {p.unit}s</td>
                  <td>
                    <StockStatusBadge stock={p.stock} reorderLevel={p.reorderLevel} />
                  </td>
                  <td style={{ fontWeight: 600 }}>${p.sellingPrice.toFixed(2)}</td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button 
                        className="drawer-close-btn" 
                        onClick={(e) => openEditModal(e, p)}
                        title="Edit Item"
                      >
                        <Edit size={14} />
                      </button>
                      <button 
                        className="drawer-close-btn" 
                        onClick={(e) => handleDelete(e, p.id)}
                        style={{ color: '#ef4444' }}
                        title="Delete Item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '24px', color: '#6b7280' }}>
                    No stock products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Item Drawer Panel */}
      {selectedProduct && (
        <div className="inventory-detail-drawer">
          <div className="drawer-header">
            <h3 className="drawer-title">Product Details</h3>
            <button className="drawer-close-btn" onClick={() => setSelectedProduct(null)}>
              <X size={16} />
            </button>
          </div>

          <div className="drawer-profile-card">
            <div className="drawer-avatar">
              {selectedProduct.name.charAt(0)}
            </div>
            <h4 className="drawer-product-title">{selectedProduct.name}</h4>
            <span className="drawer-product-sku">{selectedProduct.sku}</span>
          </div>

          {/* Quick Stock Adjustments */}
          <div style={{ marginBottom: '24px' }}>
            <div className="detail-section-title">Stock Adjustments</div>
            <div className="drawer-quick-actions">
              <button className="btn-secondary" onClick={() => adjustStock(selectedProduct.id, 10)}>
                <Plus size={14} style={{ color: '#10b981' }} />
                <span>Add 10</span>
              </button>
              <button className="btn-secondary" onClick={() => adjustStock(selectedProduct.id, -10)}>
                <span>Deduct 10</span>
              </button>
            </div>
          </div>

          {/* Detailed Info */}
          <div>
            <div className="detail-section-title">Financials & Logistics</div>
            <div className="detail-info-grid">
              <div className="detail-info-row">
                <span className="info-label">Category</span>
                <span className="info-value">{selectedProduct.category}</span>
              </div>
              <div className="detail-info-row">
                <span className="info-label">Current Stock</span>
                <span className="info-value" style={{ color: '#7c3aed', fontWeight: 800 }}>
                  {selectedProduct.stock} {selectedProduct.unit}s
                </span>
              </div>
              <div className="detail-info-row">
                <span className="info-label">Reorder Warning</span>
                <span className="info-value">{selectedProduct.reorderLevel} {selectedProduct.unit}s</span>
              </div>
              <div className="detail-info-row">
                <span className="info-label">Purchase Price</span>
                <span className="info-value">${selectedProduct.purchasePrice.toFixed(2)}</span>
              </div>
              <div className="detail-info-row">
                <span className="info-label">Selling Price</span>
                <span className="info-value">${selectedProduct.sellingPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Barcode & Identifiers */}
          <div>
            <div className="detail-section-title">Barcode Generation</div>
            <div className="barcode-preview-box">
              <div className="barcode-lines">
                <div className="barcode-line" style={{ width: '4px' }}></div>
                <div className="barcode-line" style={{ width: '2px' }}></div>
                <div className="barcode-line" style={{ width: '6px' }}></div>
                <div className="barcode-line" style={{ width: '1px' }}></div>
                <div className="barcode-line" style={{ width: '3px' }}></div>
                <div className="barcode-line" style={{ width: '1px' }}></div>
                <div className="barcode-line" style={{ width: '5px' }}></div>
                <div className="barcode-line" style={{ width: '2px' }}></div>
              </div>
              <div style={{ fontSize: '11px', fontFamily: 'monospace', fontWeight: 600, color: '#374151' }}>
                {selectedProduct.sku}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      <InventoryForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingProduct}
      />
    </div>
  );
}
