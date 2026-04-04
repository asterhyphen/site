export type DecoderResult = { name: string; output: string };

function isValidOutput(str: string): boolean {
  // Check if output is printable UTF-8 or ASCII
  try {
    // Allow printable chars, whitespace, and common punctuation
    return /^[\x20-\x7E\n\r\t]*$/.test(str) || !str.includes('\ufffd');
  } catch {
    return false;
  }
}

function scoreEncoding(name: string, output: string, input: string): number {
  let score = 0;
  
  // Bonus if output is valid text
  if (isValidOutput(output)) score += 10;
  
  // Bonus if output length makes sense (not too short, not identical)
  if (output.length > 2 && output.length !== input.length) score += 5;
  
  // Bonus for specific patterns
  if ((name === "Base64" || name === "Hex") && output.length > 8) score += 3;
  if (name === "ROT13" && output !== input) score += 2;
  
  return score;
}

export function autoDecode(input: string): DecoderResult {
  const t = input.trim();
  const attempts: DecoderResult[] = [];

  // Priority order for CTF common encodings
  const decoders: Array<[string, (s: string) => string]> = [
    ["Hex", decodeHex],
    ["Base64", decodeBase64],
    ["Binary", decodeBinary],
    ["URL decode", decodeUrl],
    ["ROT13", decodeRot13],
    ["HTML entities", decodeHtmlEntities],
    ["ASCII codes", decodeAsciiCodes],
  ];

  for (const [name, fn] of decoders) {
    try {
      const output = fn(t);
      if (isValidOutput(output) && output.length > 1) {
        attempts.push({ name, output, score: scoreEncoding(name, output, t) });
      }
    } catch {
      // Try next decoder
    }
  }

  // Sort by score and return best match
  if (attempts.length > 0) {
    attempts.sort((a, b) => (b as any).score - (a as any).score);
    const best = attempts[0];
    return { name: best.name, output: best.output };
  }

  return { name: "Multiple (see below)", output: "Ran multiple decoders — inspect panels below." };
}

export function runAllDecoders(text: string): DecoderResult[] {
  const decoders = [
    ["Base64", decodeBase64],
    ["Hex", decodeHex],
    ["Binary", decodeBinary],
    ["ASCII codes", decodeAsciiCodes],
    ["URL decode", decodeUrl],
    ["ROT13", decodeRot13],
    ["Caesar (all shifts)", decodeCaesar],
    ["HTML entities", decodeHtmlEntities],
    ["JSON pretty", decodeJsonPretty],
  ] as const;

  return decoders.map(([name, fn]) => {
    try {
      return { name, output: fn(text) };
    } catch {
      return { name, output: "— error" };
    }
  });
}

/* ==== decoders ==== */

export function decodeBase64(input: string) {
  const bin = atob(input.replace(/\s+/g, ""));
  return new TextDecoder().decode(Uint8Array.from(bin, c => c.charCodeAt(0)));
}

export function decodeHex(input: string) {
  const s = input.replace(/[^0-9a-fA-F]/g, "");
  if (s.length % 2) throw new Error();
  return new TextDecoder().decode(
    new Uint8Array(s.match(/.{2}/g)!.map(b => parseInt(b, 16)))
  );
}

export function decodeBinary(input: string) {
  const parts = input.includes(" ")
    ? input.split(/\s+/)
    : input.match(/.{1,8}/g) || [];
  return new TextDecoder().decode(
    new Uint8Array(parts.map(p => parseInt(p, 2)))
  );
}

export function decodeAsciiCodes(input: string) {
  const parts = input.trim().split(/[,\s]+/);
  if (!parts.every(p => /^\d+$/.test(p))) return "No ascii codes detected";
  return parts.map(p => String.fromCharCode(+p)).join("");
}

export function decodeUrl(input: string) {
  try { return decodeURIComponent(input); }
  catch { return decodeURIComponent(escape(input)); }
}

export function decodeRot13(input: string) {
  return input.replace(/[A-Za-z]/g, c => {
    const base = c <= "Z" ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
  });
}

export function decodeHtmlEntities(input: string) {
  const t = document.createElement("textarea");
  t.innerHTML = input;
  return t.value;
}

export function decodeJsonPretty(input: string) {
  try { return JSON.stringify(JSON.parse(input), null, 2); }
  catch { return "Not valid JSON"; }
}

export function decodeCaesar(input: string) {
  return Array.from({ length: 25 }, (_, i) =>
    `${i + 1}: ${caesarShift(input, i + 1)}`
  ).join("\n");
}

function caesarShift(text: string, shift: number) {
  return text.replace(/[A-Za-z]/g, c => {
    const base = c <= "Z" ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + shift) % 26) + base);
  });
}
