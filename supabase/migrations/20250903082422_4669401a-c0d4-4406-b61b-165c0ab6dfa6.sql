-- Create comprehensive database schema for OMPOI Agricultural Commodities Platform

-- User roles enum
CREATE TYPE public.user_role AS ENUM ('farmer', 'trader', 'corporate', 'processor', 'logistics', 'financial_partner');

-- Account types enum  
CREATE TYPE public.account_type AS ENUM ('seller', 'buyer', 'both');

-- Order status enum
CREATE TYPE public.order_status AS ENUM ('pending', 'confirmed', 'quality_check', 'payment_pending', 'shipped', 'delivered', 'cancelled', 'disputed');

-- Quality test types enum
CREATE TYPE public.quality_test_type AS ENUM ('basic', 'advanced', 'premium');

-- Users profiles table
CREATE TABLE public.profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  company_name TEXT,
  phone TEXT,
  address JSONB, -- {street, city, state, country, pincode}
  user_role public.user_role NOT NULL DEFAULT 'farmer',
  account_type public.account_type NOT NULL DEFAULT 'seller',
  verification_status TEXT DEFAULT 'pending', -- pending, verified, rejected
  kyc_documents JSONB, -- Array of document URLs and types
  profile_image_url TEXT,
  preferred_language TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories for agricultural products
CREATE TABLE public.categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  parent_id UUID REFERENCES public.categories(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Agricultural products
CREATE TABLE public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES public.categories(id) NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  specifications JSONB, -- {variety, origin, harvest_date, moisture_content, protein_content, etc}
  grade TEXT, -- W180, W210, etc for cashews
  quality_certifications TEXT[], -- {organic, fair_trade, iso, etc}
  image_urls TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Market listings
CREATE TABLE public.listings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  price_per_unit DECIMAL(10,2) NOT NULL,
  unit TEXT NOT NULL DEFAULT 'kg', -- kg, ton, quintal, etc
  minimum_order DECIMAL(10,2) NOT NULL DEFAULT 1,
  available_quantity DECIMAL(10,2) NOT NULL,
  location JSONB, -- {city, state, coordinates}
  quality_grade TEXT,
  certifications TEXT[],
  images TEXT[],
  is_active BOOLEAN DEFAULT true,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders
CREATE TABLE public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  buyer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  listing_id UUID REFERENCES public.listings(id) NOT NULL,
  quantity DECIMAL(10,2) NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status public.order_status DEFAULT 'pending',
  quality_test_type public.quality_test_type DEFAULT 'basic',
  delivery_address JSONB NOT NULL,
  payment_terms TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quality tests and inspections
CREATE TABLE public.quality_tests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  inspector_id UUID REFERENCES public.profiles(id),
  test_type public.quality_test_type NOT NULL,
  test_results JSONB, -- {moisture, protein, contamination, visual_grade, etc}
  test_images TEXT[],
  certificate_url TEXT,
  status TEXT DEFAULT 'pending', -- pending, in_progress, completed, failed
  scheduled_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Price history for market analytics
CREATE TABLE public.price_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) NOT NULL,
  location TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  unit TEXT NOT NULL DEFAULT 'kg',
  market_source TEXT, -- NCDEX, MCX, local_market, etc
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- News and market insights
CREATE TABLE public.news_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  summary TEXT,
  category TEXT NOT NULL, -- market_update, weather, policy, price_alert
  tags TEXT[],
  image_url TEXT,
  source TEXT,
  author TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages between users
CREATE TABLE public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  recipient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  order_id UUID REFERENCES public.orders(id), -- Optional, for order-related messages
  subject TEXT,
  content TEXT NOT NULL,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications
CREATE TABLE public.notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL, -- price_alert, order_update, quality_result, etc
  data JSONB, -- Additional data for the notification
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quality_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policies for listings
CREATE POLICY "Anyone can view active listings" ON public.listings FOR SELECT USING (is_active = true);
CREATE POLICY "Sellers can manage own listings" ON public.listings FOR ALL USING (seller_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

-- Create policies for orders
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (
  buyer_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()) OR
  listing_id IN (SELECT id FROM public.listings WHERE seller_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()))
);
CREATE POLICY "Buyers can create orders" ON public.orders FOR INSERT WITH CHECK (buyer_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));
CREATE POLICY "Order participants can update orders" ON public.orders FOR UPDATE USING (
  buyer_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()) OR
  listing_id IN (SELECT id FROM public.listings WHERE seller_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()))
);

-- Create policies for quality tests
CREATE POLICY "Order participants can view quality tests" ON public.quality_tests FOR SELECT USING (
  order_id IN (
    SELECT id FROM public.orders WHERE 
    buyer_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()) OR
    listing_id IN (SELECT id FROM public.listings WHERE seller_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()))
  )
);

-- Create policies for messages
CREATE POLICY "Users can view own messages" ON public.messages FOR SELECT USING (
  sender_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()) OR
  recipient_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
);
CREATE POLICY "Users can send messages" ON public.messages FOR INSERT WITH CHECK (sender_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

-- Create policies for notifications
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (user_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (user_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updating timestamps
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_listings_updated_at BEFORE UPDATE ON public.listings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample categories
INSERT INTO public.categories (name, slug, description) VALUES
('Grains', 'grains', 'Cereal grains including wheat, rice, corn'),
('Pulses', 'pulses', 'Dried legumes including lentils, chickpeas, beans'),
('Oilseeds', 'oilseeds', 'Seeds used for oil extraction'),
('Nuts', 'nuts', 'Tree nuts and groundnuts'),
('Spices', 'spices', 'Culinary and medicinal spices'),
('Fruits', 'fruits', 'Fresh and dried fruits'),
('Vegetables', 'vegetables', 'Fresh vegetables and root crops'),
('Cotton', 'cotton', 'Raw cotton and cotton products'),
('Sugar', 'sugar', 'Sugarcane and sugar products'),
('Coffee', 'coffee', 'Coffee beans and products'),
('Tea', 'tea', 'Tea leaves and products');

-- Insert sample products for cashews
INSERT INTO public.products (category_id, name, description, specifications, grade) VALUES
((SELECT id FROM public.categories WHERE slug = 'nuts'), 'Raw Cashew Nuts', 'Premium quality raw cashew nuts from Goa', '{"origin": "Goa", "variety": "Local", "harvest_season": "March-May"}', 'RCN'),
((SELECT id FROM public.categories WHERE slug = 'nuts'), 'Cashew Kernels W180', 'Premium white whole cashew kernels', '{"origin": "Goa", "grade": "W180", "moisture": "5%", "broken": "<5%"}', 'W180'),
((SELECT id FROM public.categories WHERE slug = 'nuts'), 'Cashew Kernels W210', 'Quality white whole cashew kernels', '{"origin": "Karnataka", "grade": "W210", "moisture": "5%", "broken": "<5%"}', 'W210'),
((SELECT id FROM public.categories WHERE slug = 'nuts'), 'Cashew Kernels W240', 'Standard white whole cashew kernels', '{"origin": "Kerala", "grade": "W240", "moisture": "5%", "broken": "<5%"}', 'W240'),
((SELECT id FROM public.categories WHERE slug = 'nuts'), 'Cashew Kernels W320', 'Small white whole cashew kernels', '{"origin": "Tamil Nadu", "grade": "W320", "moisture": "5%", "broken": "<5%"}', 'W320');

-- Insert sample news articles
INSERT INTO public.news_articles (title, content, summary, category, tags, source, author) VALUES
('Cashew Prices Rise 15% This Quarter', 'Cashew prices have seen a significant uptick due to reduced supply from major producing regions...', 'Market analysis shows sustained price growth for cashew products', 'market_update', '{"cashew", "price", "market"}', 'OMPOI Market Intelligence', 'Market Analyst'),
('Monsoon Forecast Positive for Kharif Crops', 'The India Meteorological Department predicts above-normal rainfall this monsoon season...', 'Favorable weather conditions expected to boost crop yields', 'weather', '{"monsoon", "kharif", "forecast"}', 'IMD', 'Weather Team'),
('New Export Regulations for Agricultural Products', 'The government has announced new quality standards for agricultural exports...', 'Updated compliance requirements for exporters', 'policy', '{"export", "regulations", "compliance"}', 'Ministry of Agriculture', 'Policy Team');