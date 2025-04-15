// src/main/webapp/app/shared/auth/authority-utils.ts
export function hasAnyAuthority(authorities: string[], requiredAuthorities: string[]): boolean {
  if (!authorities || !requiredAuthorities) {
    return false;
  }
  return requiredAuthorities.some(auth => authorities.includes(auth));
}
