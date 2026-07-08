import React, { useState } from 'react';
import { Search, Plus, Building2 } from 'lucide-react';

const initialSuppliers = [
  { id: 1, name: 'Astra Distributors', contact: 'Roy Astra', phone: '(212) 349-2930', email: 'orders@astradist.com', gstin: '27DDDDD4444D4Z4', dues: 2800 },
  { id: 2, name: 'MedLife Wholesalers', contact: 'Dr. Sarah Lee', phone: '(312) 880-9922', email: 'sales@medlife.com', gstin: '27EEEEE5555E5Z5', dues: 0 },
  { id: 3, name: 'Apex Electronics Corp', contact: 'Tony Stark', phone: '(206) 555-8910', email: 'info@apexelectronics.com', gstin: '27FFFFF6666F6Z6', dues: 1540 },
  { id: 4, name: 'EcoPack Packaging Ltd', contact: 'Rachel Green', phone: '(914) 330-0081', email: 'billing@ecopack.co.in', gstin: '', dues: 0 }
];

export default function SupplierManagement() {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [search, setSearch] = useState('');

  const filtered = suppliers.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.contact.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Supplier Master Database</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search style={{ position: 'absolute', left: '10px', color: '#9ca3af' }} size={16} />
            <input 
              type="text" 
              placeholder="Search suppliers..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: '8px 12px 8px 32px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', width: '220px', outline: 'none' }}
            />
          </div>
          <button className="btn-primary" style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' }}>
            <Plus size={16} /> Add Supplier
          </button>
        </div>
      </div>

      <div className="dashboard-table-wrapper">
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f3f4f6' }}>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Supplier Entity</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Contact Person</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Phone / Email</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>GSTIN Details</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Outstanding Dues</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#ecfeff', color: '#0891b2', display: 'flex', alignItems: 'center', justify: 'center', fontWeight: 'bold' }}>
                      <Building2 size={16} />
                    </div>
                    <span style={{ fontWeight: 600, color: '#1f2937' }}>{s.name}</span>
                  </div>
                </td>
                <td style={{ padding: '12px' }}>{s.contact}</td>
                <td style={{ padding: '12px' }}>
                  <div>{s.phone}</div>
                  <div style={{ fontSize: '11px', color: '#9ca3af' }}>{s.email}</div>
                </td>
                <td style={{ padding: '12px', fontFamily: 'monospace' }}>{s.gstin || 'Unregistered'}</td>
                <td style={{ padding: '12px', fontWeight: 700, color: s.dues > 0 ? '#ef4444' : '#10b981' }}>
                  ${s.dues.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
