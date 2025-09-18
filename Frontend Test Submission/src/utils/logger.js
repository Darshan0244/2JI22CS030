class Logger {
  static log(action, data = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      action,
      data
    };
    
    console.log(`[${logEntry.timestamp}] ${action}:`, data);
    
    // Store in localStorage for persistence
    const logs = JSON.parse(localStorage.getItem('urlShortenerLogs') || '[]');
    logs.push(logEntry);
    localStorage.setItem('urlShortenerLogs', JSON.stringify(logs));
  }
}

export default Logger;