import './index.css';
import './index.css';

// Components
import Terminal from './components/Terminal/Terminal';
import Guestbook from './components/Guestbook/Guestbook';
import ProfilePanel from './components/Profile/ProfilePanel';

function App() {
  return (
    <div className="layout">
      <div className="left-panel">
        <Terminal />
        <Guestbook />
      </div>
      <div className="right-panel">
        <ProfilePanel />
      </div>
    </div>
  );
}

export default App;
