const PUBLIC_AUTH_PATHS = ['/login', '/register'] as const

export function isPublicAuthRequest(url: string | undefined): boolean {
  if (!url) {
    return false
  }

  return PUBLIC_AUTH_PATHS.some((path) => url === path || url.endsWith(path))
}

export function shouldHandleUnauthorized(url: string | undefined): boolean {
  return !isPublicAuthRequest(url)
}

export function getAuthRedirectPath(currentPath: string): string | null {
  return currentPath === '/auth' ? null : '/auth'
}
