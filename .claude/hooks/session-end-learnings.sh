#!/usr/bin/env bash
# Stop hook — finalize token ledger
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
LEDGER="$PROJECT_DIR/.claude/token-ledger.json"

if [[ -f "$LEDGER" ]]; then
  TMP="${LEDGER}.tmp.$$"
  jq --arg date "$(date +%Y-%m-%d)" --arg time "$(date +%H:%M:%S)" '
    .current_session.end_time = $time |
    .current_session.date = $date |
    .sessions += [.current_session] |
    .lifetime.total_sessions += 1 |
    .current_session = {
      "date": "",
      "start_time": "",
      "end_time": "",
      "reads": { "total": 0, "duplicates_warned": 0, "large_file_warned": 0 },
      "estimated_tokens": { "reads": 0, "writes": 0, "commands": 0 },
      "files_read": [],
      "bugs_logged": 0
    }
  ' "$LEDGER" > "$TMP" 2>/dev/null && mv "$TMP" "$LEDGER" || rm -f "$TMP"
fi

exit 0
