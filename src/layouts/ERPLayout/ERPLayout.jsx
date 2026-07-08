import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  ChevronDown, 
  ChevronRight, 
  Menu, 
  Search, 
  Bell, 
  History, 
  Plus, 
  X,
  LayoutDashboard,
  Calculator,
  Database,
  Wallet,
  Package,
  TrendingUp,
  ShieldCheck,
  ArrowLeftRight,
  Settings,
  LogOut,
  User,
  RefreshCw
} from 'lucide-react';
import './ERPLayout.css';

export default function ERPLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [user, setUser] = useState({
    name: 'Emily Lynch',
    email: 'admin@sarvo.com',
    role: 'Admin',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120'
  });

  // Load user session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('sarvo_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        // use default
      }
    }
  }, []);

  // Controls expanding/collapsing submenus
  const [expandedMenus, setExpandedMenus] = useState({
    basicInfo: true,
    accounting: false,
    stocks: false,
    sales: false
  });

  // Manage tabs state
  const [tabs, setTabs] = useState([
    { id: 'dashboard', name: 'Dashboard', path: '/dashboard' }
  ]);
  const [activeTabId, setActiveTabId] = useState('dashboard');

  const toggleSubmenu = (menu) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const handleTabClick = (tab) => {
    setActiveTabId(tab.id);
    navigate(tab.path);
  };

  const addTab = (name, path) => {
    const id = name.toLowerCase().replace(/\s+/g, '-');
    if (tabs.find(t => t.id === id)) {
      setActiveTabId(id);
      navigate(path);
      return;
    }
    const newTabs = [...tabs, { id, name, path }];
    setTabs(newTabs);
    setActiveTabId(id);
    navigate(path);
  };

  const closeTab = (e, tabId) => {
    e.stopPropagation();
    if (tabs.length === 1) return; // Don't close the last tab
    
    const newTabs = tabs.filter(t => t.id !== tabId);
    setTabs(newTabs);

    if (activeTabId === tabId) {
      const activeIndex = tabs.findIndex(t => t.id === tabId);
      const nextActiveTab = newTabs[activeIndex - 1] || newTabs[0];
      setActiveTabId(nextActiveTab.id);
      navigate(nextActiveTab.path);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('sarvo_token');
    localStorage.removeItem('sarvo_user');
    navigate('/auth/login');
  };

  return (
    <div className="erp-layout">
      {/* Sidebar Navigation */}
      <aside className={`erp-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-box">S</div>
            {!isCollapsed && <span className="brand-name">Sarvo ERP</span>}
          </div>
          <button 
            className="sidebar-toggle-btn" 
            onClick={() => setIsCollapsed(!isCollapsed)}
            title="Toggle Sidebar"
          >
            <Menu size={18} />
          </button>
        </div>

        {/* Sidebar Search */}
        {!isCollapsed && (
          <div className="sidebar-search-box">
            <div className="sidebar-search-wrapper">
              <Search className="sidebar-search-icon" size={16} />
              <input 
                type="text" 
                placeholder="Search tools..." 
                className="sidebar-search-input" 
              />
            </div>
          </div>
        )}

        {/* Sidebar Menu Items */}
        <nav className="sidebar-menu">
          <div 
            className={`menu-item ${location.pathname === '/dashboard' ? 'active' : ''}`}
            onClick={() => addTab('Dashboard', '/dashboard')}
          >
            <div className="menu-item-left">
              <LayoutDashboard className="menu-item-icon" size={18} />
              {!isCollapsed && <span>Dashboard</span>}
            </div>
          </div>

          {/* Accounting Accordion */}
          <div className="menu-item-wrapper">
            <div className="menu-item" onClick={() => toggleSubmenu('accounting')}>
              <div className="menu-item-left">
                <Calculator className="menu-item-icon" size={18} />
                {!isCollapsed && <span>Accounting</span>}
              </div>
              {!isCollapsed && (expandedMenus.accounting ? <ChevronDown size={14} /> : <ChevronRight size={14} />)}
            </div>
            {!isCollapsed && expandedMenus.accounting && (
              <div className="menu-submenu">
                <div 
                  className={`submenu-item ${activeTabId === 'general-ledger' ? 'active' : ''}`}
                  onClick={() => addTab('General Ledger', '/ledger')}
                  style={{ cursor: 'pointer' }}
                >
                  General Ledger
                </div>
                <div 
                  className={`submenu-item ${activeTabId === 'journal-entries' ? 'active' : ''}`}
                  onClick={() => addTab('Journal Entries', '/journal')}
                  style={{ cursor: 'pointer' }}
                >
                  Journal Entries
                </div>
                <div 
                  className={`submenu-item ${activeTabId === 'taxation-settings' ? 'active' : ''}`}
                  onClick={() => addTab('Taxation Settings', '/taxation')}
                  style={{ cursor: 'pointer' }}
                >
                  GST & Taxation
                </div>
              </div>
            )}
          </div>

          {/* Basic Information Accordion */}
          <div className="menu-item-wrapper">
            <div className="menu-item" onClick={() => toggleSubmenu('basicInfo')}>
              <div className="menu-item-left">
                <Database className="menu-item-icon" size={18} />
                {!isCollapsed && <span>Basic Information</span>}
              </div>
              {!isCollapsed && (expandedMenus.basicInfo ? <ChevronDown size={14} /> : <ChevronRight size={14} />)}
            </div>
            {!isCollapsed && expandedMenus.basicInfo && (
              <div className="menu-submenu">
                <div 
                  className={`submenu-item ${activeTabId === 'product-catalog' ? 'active' : ''}`}
                  onClick={() => addTab('Product Catalog', '/products')}
                  style={{ cursor: 'pointer' }}
                >
                  Product Catalog
                </div>
                <div 
                  className={`submenu-item ${activeTabId === 'customer-ledger' ? 'active' : ''}`}
                  onClick={() => addTab('Customer Ledger', '/customers')}
                  style={{ cursor: 'pointer' }}
                >
                  Customers Ledger
                </div>
                <div 
                  className={`submenu-item ${activeTabId === 'supplier-database' ? 'active' : ''}`}
                  onClick={() => addTab('Supplier Database', '/suppliers')}
                  style={{ cursor: 'pointer' }}
                >
                  Suppliers Database
                </div>
                <div 
                  className={`submenu-item ${activeTabId === 'users-access' ? 'active' : ''}`}
                  onClick={() => addTab('Users & Access', '/users')}
                  style={{ cursor: 'pointer' }}
                >
                  Users & Access
                </div>
              </div>
            )}
          </div>

          {/* Stocks / Inventory Accordion */}
          <div className="menu-item-wrapper">
            <div className="menu-item" onClick={() => toggleSubmenu('stocks')}>
              <div className="menu-item-left">
                <Package className="menu-item-icon" size={18} />
                {!isCollapsed && <span>Stocks</span>}
              </div>
              {!isCollapsed && (expandedMenus.stocks ? <ChevronDown size={14} /> : <ChevronRight size={14} />)}
            </div>
            {!isCollapsed && expandedMenus.stocks && (
              <div className="menu-submenu">
                <div 
                  className={`submenu-item ${activeTabId === 'inventory' ? 'active' : ''}`}
                  onClick={() => addTab('Inventory', '/inventory')}
                  style={{ cursor: 'pointer' }}
                >
                  Inventory Items
                </div>
                <div 
                  className={`submenu-item ${activeTabId === 'stock-transfers' ? 'active' : ''}`}
                  onClick={() => addTab('Stock Transfers', '/stock-transfer')}
                  style={{ cursor: 'pointer' }}
                >
                  Stock Transfers
                </div>
                <div 
                  className={`submenu-item ${activeTabId === 'warehouses' ? 'active' : ''}`}
                  onClick={() => addTab('Warehouses', '/warehouses')}
                  style={{ cursor: 'pointer' }}
                >
                  Warehouses
                </div>
                <div 
                  className={`submenu-item ${activeTabId === 'barcode-labels' ? 'active' : ''}`}
                  onClick={() => addTab('Barcode Labels', '/barcodes')}
                  style={{ cursor: 'pointer' }}
                >
                  Barcode Labels
                </div>
              </div>
            )}
          </div>

          {/* Sales Accordion */}
          <div className="menu-item-wrapper">
            <div className="menu-item" onClick={() => toggleSubmenu('sales')}>
              <div className="menu-item-left">
                <TrendingUp className="menu-item-icon" size={18} />
                {!isCollapsed && <span>Sales & Purchases</span>}
              </div>
              {!isCollapsed && (expandedMenus.sales ? <ChevronDown size={14} /> : <ChevronRight size={14} />)}
            </div>
            {!isCollapsed && expandedMenus.sales && (
              <div className="menu-submenu">
                <div 
                  className={`submenu-item ${activeTabId === 'pos-billing' ? 'active' : ''}`}
                  onClick={() => addTab('POS Billing', '/pos')}
                  style={{ cursor: 'pointer' }}
                >
                  POS Billing Terminal
                </div>
                <div 
                  className={`submenu-item ${activeTabId === 'sales-audit-logs' ? 'active' : ''}`}
                  onClick={() => addTab('Sales Audit Logs', '/sales')}
                  style={{ cursor: 'pointer' }}
                >
                  Sales Invoices
                </div>
                <div 
                  className={`submenu-item ${activeTabId === 'purchase-orders' ? 'active' : ''}`}
                  onClick={() => addTab('Purchase Orders', '/purchases')}
                  style={{ cursor: 'pointer' }}
                >
                  Purchase Orders
                </div>
              </div>
            )}
          </div>

          {/* Standalone navigation links */}
          <div 
            className={`menu-item ${activeTabId === 'employees' ? 'active' : ''}`}
            onClick={() => addTab('Employees', '/employees')}
          >
            <div className="menu-item-left">
              <ShieldCheck className="menu-item-icon" size={18} />
              {!isCollapsed && <span>Employee Payroll</span>}
            </div>
          </div>

          <div 
            className={`menu-item ${activeTabId === 'reports-analytics' ? 'active' : ''}`}
            onClick={() => addTab('Reports & Analytics', '/reports')}
          >
            <div className="menu-item-left">
              <ArrowLeftRight className="menu-item-icon" size={18} />
              {!isCollapsed && <span>Reports & Charts</span>}
            </div>
          </div>

          <div 
            className={`menu-item ${activeTabId === 'notifications-limits' ? 'active' : ''}`}
            onClick={() => addTab('Notifications Limits', '/notifications')}
          >
            <div className="menu-item-left">
              <Bell className="menu-item-icon" size={18} />
              {!isCollapsed && <span>Notifications Warning</span>}
            </div>
          </div>

          <div 
            className={`menu-item ${activeTabId === 'branches-directory' ? 'active' : ''}`}
            onClick={() => addTab('Branches Directory', '/branches')}
          >
            <div className="menu-item-left">
              <RefreshCw className="menu-item-icon" size={18} />
              {!isCollapsed && <span>Branches List</span>}
            </div>
          </div>

          <div 
            className={`menu-item ${activeTabId === 'settings-profile' ? 'active' : ''}`}
            onClick={() => addTab('Settings Profile', '/settings')}
          >
            <div className="menu-item-left">
              <Settings className="menu-item-icon" size={18} />
              {!isCollapsed && <span>General Settings</span>}
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Workspace Frame */}
      <main className="erp-main">
        {/* Header Dashboard Navigation */}
        <header className="erp-header">
          <div className="header-left">
            <select className="period-dropdown" defaultValue="2026 Period">
              <option value="2026 Period">2026 Period</option>
              <option value="2025 Period">2025 Period</option>
            </select>

            {/* Navigation Tab list */}
            <div className="header-tabs">
              {tabs.map(tab => (
                <div 
                  key={tab.id} 
                  className={`header-tab ${activeTabId === tab.id ? 'active' : ''}`}
                  onClick={() => handleTabClick(tab)}
                >
                  <span>{tab.name}</span>
                  {tabs.length > 1 && (
                    <button className="tab-close-btn" onClick={(e) => closeTab(e, tab.id)}>
                      <X size={12} />
                    </button>
                  )}
                </div>
              ))}
              <button className="add-tab-btn" onClick={() => addTab('New Tool', '/dashboard')}>
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="header-right">
            <div className="header-search-wrapper">
              <Search className="header-search-icon" size={14} />
              <input type="text" placeholder="Search..." className="header-search-input" />
            </div>

            <div className="header-actions">
              <button className="header-action-btn" title="View Logs History">
                <History size={16} />
              </button>
              <button className="header-action-btn" title="Notifications">
                <Bell size={16} />
                <span className="notification-badge"></span>
              </button>
            </div>

            {/* Profile Avatar & Dropdown Menu */}
            <div 
              className="user-profile" 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              style={{ position: 'relative' }}
            >
              <img 
                src={user.avatar} 
                alt="Profile" 
                className="avatar-img" 
              />
              {showProfileMenu && (
                <div style={{
                  position: 'absolute',
                  top: '40px',
                  right: '0',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                  padding: '16px',
                  width: '220px',
                  zIndex: 999,
                  textAlign: 'left'
                }} onClick={(e) => e.stopPropagation()}>
                  <div style={{ marginBottom: '12px', borderBottom: '1px solid #f3f4f6', paddingBottom: '8px' }}>
                    <div style={{ fontWeight: 700, color: '#1f2937', fontSize: '14px' }}>{user.name}</div>
                    <div style={{ color: '#6b7280', fontSize: '11px' }}>{user.email}</div>
                    <div style={{
                      display: 'inline-block',
                      backgroundColor: '#eff6ff',
                      color: '#1d4ed8',
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      marginTop: '6px'
                    }}>{user.role}</div>
                  </div>
                  <button 
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 10px',
                      border: 'none',
                      backgroundColor: 'transparent',
                      color: '#ef4444',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      borderRadius: '6px',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#fef2f2'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Outlet */}
        <div className="erp-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
