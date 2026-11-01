export interface SecretPattern {
  name: string;
  re: RegExp;
}

/** High-confidence token formats. Kept conservative to avoid false positives. */
export const SECRET_PATTERNS: SecretPattern[] = [
  { name: "Anthropic API key", re: /\bsk-ant-[A-Za-z0-9_-]{20,}/ },
  { name: "OpenAI API key", re: /\bsk-(?:proj-|svcacct-)?[A-Za-z0-9_-]{32,}/ },
  { name: "GitHub token", re: /\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{36}\b|\bgithub_pat_[A-Za-z0-9_]{50,}/ },
  { name: "GitLab token", re: /\bglpat-[A-Za-z0-9_-]{20}\b/ },
  { name: "AWS access key id", re: /\b(?:AKIA|ASIA)[0-9A-Z]{16}\b/ },
  { name: "Google API key", re: /\bAIza[0-9A-Za-z_-]{35}\b/ },
  { name: "Slack token", re: /\bxox[abprs]-[A-Za-z0-9-]{10,}/ },
  { name: "Stripe secret key", re: /\b(?:sk|rk)_live_[A-Za-z0-9]{20,}/ },
  { name: "Notion token", re: /\b(?:secret_|ntn_)[A-Za-z0-9]{40,}/ },
  { name: "Private key", re: /-----BEGIN (?:RSA |EC |DSA |OPENSSH |PGP )?PRIVATE KEY-----/ },
  { name: "JWT", re: /\beyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/ },
  { name: "Bearer token", re: /\bBearer\s+[A-Za-z0-9._~+/-]{24,}=*/ },
  { name: "Credentials in URL", re: /\b[a-z][a-z0-9+.-]*:\/\/[^\s/:@]+:[^\s/@]{3,}@/i },
];

export function findSecret(text: string): { name: string; match: string } | undefined {
  for (const p of SECRET_PATTERNS) {
    const m = p.re.exec(text);
    if (m) return { name: p.name, match: m[0] };
  }
  return undefined;
}

export const SECRET_KEY_NAME_RE = /(API[_-]?KEY|TOKEN|SECRET|PASSWORD|PASSWD|PASS\b|_PAT\b|CREDENTIAL|PRIVATE[_-]?KEY|AUTH)/i;

/** Values that are obviously references or placeholders rather than real secrets. */
export function looksLikePlaceholder(value: string): boolean {
  const v = value.trim();
  if (v.length < 8) return true;
  if (/^\$\{?[A-Za-z_][A-Za-z0-9_:-]*\}?$/.test(v)) return true; // $VAR / ${VAR} / ${env:VAR}
  if (/^\$\{(?:env|input|secret)[:.]/i.test(v)) return true;
  if (/^(?:op|keychain|vault|env):\/\//i.test(v)) return true; // 1Password / keychain refs
  if (/^<.*>$|^\[.*\]$|^\{\{.*\}\}$/.test(v)) return true;
  if (/(your|my|replace|change|insert|example|placeholder|dummy|xxx|\.\.\.)/i.test(v)) return true;
  if (/^(.)\1+$/.test(v)) return true; // "********"
  return false;
}

export function redact(secret: string): string {
  if (secret.length <= 10) return "*".repeat(secret.length);
  return `${secret.slice(0, 6)}…${secret.slice(-2)} (${secret.length} chars)`;
}
