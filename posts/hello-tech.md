# Why I Still Write Raw SQL

Every few months a new ORM promises to make database queries "just disappear." And every few months I end up back in the SQL, because that's where the actual thinking happens.

## The problem with hiding the query

ORMs are great for the boring 80% — fetch a row, save a row, done. But the moment you need a real aggregation, a window function, or a join across five tables, the abstraction starts fighting you instead of helping.

```sql
SELECT
    client_id,
    DATE_TRUNC('month', created_at) AS month,
    COUNT(*) AS orders,
    SUM(amount) AS revenue
FROM orders
WHERE status = 'completed'
GROUP BY client_id, month
ORDER BY month DESC;
```

Try expressing that cleanly through a chain of `.filter().annotate().values()` calls and you'll spend more time fighting the query builder than you would have spent just writing SQL.

## Statistics background helps here

Coming from a stats background, I think in terms of the data shape I want *before* I think about the code that gets me there. SQL maps to that mental model almost directly — group, aggregate, filter, order. Code-first ORM syntax adds a translation layer I don't need.

## Where I land

- Use the ORM for simple CRUD.
- Drop to raw SQL for anything analytical.
- Keep the SQL in version-controlled `.sql` files, not buried in a Python string.

Nothing radical. Just picking the right tool for the shape of the problem, instead of forcing every problem into one tool.
