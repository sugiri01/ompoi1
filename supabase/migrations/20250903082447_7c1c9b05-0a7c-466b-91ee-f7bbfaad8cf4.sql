-- Fix security issues by enabling RLS on remaining tables and updating function

-- Enable RLS on tables that were missing it
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.price_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;

-- Create policies for categories (public read access)
CREATE POLICY "Anyone can view categories" ON public.categories FOR SELECT USING (true);

-- Create policies for products (public read access)
CREATE POLICY "Anyone can view products" ON public.products FOR SELECT USING (true);

-- Create policies for price_history (public read access for market data)
CREATE POLICY "Anyone can view price history" ON public.price_history FOR SELECT USING (true);

-- Create policies for news_articles (public read access)
CREATE POLICY "Anyone can view news articles" ON public.news_articles FOR SELECT USING (true);

-- Fix function search path issue
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;