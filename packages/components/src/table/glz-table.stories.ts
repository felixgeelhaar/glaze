import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './glz-table.js';
import type { TableColumn } from './glz-table.js';

const meta: Meta = {
  title: 'Components/Table',
  component: 'glz-table',
  parameters: {
    docs: {
      description: {
        component: 'Comprehensive data table with sorting, filtering, selection, and responsive design'
      }
    }
  },
  argTypes: {
    columns: {
      control: 'object',
      description: 'Table column configuration'
    },
    data: {
      control: 'object',
      description: 'Table data array'
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Table size'
    },
    variant: {
      control: 'radio',
      options: ['default', 'glass', 'striped'],
      description: 'Visual variant'
    },
    searchable: {
      control: 'boolean',
      description: 'Enable search functionality'
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Search input placeholder'
    },
    selectable: {
      control: 'boolean',
      description: 'Enable row selection'
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state'
    },
    emptyMessage: {
      control: 'text',
      description: 'Message when no data'
    },
    responsive: {
      control: 'boolean',
      description: 'Enable responsive mode'
    },
    sort: {
      control: 'object',
      description: 'Current sort state'
    }
  }
};

export default meta;
type Story = StoryObj;

// Sample data
const sampleColumns: TableColumn[] = [
  { key: 'id', label: 'ID', width: '80px', sortable: true },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'status', label: 'Status', width: '120px', align: 'center' }
];

const sampleData = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Carol Williams', email: 'carol@example.com', role: 'Editor', status: 'Inactive' },
  { id: 4, name: 'David Brown', email: 'david@example.com', role: 'User', status: 'Active' },
  { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Active' },
  { id: 6, name: 'Frank Miller', email: 'frank@example.com', role: 'Editor', status: 'Active' },
  { id: 7, name: 'Grace Wilson', email: 'grace@example.com', role: 'User', status: 'Inactive' },
  { id: 8, name: 'Henry Moore', email: 'henry@example.com', role: 'User', status: 'Active' }
];

export const Default: Story = {
  render: () => html`
    <glz-table
      .columns=${sampleColumns}
      .data=${sampleData}
      @glz-table-sort=${(e: CustomEvent) => console.log('Sort:', e.detail)}
    ></glz-table>
  `
};

export const WithSearch: Story = {
  render: () => html`
    <glz-table
      .columns=${sampleColumns}
      .data=${sampleData}
      searchable
      searchPlaceholder="Search users..."
      @glz-table-search=${(e: CustomEvent) => console.log('Search:', e.detail)}
    ></glz-table>
  `
};

export const WithSelection: Story = {
  render: () => html`
    <glz-table
      .columns=${sampleColumns}
      .data=${sampleData}
      selectable
      @glz-table-select=${(e: CustomEvent) => console.log('Selection:', e.detail)}
    ></glz-table>
  `
};

export const FullFeatures: Story = {
  render: () => html`
    <glz-table
      .columns=${sampleColumns}
      .data=${sampleData}
      searchable
      selectable
      searchPlaceholder="Search users..."
      @glz-table-sort=${(e: CustomEvent) => console.log('Sort:', e.detail)}
      @glz-table-search=${(e: CustomEvent) => console.log('Search:', e.detail)}
      @glz-table-select=${(e: CustomEvent) => console.log('Selection:', e.detail)}
    ></glz-table>
  `
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4>Small</h4>
        <glz-table
          size="small"
          .columns=${sampleColumns}
          .data=${sampleData.slice(0, 3)}
        ></glz-table>
      </div>
      
      <div>
        <h4>Medium</h4>
        <glz-table
          size="medium"
          .columns=${sampleColumns}
          .data=${sampleData.slice(0, 3)}
        ></glz-table>
      </div>
      
      <div>
        <h4>Large</h4>
        <glz-table
          size="large"
          .columns=${sampleColumns}
          .data=${sampleData.slice(0, 3)}
        ></glz-table>
      </div>
    </div>
  `
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4>Default</h4>
        <glz-table
          .columns=${sampleColumns}
          .data=${sampleData.slice(0, 4)}
        ></glz-table>
      </div>
      
      <div>
        <h4>Striped</h4>
        <glz-table
          variant="striped"
          .columns=${sampleColumns}
          .data=${sampleData.slice(0, 4)}
        ></glz-table>
      </div>
      
      <div style="padding: 1.5rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: var(--radius-md);">
        <h4 style="color: white; margin-bottom: 1rem;">Glass</h4>
        <glz-table
          variant="glass"
          .columns=${sampleColumns}
          .data=${sampleData.slice(0, 4)}
        ></glz-table>
      </div>
    </div>
  `
};

export const CustomRenderers: Story = {
  render: () => {
    const columnsWithRenderers: TableColumn[] = [
      { 
        key: 'id', 
        label: 'ID', 
        width: '80px',
        render: (value) => html`<strong>#${value}</strong>`
      },
      { key: 'name', label: 'Name', sortable: true },
      { key: 'email', label: 'Email', sortable: true },
      { 
        key: 'role', 
        label: 'Role',
        render: (value) => {
          const colors: Record<string, string> = {
            Admin: 'var(--color-accent-base)',
            Editor: 'var(--color-primary-base)',
            User: 'var(--color-bg-on)'
          };
          return html`
            <span style="
              padding: 0.25rem 0.5rem;
              background: ${colors[value as string]}22;
              color: ${colors[value as string]};
              border-radius: var(--radius-sm);
              font-size: 0.75rem;
              font-weight: 600;
            ">${value}</span>
          `;
        }
      },
      { 
        key: 'status', 
        label: 'Status',
        align: 'center',
        width: '120px',
        render: (value) => {
          const isActive = value === 'Active';
          return html`
            <span style="
              display: inline-flex;
              align-items: center;
              gap: 0.25rem;
              color: ${isActive ? 'green' : 'gray'};
            ">
              <span style="
                width: 8px;
                height: 8px;
                background: currentColor;
                border-radius: 50%;
              "></span>
              ${value}
            </span>
          `;
        }
      }
    ];

    return html`
      <glz-table
        .columns=${columnsWithRenderers}
        .data=${sampleData}
        searchable
      ></glz-table>
    `;
  }
};

export const LoadingState: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <glz-table
        .columns=${sampleColumns}
        .data=${sampleData}
        loading
      ></glz-table>
    </div>
  `
};

export const EmptyState: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4>Default Empty Message</h4>
        <glz-table
          .columns=${sampleColumns}
          .data=${[]}
        ></glz-table>
      </div>
      
      <div>
        <h4>Custom Empty Message</h4>
        <glz-table
          .columns=${sampleColumns}
          .data=${[]}
          emptyMessage="No users found. Try adjusting your search criteria."
          searchable
        ></glz-table>
      </div>
    </div>
  `
};

export const SortingDemo: Story = {
  render: () => {
    const handleSort = (e: CustomEvent) => {
      const table = e.target as any;
      const { sort } = e.detail;
      console.log('Sorting by:', sort);
      
      // In a real app, you'd handle sorting here
      table.sort = sort;
    };

    return html`
      <div>
        <h4>Click column headers to sort</h4>
        <glz-table
          .columns=${sampleColumns}
          .data=${sampleData}
          @glz-table-sort=${handleSort}
        ></glz-table>
      </div>
    `;
  }
};

export const LargeDataset: Story = {
  render: () => {
    const manyColumns: TableColumn[] = [
      { key: 'id', label: 'ID', width: '60px', sortable: true },
      { key: 'firstName', label: 'First Name', sortable: true },
      { key: 'lastName', label: 'Last Name', sortable: true },
      { key: 'email', label: 'Email', sortable: true },
      { key: 'department', label: 'Department', sortable: true },
      { key: 'position', label: 'Position' },
      { key: 'salary', label: 'Salary', align: 'right', sortable: true },
      { key: 'startDate', label: 'Start Date', sortable: true },
      { key: 'status', label: 'Status', align: 'center' }
    ];

    const manyRows = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      firstName: `First${i + 1}`,
      lastName: `Last${i + 1}`,
      email: `user${i + 1}@example.com`,
      department: ['Engineering', 'Sales', 'Marketing', 'HR'][i % 4],
      position: ['Manager', 'Developer', 'Designer', 'Analyst'][i % 4],
      salary: `$${(50000 + i * 1000).toLocaleString()}`,
      startDate: `2024-0${(i % 9) + 1}-${String((i % 28) + 1).padStart(2, '0')}`,
      status: i % 3 === 0 ? 'Inactive' : 'Active'
    }));

    return html`
      <div>
        <h4>Large Dataset (50 rows, 9 columns)</h4>
        <glz-table
          .columns=${manyColumns}
          .data=${manyRows}
          searchable
          selectable
          size="small"
        ></glz-table>
      </div>
    `;
  }
};

export const ResponsiveTable: Story = {
  render: () => html`
    <div style="max-width: 600px; border: 2px dashed var(--color-glass-border); padding: 1rem; border-radius: var(--radius-md);">
      <p style="text-align: center; margin-bottom: 1rem; color: var(--color-bg-on); opacity: 0.7;">
        Resize window to see responsive behavior
      </p>
      <glz-table
        .columns=${sampleColumns}
        .data=${sampleData}
        responsive
        searchable
      ></glz-table>
    </div>
  `
};

export const InteractiveDemo: Story = {
  render: () => {
    let currentData = [...sampleData];
    let selectedRows: number[] = [];
    
    const handleSearch = (e: CustomEvent) => {
      const { searchTerm } = e.detail;
      const statusElement = document.querySelector('#search-status');
      if (statusElement) {
        statusElement.textContent = searchTerm 
          ? `Searching for: "${searchTerm}"` 
          : 'No active search';
      }
    };
    
    const handleSelect = (e: CustomEvent) => {
      selectedRows = e.detail.selectedIndices;
      const statusElement = document.querySelector('#selection-status');
      if (statusElement) {
        statusElement.textContent = `Selected ${selectedRows.length} row(s)`;
      }
    };
    
    const handleSort = (e: CustomEvent) => {
      const { sort } = e.detail;
      const statusElement = document.querySelector('#sort-status');
      if (statusElement) {
        statusElement.textContent = `Sorted by: ${sort.column} (${sort.direction})`;
      }
    };
    
    return html`
      <div>
        <div style="margin-bottom: 1rem; padding: 1rem; background: var(--color-surface-base); border-radius: var(--radius-md);">
          <h4 style="margin-bottom: 0.5rem;">Interactive Table Demo</h4>
          <div style="display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.875rem; color: var(--color-bg-on); opacity: 0.7;">
            <div id="search-status">No active search</div>
            <div id="selection-status">Selected 0 row(s)</div>
            <div id="sort-status">No sorting applied</div>
          </div>
        </div>
        
        <glz-table
          .columns=${sampleColumns}
          .data=${currentData}
          searchable
          selectable
          @glz-table-search=${handleSearch}
          @glz-table-select=${handleSelect}
          @glz-table-sort=${handleSort}
        ></glz-table>
      </div>
    `;
  }
};

export const ProductTable: Story = {
  render: () => {
    const productColumns: TableColumn[] = [
      { 
        key: 'image', 
        label: '',
        width: '60px',
        render: () => html`
          <div style="
            width: 40px;
            height: 40px;
            background: var(--color-surface-base);
            border-radius: var(--radius-sm);
          "></div>
        `
      },
      { key: 'name', label: 'Product', sortable: true },
      { key: 'category', label: 'Category', sortable: true },
      { 
        key: 'price', 
        label: 'Price', 
        align: 'right',
        sortable: true,
        render: (value) => html`<strong>$${value}</strong>`
      },
      { 
        key: 'stock', 
        label: 'Stock',
        align: 'center',
        sortable: true,
        render: (value) => {
          const level = value > 50 ? 'high' : value > 20 ? 'medium' : 'low';
          const colors = {
            high: 'green',
            medium: 'orange',
            low: 'red'
          };
          return html`
            <span style="color: ${colors[level]};">
              ${value} units
            </span>
          `;
        }
      },
      { 
        key: 'actions', 
        label: 'Actions',
        align: 'center',
        width: '100px',
        render: () => html`
          <button style="
            padding: 0.25rem 0.75rem;
            background: var(--color-primary-base);
            color: var(--color-primary-on);
            border: none;
            border-radius: var(--radius-sm);
            cursor: pointer;
            font-size: 0.75rem;
          ">Edit</button>
        `
      }
    ];

    const productData = [
      { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 1299, stock: 45 },
      { id: 2, name: 'Wireless Mouse', category: 'Accessories', price: 29, stock: 150 },
      { id: 3, name: 'USB-C Hub', category: 'Accessories', price: 59, stock: 75 },
      { id: 4, name: 'Monitor 4K', category: 'Electronics', price: 599, stock: 12 },
      { id: 5, name: 'Keyboard Mechanical', category: 'Accessories', price: 149, stock: 8 },
      { id: 6, name: 'Webcam HD', category: 'Electronics', price: 79, stock: 65 }
    ];

    return html`
      <div>
        <h3 style="margin-bottom: 1rem;">Product Inventory</h3>
        <glz-table
          .columns=${productColumns}
          .data=${productData}
          searchable
          searchPlaceholder="Search products..."
          variant="striped"
        ></glz-table>
      </div>
    `;
  }
};

export const TransactionTable: Story = {
  render: () => {
    const transactionColumns: TableColumn[] = [
      { 
        key: 'id', 
        label: 'Transaction',
        width: '120px',
        render: (value) => html`<code>#${value}</code>`
      },
      { key: 'date', label: 'Date', sortable: true },
      { key: 'description', label: 'Description' },
      { 
        key: 'amount', 
        label: 'Amount',
        align: 'right',
        sortable: true,
        render: (value) => {
          const isPositive = value > 0;
          return html`
            <span style="
              color: ${isPositive ? 'green' : 'red'};
              font-weight: 600;
            ">
              ${isPositive ? '+' : ''}$${Math.abs(value).toFixed(2)}
            </span>
          `;
        }
      },
      { 
        key: 'status', 
        label: 'Status',
        align: 'center',
        render: (value) => {
          const colors: Record<string, string> = {
            completed: 'green',
            pending: 'orange',
            failed: 'red'
          };
          return html`
            <span style="
              padding: 0.25rem 0.5rem;
              background: ${colors[value as string]}22;
              color: ${colors[value as string]};
              border-radius: var(--radius-pill);
              font-size: 0.75rem;
              font-weight: 600;
              text-transform: uppercase;
            ">${value}</span>
          `;
        }
      }
    ];

    const transactionData = [
      { id: 'TXN001', date: '2024-01-15', description: 'Payment from Client A', amount: 2500.00, status: 'completed' },
      { id: 'TXN002', date: '2024-01-14', description: 'Software License', amount: -99.99, status: 'completed' },
      { id: 'TXN003', date: '2024-01-14', description: 'Refund - Order #123', amount: 45.50, status: 'pending' },
      { id: 'TXN004', date: '2024-01-13', description: 'Monthly Subscription', amount: -29.99, status: 'completed' },
      { id: 'TXN005', date: '2024-01-13', description: 'Payment from Client B', amount: 1750.00, status: 'completed' },
      { id: 'TXN006', date: '2024-01-12', description: 'Failed Transfer', amount: -500.00, status: 'failed' }
    ];

    return html`
      <div style="padding: 1.5rem; background: var(--color-bg-base); border-radius: var(--radius-lg);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
          <h3 style="margin: 0;">Recent Transactions</h3>
          <div style="
            padding: 0.5rem 1rem;
            background: var(--color-surface-base);
            border-radius: var(--radius-sm);
            font-size: 0.875rem;
          ">
            Balance: <strong style="color: green;">+$3,570.52</strong>
          </div>
        </div>
        
        <glz-table
          .columns=${transactionColumns}
          .data=${transactionData}
          size="small"
        ></glz-table>
      </div>
    `;
  }
};