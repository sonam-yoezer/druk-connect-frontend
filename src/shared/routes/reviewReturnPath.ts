export function reviewReturnPath(value: string | null | undefined): string | null {
  if (!value || /[\\\r\n]/.test(value)) return null;
  return /^\/(?:buyer-dashboard\/services|services)\/[0-9a-f-]{36}(?:\?[^#]*)?$/i.test(value) ? value : null;
}
