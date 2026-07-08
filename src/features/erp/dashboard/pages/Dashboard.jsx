import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Percent, 
  Wallet, 
  AlertTriangle, 
  PackageMinus,
  CalendarCheck
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  BarChart, 
  Bar 
} from 'recharts';
import './Dashboard.css';

// Chart mock data
const salesData = [
  { month: 'Jan', Sales: 31000, Purchases: 22000, Profit: 9000 },
  { month: 'Feb', Sales: 38000, Purchases: 24000, Profit: 14000 },
  { month: 'Mar', Sales: 42000, Purchases: 25000, Profit: 17000 },
  { month: 'Apr', Sales: 40000, Purchases: 23000, Profit: 17000 },
  { month: 'May', Sales: 48000, Purchases: 27000, Profit: 21000 },
  { month: 'Jun', Sales: 45231, Purchases: 28120, Profit: 17111 },
];

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      {/* KPI Cards Grid */}
      <section className="kpi-grid">
        {/* Sales Card */}
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Total Sales</span>
            <div className="kpi-icon-wrapper bg-purple">
              <DollarSign size={20} />
            </div>
          </div>
          <span className="kpi-value">$45,231.00</span>
          <div className="kpi-footer trend-up">
            <TrendingUp size={14} />
            <span>+12.5% vs last month</span>
          </div>
        </div>

        {/* Purchase Card */}
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Purchases</span>
            <div className="kpi-icon-wrapper bg-cyan">
              <ShoppingCart size={20} />
            </div>
          </div>
          <span className="kpi-value">$28,120.00</span>
          <div className="kpi-footer trend-down">
            <TrendingDown size={14} />
            <span>-4.2% vs last month</span>
          </div>
        </div>

        {/* Profit Card */}
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Net Profit</span>
            <div className="kpi-icon-wrapper bg-green">
              <Percent size={20} />
            </div>
          </div>
          <span className="kpi-value">$17,111.00</span>
          <div className="kpi-footer trend-up">
            <TrendingUp size={14} />
            <span>+8.1% vs last month</span>
          </div>
        </div>

        {/* Expenses Card */}
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Expenses</span>
            <div className="kpi-icon-wrapper bg-red">
              <Wallet size={20} />
            </div>
          </div>
          <span className="kpi-value">$6,340.00</span>
          <div className="kpi-footer trend-up">
            <TrendingUp size={14} />
            <span>+1.5% vs last month</span>
          </div>
        </div>

        {/* Low Stock Alert Card */}
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Low Stock Alerts</span>
            <div className="kpi-icon-wrapper bg-amber">
              <PackageMinus size={20} />
            </div>
          </div>
          <span className="kpi-value">4 Items</span>
          <div className="kpi-footer trend-neutral">
            <span>Reorder thresholds met</span>
          </div>
        </div>

        {/* Expiring Products Alert Card */}
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Expiring Soon</span>
            <div className="kpi-icon-wrapper bg-rose">
              <CalendarCheck size={20} />
            </div>
          </div>
          <span className="kpi-value">2 Items</span>
          <div className="kpi-footer trend-neutral">
            <span>Expiring within 30 days</span>
          </div>
        </div>
      </section>

      {/* Charts Panels */}
      <section className="charts-section">
        {/* Sales & Purchases Line Graph */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Financial Growth Performance</h3>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPurchases" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0891b2" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#0891b2" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={11} tickLine={false} />
                <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} />
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                <Area type="monotone" dataKey="Sales" stroke="#7c3aed" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" name="Sales ($)" />
                <Area type="monotone" dataKey="Purchases" stroke="#0891b2" strokeWidth={2} fillOpacity={1} fill="url(#colorPurchases)" name="Purchases ($)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Warning and Alerts Side panel */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Immediate Operations Alerts</h3>
          </div>
          <div className="alerts-list">
            <div className="alert-item danger">
              <div className="alert-info">
                <AlertTriangle size={18} />
                <span>Paracetamol 500mg: 2 units left</span>
              </div>
              <span className="alert-action">Order</span>
            </div>

            <div className="alert-item danger">
              <div className="alert-info">
                <AlertTriangle size={18} />
                <span>Amoxicillin Syrup: Out of stock</span>
              </div>
              <span className="alert-action">Order</span>
            </div>

            <div className="alert-item warning">
              <div className="alert-info">
                <AlertTriangle size={18} />
                <span>Aspirin 81mg expiring on Feb 15</span>
              </div>
              <span className="alert-action">Details</span>
            </div>

            <div className="alert-item warning">
              <div className="alert-info">
                <AlertTriangle size={18} />
                <span>Atorvastatin expiring in 25 days</span>
              </div>
              <span className="alert-action">Details</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Grid for Lists */}
      <section className="data-tables-section">
        {/* Top Selling Products */}
        <div className="table-card">
          <h3 className="table-title">Top Selling Products</h3>
          <div className="dashboard-table-wrapper">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Category</th>
                  <th>Units Sold</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Paracetamol 500mg</td>
                  <td>MED-PC-500</td>
                  <td>Medical</td>
                  <td>1,420</td>
                  <td>$7,100.00</td>
                </tr>
                <tr>
                  <td>Amoxicillin 250mg</td>
                  <td>MED-AMX-250</td>
                  <td>Medical</td>
                  <td>850</td>
                  <td>$6,800.00</td>
                </tr>
                <tr>
                  <td>Wireless Optical Mouse</td>
                  <td>ELE-WM-04</td>
                  <td>Electronics</td>
                  <td>120</td>
                  <td>$2,400.00</td>
                </tr>
                <tr>
                  <td>LED Bulb 9W Premium</td>
                  <td>HDW-LED-9W</td>
                  <td>Hardware</td>
                  <td>320</td>
                  <td>$1,600.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="table-card">
          <h3 className="table-title">Recent Ledger Transactions</h3>
          <div className="dashboard-table-wrapper">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Entity</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>TXN-2026-009</td>
                  <td>Emily Lynch</td>
                  <td>Sale</td>
                  <td>$1,250.00</td>
                  <td><span className="status-badge paid">Paid</span></td>
                </tr>
                <tr>
                  <td>TXN-2026-008</td>
                  <td>Astra Distributers</td>
                  <td>Purchase</td>
                  <td>$5,400.00</td>
                  <td><span className="status-badge pending">Pending</span></td>
                </tr>
                <tr>
                  <td>TXN-2026-007</td>
                  <td>Alexander Medvedev</td>
                  <td>Sale</td>
                  <td>$890.00</td>
                  <td><span className="status-badge paid">Paid</span></td>
                </tr>
                <tr>
                  <td>TXN-2026-006</td>
                  <td>MedLife Wholesalers</td>
                  <td>Purchase</td>
                  <td>$2,800.00</td>
                  <td><span className="status-badge paid">Paid</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
