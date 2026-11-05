# Internal environment

Names present in the script `_G` but **not game API** - engine-internal helpers. Listed for completeness.

- `lock` / `unlock` - internal mutex helpers.
- `sleep` - lowercase alias of the timing [`Sleep`](/api/globals#sleep).

> Lua standard-library tables (`math`, `string`, `table`, ...) are available to scripts but are excluded from the API fingerprint and not listed here.
