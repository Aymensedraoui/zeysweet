
CREATE POLICY "Anyone can upload an order proof"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'order-proofs');
