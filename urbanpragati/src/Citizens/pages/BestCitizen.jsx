import './BestCitizen.css';
import CitizenNavbar from '../components/CitizenNavbar';
import CitizenFooter from '../components/CitizenFooter';
import LeaderboardCard from '../components/LeaderboardCard';

const bestCitizen = {
  rank: 1,
  name: 'Ananya Mishra',
  avatar: 'AM',
  city: 'Lucknow, UP',
  points: 4820,
  complaints: 38,
  verified: 36,
  badges: ['Top Contributor', 'Quick Reporter', 'Verified Citizen'],
  monthYear: 'June 2025',
};

const leaderboard = [
  { rank: 2, name: 'Mohit Agarwal', avatar: 'MA', city: 'Lucknow, UP', points: 4410, complaints: 31, verified: 29 },
  { rank: 3, name: 'Priya Singh', avatar: 'PS', city: 'Kanpur, UP', points: 4180, complaints: 28, verified: 27 },
  { rank: 4, name: 'Vikram Rao', avatar: 'VR', city: 'Varanasi, UP', points: 3950, complaints: 26, verified: 24 },
  { rank: 5, name: 'Sunita Devi', avatar: 'SD', city: 'Agra, UP', points: 3720, complaints: 24, verified: 22 },
  { rank: 6, name: 'Rakesh Nair', avatar: 'RN', city: 'Noida, UP', points: 3490, complaints: 22, verified: 20 },
  { rank: 7, name: 'Deepa Tiwari', avatar: 'DT', city: 'Meerut, UP', points: 3210, complaints: 19, verified: 18 },
  { rank: 8, name: 'Aman Verma', avatar: 'AV', city: 'Allahabad, UP', points: 2980, complaints: 17, verified: 16 },
  { rank: 9, name: 'Kavita Sharma', avatar: 'KS', city: 'Gorakhpur, UP', points: 2740, complaints: 15, verified: 14 },
  { rank: 10, name: 'Harish Gupta', avatar: 'HG', city: 'Mathura, UP', points: 2510, complaints: 13, verified: 12 },
];

const monthlyStats = [
  { label: 'Total Participants', value: '12,480' },
  { label: 'Complaints Filed', value: '8,924' },
  { label: 'Verified Reports', value: '7,341' },
  { label: 'Cities Covered', value: '74' },
];

export default function BestCitizen() {
  return (
    <div className="best-citizen-page">
      <CitizenNavbar />

      <main className="best-citizen-main">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span className="breadcrumb-sep">›</span>
          <span>Best Citizen</span>
        </nav>

        <header className="bc-page-header">
          <h1>Best Citizen of the Month</h1>
          <p>Recognising active citizens who contribute the most to improving urban services through verified complaint reporting.</p>
        </header>

        <div className="bc-stats-bar">
          {monthlyStats.map(s => (
            <div className="bc-stat-card" key={s.label}>
              <span className="bc-stat-num">{s.value}</span>
              <span className="bc-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <section className="best-citizen-hero card" aria-labelledby="best-citizen-title">
          <div className="bch-trophy" aria-hidden="true">
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="80" height="80">
              <circle cx="40" cy="40" r="38" fill="#FF6F00" opacity="0.1" stroke="#FF6F00" strokeWidth="2"/>
              <path d="M28 20h24v20a12 12 0 01-24 0V20z" fill="#FF6F00" opacity="0.3" stroke="#FF6F00" strokeWidth="2"/>
              <path d="M20 20h8M52 20h8" stroke="#FF6F00" strokeWidth="2" strokeLinecap="round"/>
              <path d="M20 20c0 10 8 16 8 16M60 20c0 10-8 16-8 16" stroke="#FF6F00" strokeWidth="2" strokeLinecap="round"/>
              <line x1="40" y1="52" x2="40" y2="62" stroke="#FF6F00" strokeWidth="2"/>
              <rect x="30" y="62" width="20" height="4" rx="2" fill="#FF6F00" opacity="0.5" stroke="#FF6F00" strokeWidth="1.5"/>
            </svg>
          </div>
          <div className="bch-badge" aria-label="Best Citizen of the Month Badge">
            <span className="bch-month">{bestCitizen.monthYear}</span>
          </div>
          <div className="bch-avatar" aria-hidden="true">{bestCitizen.avatar}</div>
          <div className="bch-crown" aria-hidden="true">
            <svg viewBox="0 0 40 20" fill="#FF6F00" width="40" height="20">
              <path d="M0 20L8 2L20 14L32 2L40 20H0z"/>
            </svg>
          </div>
          <h2 id="best-citizen-title" className="bch-name">{bestCitizen.name}</h2>
          <p className="bch-city">{bestCitizen.city}</p>
          <div className="bch-stats">
            <div className="bch-stat">
              <span className="bch-stat-num">{bestCitizen.points.toLocaleString()}</span>
              <span className="bch-stat-label">Points</span>
            </div>
            <div className="bch-stat-divider" aria-hidden="true"/>
            <div className="bch-stat">
              <span className="bch-stat-num">{bestCitizen.complaints}</span>
              <span className="bch-stat-label">Complaints</span>
            </div>
            <div className="bch-stat-divider" aria-hidden="true"/>
            <div className="bch-stat">
              <span className="bch-stat-num">{bestCitizen.verified}</span>
              <span className="bch-stat-label">Verified</span>
            </div>
          </div>
          <div className="bch-badges">
            {bestCitizen.badges.map(b => (
              <span key={b} className="bch-badge-chip">{b}</span>
            ))}
          </div>
        </section>

        <section className="leaderboard-section">
          <h2 className="section-heading">Full Leaderboard — {bestCitizen.monthYear}</h2>
          <div className="leaderboard-list">
            {leaderboard.map(c => (
              <LeaderboardCard key={c.rank} citizen={c} />
            ))}
          </div>
        </section>

        <section className="points-info card">
          <h2>How Points Are Earned</h2>
          <div className="points-grid">
            <div className="points-item">
              <span className="points-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </span>
              <div>
                <strong>+10 pts</strong>
                <p>Submitting a new complaint</p>
              </div>
            </div>
            <div className="points-item">
              <span className="points-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                  <path d="M5 13l4 4L19 7"/>
                </svg>
              </span>
              <div>
                <strong>+50 pts</strong>
                <p>Complaint verified by admin</p>
              </div>
            </div>
            <div className="points-item">
              <span className="points-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                </svg>
              </span>
              <div>
                <strong>+20 pts</strong>
                <p>Complaint resolved successfully</p>
              </div>
            </div>
            <div className="points-item">
              <span className="points-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                  <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"/>
                </svg>
              </span>
              <div>
                <strong>+5 pts</strong>
                <p>Submitting feedback</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <CitizenFooter />
    </div>
  );
}
