import './PropertyTax.css';
import CitizenNavbar from '../components/CitizenNavbar';
import CitizenFooter from '../components/CitizenFooter';

const propertyDetails = {
  owner: 'Ramesh Kumar Gupta',
  propertyId: 'UP-MUN-2026-00712',
  address: 'House No. 45, Sector 14, Gandhi Nagar, Lucknow — 226001',
  type: 'Residential',
  area: '1200 sq. ft.',
  zone: 'Zone A',
  financialYear: '2026–25',
  dueDate: '31 March 2025',
  baseTax: '₹4,800',
  surcharge: '₹480',
  penalty: '₹0',
  totalDue: '₹5,280',
  status: 'Unpaid',
};

const paymentHistory = [
  { year: '2023–24', amount: '₹5,040', date: '12 Jan 2026', receipt: 'REC-2026-0712' },
  { year: '2022–23', amount: '₹4,800', date: '05 Feb 2023', receipt: 'REC-2023-0612' },
  { year: '2021–22', amount: '₹4,500', date: '28 Mar 2022', receipt: 'REC-2022-0501' },
];

export default function PropertyTax() {
  return (
    <div className="property-page">
      <CitizenNavbar />

      <main className="property-main">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span className="breadcrumb-sep">›</span>
          <span>Property Tax</span>
        </nav>

        <header className="property-header">
          <div className="property-header-icon">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 28L32 8l24 20v28H40V40H24v16H8V28z" fill="#FF6F00" opacity="0.15" stroke="#FF6F00" strokeWidth="2.5" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h1>Property Tax Portal</h1>
            <p>View your property details, outstanding dues, and make online payments securely.</p>
          </div>
        </header>

        <div className="property-two-col">
          <section className="property-left">
            <div className="card property-details-card">
              <div className="property-card-header">
                <h2>Property Details</h2>
                <span className="status-chip pending">{propertyDetails.status}</span>
              </div>
              <div className="property-info-grid">
                <div className="property-info-row">
                  <span className="prop-label">Property ID</span>
                  <span className="prop-value mono">{propertyDetails.propertyId}</span>
                </div>
                <div className="property-info-row">
                  <span className="prop-label">Owner Name</span>
                  <span className="prop-value">{propertyDetails.owner}</span>
                </div>
                <div className="property-info-row">
                  <span className="prop-label">Address</span>
                  <span className="prop-value">{propertyDetails.address}</span>
                </div>
                <div className="property-info-row">
                  <span className="prop-label">Property Type</span>
                  <span className="prop-value">{propertyDetails.type}</span>
                </div>
                <div className="property-info-row">
                  <span className="prop-label">Built-up Area</span>
                  <span className="prop-value">{propertyDetails.area}</span>
                </div>
                <div className="property-info-row">
                  <span className="prop-label">Zone</span>
                  <span className="prop-value">{propertyDetails.zone}</span>
                </div>
              </div>
            </div>

            <div className="card tax-due-card">
              <div className="tax-due-header">
                <div>
                  <h2>Outstanding Tax</h2>
                  <p className="tax-fy">Financial Year: {propertyDetails.financialYear}</p>
                </div>
                <div className="tax-due-amount">{propertyDetails.totalDue}</div>
              </div>

              <div className="tax-breakdown">
                <div className="tax-row">
                  <span>Base Tax</span>
                  <span>{propertyDetails.baseTax}</span>
                </div>
                <div className="tax-row">
                  <span>Surcharge (10%)</span>
                  <span>{propertyDetails.surcharge}</span>
                </div>
                <div className="tax-row">
                  <span>Late Penalty</span>
                  <span className="green-text">{propertyDetails.penalty}</span>
                </div>
                <div className="tax-row tax-total-row">
                  <span>Total Due</span>
                  <span className="tax-total">{propertyDetails.totalDue}</span>
                </div>
              </div>

              <p className="tax-due-date">
                <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"/>
                </svg>
                Due by: {propertyDetails.dueDate}
              </p>

              <div className="tax-actions">
                <button className="btn btn-primary" type="button">Pay Online</button>
                <button className="btn btn-ghost" type="button">
                  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"/>
                  </svg>
                  Download Receipt
                </button>
              </div>
            </div>

            <div className="card search-property-card">
              <h3>Search Another Property</h3>
              <form className="service-form" onSubmit={e => e.preventDefault()} aria-label="Property search">
                <div className="form-group">
                  <label htmlFor="pt-id">Property ID / Assessment No.</label>
                  <input id="pt-id" type="text" placeholder="e.g. UP-MUN-2026-XXXXX" />
                </div>
                <div className="form-group">
                  <label htmlFor="pt-name">Owner Name</label>
                  <input id="pt-name" type="text" placeholder="e.g. Suresh Patel" />
                </div>
                <button type="submit" className="btn btn-secondary">Search Property</button>
              </form>
            </div>
          </section>

          <section className="property-right">
            <h2 className="section-heading">Payment History</h2>
            <div className="payment-history-list">
              {paymentHistory.map((p) => (
                <div className="card payment-history-card" key={p.receipt}>
                  <div className="ph-top">
                    <div>
                      <p className="ph-year">{p.year}</p>
                      <p className="ph-receipt">{p.receipt}</p>
                    </div>
                    <span className="status-chip resolved">Paid</span>
                  </div>
                  <div className="ph-bottom">
                    <span className="ph-amount">{p.amount}</span>
                    <span className="ph-date">{p.date}</span>
                    <button type="button" className="btn btn-ghost btn-sm">Download</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="card receipt-placeholder-card">
              <div className="receipt-watermark" aria-hidden="true">PAID</div>
              <h3>Official Tax Receipt</h3>
              <p className="receipt-id">Receipt No: REC-2026-0712</p>
              <div className="receipt-rows">
                <div className="receipt-row"><span>Property Owner</span><span>Ramesh Kumar Gupta</span></div>
                <div className="receipt-row"><span>Property ID</span><span>UP-MUN-2026-00712</span></div>
                <div className="receipt-row"><span>Period</span><span>2023–24</span></div>
                <div className="receipt-row"><span>Amount Paid</span><span>₹5,040</span></div>
                <div className="receipt-row"><span>Date of Payment</span><span>12 Jan 2026</span></div>
                <div className="receipt-row"><span>Mode</span><span>Online — UPI</span></div>
              </div>
              <button type="button" className="btn btn-secondary btn-full">Download as PDF</button>
            </div>
          </section>
        </div>
      </main>

      <CitizenFooter />
    </div>
  );
}
