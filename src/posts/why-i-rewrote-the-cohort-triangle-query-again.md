## The background

Every codebase has that one feature. The one that looks simple in a product spec, turns monstrous in production data, and develops a mythology in the commit history. For SavvyCFO, that feature is the subscription cohort triangle.

This post is not a tutorial. It's a post-mortem and a confession. I've now rewritten this query architecture three times in eight months, and I think — _think_ — I've finally got it right.

## What broke

### Zero pollution

The first version worked until a client had a month with zero new subscribers. The query simply skipped that month — no row in the output. The frontend rendered a shifted triangle that made it look like a great retention month had appeared from nowhere.

The fix everyone reaches for first is `COALESCE` with a `LEFT JOIN` against a calendar table. And that works, until your calendar table doesn't cover a client's date range, or the `LEFT JOIN` explodes your row count because you didn't filter correctly. I made both mistakes.

### Dual sequencing

The second problem was sequencing. I needed two different sequences on the same dataset: `seq` (position of this month in the cohort's timeline) and `payment_sequence` (the nth payment this subscriber has made). They sound similar. They are not the same.

## The fix

The final architecture uses a **dynamic month generator CTE** at the top of the query chain. It produces every month in the analysis window regardless of whether any data exists for that month.

> The database will never tell you a row is missing. It will simply not include it, and let you assume everything is fine.

## What I learned

  * **Validate shape, not just values.** A test that checks "month 3 retention is between 60–95%" will pass even when the month numbering is off by one.
  * **The month generator belongs in a seed table.** Generating it inline in a CTE is clever but fragile.
  * **MariaDB's optimizer is not MySQL's optimizer.** Query hints that work on one will silently degrade on the other.
