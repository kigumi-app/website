#!/usr/bin/env bash
# PreToolUse:Read — warn before reading large files, log to token ledger
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
LEDGER="$PROJECT_DIR/.claude/token-ledger.json"
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

[[ -z "$FILE_PATH" ]] && exit 0
[[ ! -f "$FILE_PATH" ]] && exit 0

LINE_COUNT=$(wc -l < "$FILE_PATH" 2>/dev/null || echo 0)
LINE_COUNT=$(echo "$LINE_COUNT" | tr -d ' ')
EST_TOKENS=$((LINE_COUNT * 8))

if [[ -f "$LEDGER" ]]; then
  TMP="${LEDGER}.tmp.$$"
  jq --arg file "$FILE_PATH" --argjson tokens "$EST_TOKENS" '
    .current_session.reads.total += 1 |
    .current_session.estimated_tokens.reads += $tokens |
    .current_session.files_read += [$file] |
    .lifetime.total_estimated_read_tokens += $tokens
  ' "$LEDGER" > "$TMP" 2>/dev/null && mv "$TMP" "$LEDGER" || rm -f "$TMP"
fi

if [[ "$LINE_COUNT" -gt 300 ]]; then
  PREVIEW=$(head -3 "$FILE_PATH" 2>/dev/null | sed 's/^/  /')
  if [[ -f "$LEDGER" ]]; then
    TMP="${LEDGER}.tmp.$$"
    jq '.current_session.reads.large_file_warned += 1 | .lifetime.large_reads_warned += 1' \
      "$LEDGER" > "$TMP" 2>/dev/null && mv "$TMP" "$LEDGER" || rm -f "$TMP"
  fi
  echo "⚠ LARGE FILE: $FILE_PATH is $LINE_COUNT lines (~$EST_TOKENS tokens). Consider using offset/limit." >&2
  echo "First 3 lines:" >&2
  echo "$PREVIEW" >&2
fi

exit 0
