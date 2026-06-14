
DROP POLICY IF EXISTS "Anyone can submit an order" ON public.orders;

CREATE POLICY "Anyone can submit an order"
ON public.orders
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(ref) BETWEEN 3 AND 64
  AND char_length(customer_name) BETWEEN 1 AND 120
  AND char_length(customer_phone) BETWEEN 6 AND 32
  AND char_length(city) BETWEEN 1 AND 80
  AND char_length(address) BETWEEN 3 AND 400
  AND (note IS NULL OR char_length(note) <= 1000)
  AND total_mad > 0
  AND total_mad <= 1000000
  AND payment_mode IN ('cod', 'wire')
  AND lang IN ('fr', 'ar')
  AND status = 'new'
  AND proof_url IS NULL
  AND jsonb_typeof(items) = 'array'
  AND jsonb_array_length(items) BETWEEN 1 AND 50
);

DROP POLICY IF EXISTS "Anyone can upload an order proof" ON storage.objects;

CREATE POLICY "Anyone can upload an order proof"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (
  bucket_id = 'order-proofs'
  AND (storage.foldername(name))[1] ~ '^[A-Za-z0-9_-]{3,64}$'
  AND char_length(name) <= 200
);
