export type DecoderResult = { name: string; output: string };

export function autoDecode(input: string): DecoderResult {
  const t = input.trim();

  if (/^[A-Za-z0-9+/]+={0,2}$/.test(t.replace(/\s+/g, "")) && t.replace(/\s+/g, "").length % 4 === 0) {
    try { return { name: "Base64", output: decodeBase64(t) }; } catch {}
  }

  if (/^[0-9a-fA-F\s:]+$/.test(t) && t.replace(/\s|:/g, "").length % 2 === 0) {
    try { return { name: "Hex", output: decodeHex(t) }; } catch {}
  }

  if (/^[01\s]+$/.test(t)) {
    try { return { name: "Binary", output: decodeBinary(t) }; } catch {}
  }

  if (/%[0-9A-Fa-f]{2}/.test(t) || /\+/.test(t)) {
    try { return { name: "URL decode", output: decodeUrl(t) }; } catch {}
  }

  if (/&[a-zA-Z0-9#]+;/.test(t)) {
    try { return { name: "HTML entities", output: decodeHtmlEntities(t) }; } catch {}
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
    ["Base32", decodeBase32],
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

export function decodeBase32(input: string) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  const s = input.replace(/=+$/, "").replace(/[^A-Z2-7]/gi, "").toUpperCase();
  let bits = "";
  for (const c of s) bits += alphabet.indexOf(c).toString(2).padStart(5, "0");
  const bytes = bits.match(/.{8}/g)?.map(b => parseInt(b, 2)) || [];
  return new TextDecoder().decode(new Uint8Array(bytes));
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
