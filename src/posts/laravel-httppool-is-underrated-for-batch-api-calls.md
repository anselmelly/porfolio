## The problem

Fetching EPSS scores for 80 CVEs. Each score lives at a separate endpoint. The naive implementation: loop, fetch, wait. 80 requests × ~500ms average = 40 seconds. For a scheduled command that runs every night, this is fine. For anything interactive, it's a dealbreaker.

## Http::pool() in one paragraph

Laravel's `Http::pool()` sends multiple HTTP requests concurrently using Guzzle promises under the hood. You define all your requests upfront, pass them to the pool, and get back an array of responses in the same order. The total time is roughly the time of the _slowest_ single request, not the sum of all of them.
    
    
    $responses = Http::pool(fn (Pool $pool) =>
        collect($cveIds)->map(fn ($id) =>
            $pool->get("https://api.first.org/data/v1/epss?cve={$id}")
        )->all()
    );

## Where it breaks

A few things to watch:

  * **Rate limits.** Sending 200 concurrent requests to an API that rate-limits at 100/minute will get you blocked. Chunk your pool calls.
  * **Memory.** All responses are held in memory simultaneously. For large response bodies, this adds up.
  * **Error handling.** A failed request in the pool doesn't throw — it returns a response object with a failed status. You have to check each one.



## The result

80 requests: 40 seconds sequential, 2.8 seconds pooled. Same data, same endpoints, 14× faster. I should have done this from the start.
