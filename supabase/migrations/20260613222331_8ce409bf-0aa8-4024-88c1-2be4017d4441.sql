
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ref TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  city TEXT NOT NULL,
  address TEXT NOT NULL,
  note TEXT,
  items JSONB NOT NULL,
  total_mad INTEGER NOT NULL,
  payment_mode TEXT NOT NULL,
  lang TEXT NOT NULL DEFAULT 'fr',
  source TEXT,
  proof_url TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.orders TO anon, authenticated;
GRANT ALL ON public.orders TO service_role;

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an order"
ON public.orders FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Service role full access"
ON public.orders FOR ALL
TO service_role
USING (true) WITH CHECK (true);

CREATE INDEX orders_created_at_idx ON public.orders (created_at DESC);
