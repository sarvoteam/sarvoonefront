import React, { useState } from 'react';
import { Search, Plus, User, FileSpreadsheet } from 'lucide-react';

const initialCustomers = [
  { id: 1, name: 'Alexander Medvedev', email: 'alex.med@gmail.com', phone: '(415) 882-9930', gstin: '27AAAAA1111A1Z1', creditLimit: 5000, balance: 1250, loyaltyPoints: 450 },
  { id: 2, name: 'Marques Brownley', email: 'mkbhd@gmail.com', phone: '(972) 330-4488', gstin: '27BBBBB2222B2Z2', creditLimit: 10000, balance: 0, loyaltyPoints: 120 },
  { id: 3, name: 'Anastasia Golovko', email: 'anastasia@outlook.com', phone: '(202) 555-0143', gstin: '', creditLimit: 2000, balance: 0, loyaltyPoints: 320 },
  { id: 4, name: 'Faizur Rehman', email: 'faizur@yahoo.com', phone: '(616) 396-8484', gstin: '27CCCCC3333C3Z3', creditLimit: 7500, balance: 5400, loyaltyPoints: 890 }
];

export default function CustomerManagement() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState('');

  const filtered = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Customer Ledger master</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search style={{ position: 'absolute', left: '10px', color: '#9ca3af' }} size={16} />
            <input 
              type="text" 
              placeholder="Search customers..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: '8px 12px 8px 32px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', width: '220px', outline: 'none' }}
            />
          </div>
          <button className="btn-primary" style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' }}>
            <Plus size={16} /> Add Customer
          </button>
        </div>
      </div>

      <div className="dashboard-table-wrapper">
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f3f4f6' }}>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Customer Name</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Phone</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>GSTIN Details</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Credit Limit</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Outstanding Balance</th>
              <th style={{ padding: '12px', color: '#6b7280', fontWeight: 600 }}>Loyalty Points</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#f3e8ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: '#1f2937' }}>{c.name}</div>
                      <div style={{ fontSize: '11px', color: '#9ca3af' }}>{c.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '12px' }}>{c.phone}</td>
                <td style={{ padding: '12px', fontFamily: 'monospace' }}>{c.gstin || 'Unregistered'}</td>
                <td style={{ padding: '12px', fontWeight: 600 }}>${c.creditLimit.toLocaleString()}</td>
                <td style={{ padding: '12px', fontWeight: 700, color: c.balance > 0 ? '#ef4444' : '#10b981' }}>
                  ${c.balance.toLocaleString()}
                </td>
                <td style={{ padding: '12px', fontWeight: 600 }}>🌟 {c.loyaltyPoints} pts</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
