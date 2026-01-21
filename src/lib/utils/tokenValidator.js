// Token validation utility

/**
 * Decode JWT token without verification (client-side check only)
 */
function decodeToken(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}

/**
 * Check if token is expired
 */
function isTokenExpired(token) {
  if (!token) return true;
  
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;
  
  // Check if token expires in the next 5 seconds
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime + 5;
}

/**
 * Validate and clean up expired tokens
 */
export function validateAndCleanupTokens() {
  if (typeof window === 'undefined') return;
  
  const accessToken = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  
  // Check if access token is expired
  if (accessToken && isTokenExpired(accessToken)) {
    console.log('Access token expired, removing...');
    localStorage.removeItem('access_token');
  }
  
  // Check if refresh token is expired
  if (refreshToken && isTokenExpired(refreshToken)) {
    console.log('Refresh token expired, removing...');
    localStorage.removeItem('refresh_token');
  }
  
  // If refresh token is expired, also remove access token
  if (!refreshToken || isTokenExpired(refreshToken)) {
    localStorage.removeItem('access_token');
  }
}

export { decodeToken, isTokenExpired };
