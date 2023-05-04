export function getUrlExtension(url: string) {
  return url.split(/[#?]/)[0].split('.').pop()?.trim() ?? '';
}

export function getUrlFileName(url: string) {
  return url.split(/[#?]/)[0].split('/').pop()?.trim() ?? '';
}