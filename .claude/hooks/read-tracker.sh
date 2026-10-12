#!/usr/bin/env bash
# PreToolUse:Read — detect duplicate file reads within a session
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
LEDGER="$PROJECT_DIR/.claude/token-ledger.json"
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

[[ -z "$FILE_PATH" ]] && exit 0

SESSION_KEY="${CLAUDE_SESSION_ID:-$(date +%Y%m%d)}"
TRACK_FILE="/tmp/claude-reads-merlion-${SESSION_KEY}.log"

if [[ -f "$TRACK_FILE" ]] && grep -qF "$FILE_PATH" "$TRACK_FILE" 2>/dev/null; then
  READ_COUNT=$(grep -cF "$FILE_PATH" "$TRACK_FILE" 2>/dev/null || echo 0)
  echo "⚠ DUPLICATE READ: You already read '$FILE_PATH' ($READ_COUNT time(s)) this session. Content should be in your context." >&2
  if [[ -f "$LEDGER" ]]; then
    TMP="${LEDGER}.tmp.$$"
    jq '.current_session.reads.duplicates_warned += 1 | .lifetime.duplicate_reads_prevented += 1' \
      "$LEDGER" > "$TMP" 2>/dev/null && mv "$TMP" "$LEDGER" || rm -f "$TMP"
  fi
fi

echo "$FILE_PATH" >> "$TRACK_FILE"
exit 0
