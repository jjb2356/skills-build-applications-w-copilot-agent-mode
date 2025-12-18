let API_BASE = null;

if (process.env.REACT_APP_CODESPACE_NAME) {
	API_BASE = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`;
} else {
	// Use relative path so the CRA dev server can proxy to the backend during local development
	API_BASE = '/api';
}

console.log('Using API base:', API_BASE);

export default API_BASE;
