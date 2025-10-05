import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error silently in production
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Minimal error display for presentation
      return (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: '#2d2d2d',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffff55',
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '0.8rem',
          textAlign: 'center',
          padding: '40px',
        }}>
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🛰️</div>
            <div>Loading Habitat Builder...</div>
            <button
              onClick={() => window.location.reload()}
              style={{
                marginTop: '30px',
                padding: '12px 24px',
                background: '#55ff55',
                border: '4px solid #000000',
                color: '#000000',
                fontFamily: '"Press Start 2P", monospace',
                fontSize: '0.6rem',
                cursor: 'pointer',
                boxShadow: '4px 4px 0px #000000',
              }}
            >
              Refresh
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
