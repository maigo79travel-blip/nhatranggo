-- Replace the original hotel photos while preserving images edited in the CMS.
UPDATE products AS product
SET image = replacement.new_image
FROM (VALUES
  ('hotels-2', '/images/d22690201e60d171.jpg', '/images/figma/hotels/movenpick.webp'),
  ('hotels-4', '/images/f98ceb49e182d3da.jpg', '/images/figma/hotels/fusion.webp'),
  ('hotels-6', '/images/9fa0dee262932b0d.jpg', '/images/figma/hotels/duyen-ha.webp')
) AS replacement(id, old_image, new_image)
WHERE product.id = replacement.id
  AND product.image = replacement.old_image;
