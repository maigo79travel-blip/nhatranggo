-- Hide the retired vehicle while retaining fares, products and booking history.
UPDATE transfer_fares
SET active = false
WHERE vehicle = 'limo9' AND active;

UPDATE products
SET active = false
WHERE type = 'transfer' AND id LIKE 'transfer-%-limo9' AND active;
