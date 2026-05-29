/**
 * Prepare blog HTML for rendering. Fixes content saved or pasted as escaped entities
 * (e.g. &lt;h2&gt; showing as raw text on the page).
 */
export function prepareBlogHtml(html: string): string {
  if (!html?.trim()) return "";

  let decoded = html.trim();
  let passes = 0;
  while (
    (decoded.includes("&lt;") || decoded.includes("&gt;")) &&
    passes < 3
  ) {
    decoded = decodeHtmlEntities(decoded);
    passes++;
  }

  return decoded;
}

/**
 * Cleans contentEditable / pasted HTML before save or display.
 * Removes empty blocks that cause huge vertical gaps.
 */
export function normalizeBlogHtml(html: string): string {
  let out = prepareBlogHtml(html);
  if (!out) return "";

  // Empty paragraphs and divs (main cause of extra line spacing)
  const emptyBlock =
    /<(?:p|div|h[1-6])[^>]*>(?:\s|&nbsp;|<br\s*\/?>)*<\/(?:p|div|h[1-6])>/gi;
  let prev = "";
  while (prev !== out) {
    prev = out;
    out = out.replace(emptyBlock, "");
  }

  // Collapse 3+ line breaks
  out = out.replace(/(<br\s*\/?>\s*){3,}/gi, "<br />");

  // Trim breaks at start/end of block elements
  out = out.replace(
    /(<(?:p|li|div)[^>]*>)\s*(<br\s*\/?>\s*)+/gi,
    "$1"
  );
  out = out.replace(
    /(<br\s*\/?>\s*)+(<\/(?:p|li|div)>)/gi,
    "$2"
  );

  // Fix list items wrapped in extra <p> inside <li>
  out = out.replace(/<li[^>]*>\s*<p[^>]*>([\s\S]*?)<\/p>\s*<\/li>/gi, "<li>$1</li>");

  return out.trim();
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'");
}
