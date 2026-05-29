/** Hostnames allowed by next.config images.remotePatterns */
const ALLOWED_HOSTS = new Set([
  "images.unsplash.com",
  "utfs.io",
]);

export function isUploadThingHost(hostname: string): boolean {
  return hostname.endsWith(".ufs.sh");
}

export function shouldOptimizeImage(src: string): boolean {
  try {
    const url = new URL(src);
    if (url.protocol !== "https:" && url.protocol !== "http:") return false;
    return (
      ALLOWED_HOSTS.has(url.hostname) || isUploadThingHost(url.hostname)
    );
  } catch {
    return false;
  }
}
