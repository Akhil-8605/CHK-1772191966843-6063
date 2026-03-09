import './FeedbackPage.css';
import CitizenNavbar from '../components/CitizenNavbar';
import CitizenFooter from '../components/CitizenFooter';

const feedbackList = [
  { id: 1, name: 'Ananya Mishra', avatar: 'AM', date: '3 Jun 2026', rating: 5, department: 'Water Supply', comment: 'The water supply complaint was resolved within 24 hours! Outstanding service by the water department team. I am very satisfied.' },
  { id: 2, name: 'Rakesh Nair', avatar: 'RN', date: '1 Jun 2026', rating: 4, department: 'Road Repair', comment: 'Road repair was done quickly but the quality of patching could be better. Hope they use better material next time.' },
  { id: 3, name: 'Sunita Devi', avatar: 'SD', date: '30 May 2026', rating: 3, department: 'Sanitation', comment: 'Garbage collection improved slightly but is still irregular in our locality. Please fix the schedule.' },
  { id: 4, name: 'Mohit Agarwal', avatar: 'MA', date: '28 May 2026', rating: 5, department: 'Electricity', comment: 'The transformer issue was addressed in under 6 hours. Brilliant response time. Kudos to the electricity team!' },
  { id: 5, name: 'Priya Singh', avatar: 'PS', date: '25 May 2026', rating: 4, department: 'Property Tax', comment: 'The online payment portal is very smooth and receipt generation is instant. Excellent digital experience.' },
  { id: 6, name: 'Amit Tiwari', avatar: 'AT', date: '22 May 2026', rating: 2, department: 'Road Repair', comment: 'Still waiting on my complaint from 3 weeks ago. The pothole is getting bigger and causing accidents.' },
];

const overallRating = { score: 4.1, total: 2847, breakdown: [68, 19, 7, 4, 2] };

function StarRating({ value, size = 'md' }) {
  return (
    <div className={`star-rating star-${size}`} aria-label={`${value} out of 5 stars`}>
      {[1,2,3,4,5].map(s => (
        <svg key={s} viewBox="0 0 20 20" fill={s <= value ? '#FF6F00' : '#e2e8f0'} width={size === 'lg' ? 28 : 16} height={size === 'lg' ? 28 : 16} aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  );
}

export default function FeedbackPage() {
  return (
    <div className="feedback-page">
      <CitizenNavbar />

      <main className="feedback-main">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span className="breadcrumb-sep">›</span>
          <span>Citizen Feedback</span>
        </nav>

        <header className="feedback-header">
          <h1>Citizen Feedback Portal</h1>
          <p>Share your experience with municipal services. Your feedback drives improvement across all departments.</p>
        </header>

        <div className="feedback-layout">
          <section className="feedback-feed-col">
            <h2 className="section-heading">Recent Feedback</h2>
            <div className="feedback-list">
              {feedbackList.map(f => (
                <article className="card feedback-card" key={f.id}>
                  <div className="feedback-card-top">
                    <div className="feedback-avatar" aria-hidden="true">{f.avatar}</div>
                    <div className="feedback-meta">
                      <span className="feedback-name">{f.name}</span>
                      <span className="feedback-date">{f.date}</span>
                    </div>
                    <span className="feedback-dept-chip">{f.department}</span>
                  </div>
                  <div className="feedback-stars-row">
                    <StarRating value={f.rating} />
                    <span className="feedback-rating-text">{f.rating}/5</span>
                  </div>
                  <p className="feedback-comment">{f.comment}</p>
                  <div className="feedback-helpful">
                    <button type="button" className="btn btn-ghost btn-xs" aria-label="Mark as helpful">
                      <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14" aria-hidden="true">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6z"/>
                        <path d="M6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                      </svg>
                      Helpful
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="feedback-sidebar">
            <div className="card rating-overview-card">
              <h2>Overall Rating</h2>
              <div className="rating-big">
                <span className="rating-big-num">{overallRating.score}</span>
                <div>
                  <StarRating value={Math.round(overallRating.score)} size="lg" />
                  <p className="rating-total">Based on {overallRating.total.toLocaleString()} reviews</p>
                </div>
              </div>
              <div className="rating-breakdown">
                {overallRating.breakdown.map((pct, i) => (
                  <div className="rb-row" key={i}>
                    <span className="rb-label">{5 - i} star</span>
                    <div className="rb-bar-wrap">
                      <div className="rb-bar-fill" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="rb-pct">{pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card submit-feedback-card">
              <h2>Submit Your Feedback</h2>
              <p>Rate your recent experience with any municipal service.</p>
              <form className="feedback-form" onSubmit={e => e.preventDefault()} aria-label="Submit feedback form">
                <div className="form-group">
                  <label htmlFor="fb-name">Your Name</label>
                  <input id="fb-name" type="text" placeholder="Full Name" />
                </div>
                <div className="form-group">
                  <label htmlFor="fb-dept">Department</label>
                  <select id="fb-dept">
                    <option value="">-- Select Department --</option>
                    <option>Water Supply</option>
                    <option>Electricity</option>
                    <option>Sanitation</option>
                    <option>Road Repair</option>
                    <option>Property Tax</option>
                    <option>Development</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Rating</label>
                  <div className="star-input-row" aria-label="Select rating">
                    {[1,2,3,4,5].map(s => (
                      <button key={s} type="button" className="star-btn" aria-label={`${s} star`}>
                        <svg viewBox="0 0 20 20" fill="#e2e8f0" width="28" height="28">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="fb-comment">Your Feedback</label>
                  <textarea id="fb-comment" rows={4} placeholder="Share your experience with the service..." />
                </div>
                <button type="submit" className="btn btn-primary btn-full">Submit Feedback</button>
              </form>
            </div>
          </aside>
        </div>
      </main>

      <CitizenFooter />
    </div>
  );
}
