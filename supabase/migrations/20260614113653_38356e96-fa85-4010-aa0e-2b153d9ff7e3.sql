DROP POLICY IF EXISTS "Anyone can upload an order proof" ON storage.objects;

CREATE POLICY "Anyone can upload an order proof"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'order-proofs'
  AND char_length(name) <= 200
  AND (storage.foldername(name))[1] ~ '^[A-Za-z0-9_-]{3,64}$'
  AND lower(name) ~ '\.(jpe?g|png|gif|webp|heic)$'
);