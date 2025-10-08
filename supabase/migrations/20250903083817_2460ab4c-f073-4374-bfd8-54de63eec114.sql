-- Phase 2-6: Comprehensive Database Schema for OMPOI Platform

-- Enhanced Products with detailed specifications
ALTER TABLE products ADD COLUMN IF NOT EXISTS processing_type TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS harvest_season TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS shelf_life_days INTEGER;

-- Commodity grades and certifications
CREATE TABLE IF NOT EXISTS commodity_grades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  grade_code TEXT NOT NULL, -- W180, W210, W240, etc.
  grade_name TEXT NOT NULL,
  size_range TEXT,
  moisture_content DECIMAL(4,2),
  defect_tolerance DECIMAL(4,2),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  issuing_authority TEXT,
  validity_period_months INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Farm Management Module
CREATE TABLE IF NOT EXISTS farms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  location JSONB NOT NULL, -- lat, lng, address
  total_area DECIMAL(10,2) NOT NULL, -- in acres
  soil_type TEXT,
  irrigation_type TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS crop_planning (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farm_id UUID REFERENCES farms(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  planned_area DECIMAL(10,2),
  planting_date DATE,
  expected_harvest_date DATE,
  expected_yield DECIMAL(10,2),
  status TEXT DEFAULT 'planned', -- planned, planted, growing, harvested
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS farm_inputs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farm_id UUID REFERENCES farms(id) ON DELETE CASCADE,
  input_type TEXT NOT NULL, -- seeds, fertilizer, pesticide
  input_name TEXT NOT NULL,
  quantity DECIMAL(10,2),
  unit TEXT,
  cost DECIMAL(12,2),
  supplier TEXT,
  application_date DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Processing & Value Addition
CREATE TABLE IF NOT EXISTS processing_facilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  operator_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  facility_type TEXT NOT NULL, -- warehouse, processing_unit, cold_storage
  location JSONB NOT NULL,
  capacity DECIMAL(15,2),
  capacity_unit TEXT DEFAULT 'MT',
  certifications TEXT[],
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS processing_batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id UUID REFERENCES processing_facilities(id),
  batch_number TEXT UNIQUE NOT NULL,
  product_id UUID REFERENCES products(id),
  raw_material_quantity DECIMAL(12,2),
  processed_quantity DECIMAL(12,2),
  processing_date DATE,
  quality_grade TEXT,
  status TEXT DEFAULT 'in_progress', -- in_progress, completed, rejected
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Logistics & Warehousing
CREATE TABLE IF NOT EXISTS warehouses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  location JSONB NOT NULL,
  total_capacity DECIMAL(15,2), -- in MT
  available_capacity DECIMAL(15,2),
  storage_conditions JSONB, -- temperature, humidity ranges
  certifications TEXT[],
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS inventory_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  warehouse_id UUID REFERENCES warehouses(id),
  product_id UUID REFERENCES products(id),
  movement_type TEXT NOT NULL, -- inbound, outbound, transfer
  quantity DECIMAL(12,2),
  batch_number TEXT,
  movement_date TIMESTAMPTZ DEFAULT now(),
  reference_order_id UUID REFERENCES orders(id),
  notes TEXT
);

-- Financial Services
CREATE TABLE IF NOT EXISTS payment_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  payer_id UUID REFERENCES profiles(id),
  payee_id UUID REFERENCES profiles(id),
  amount DECIMAL(15,2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  payment_method TEXT, -- stripe, razorpay, bank_transfer
  transaction_id TEXT,
  status TEXT DEFAULT 'pending', -- pending, completed, failed, refunded
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS trade_financing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  borrower_id UUID REFERENCES profiles(id),
  loan_amount DECIMAL(15,2),
  interest_rate DECIMAL(5,2),
  loan_purpose TEXT,
  repayment_period_months INTEGER,
  collateral_details JSONB,
  status TEXT DEFAULT 'applied', -- applied, approved, disbursed, closed
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Market Intelligence & Analytics
CREATE TABLE IF NOT EXISTS market_intelligence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  market_location TEXT,
  average_price DECIMAL(10,2),
  price_trend TEXT, -- increasing, decreasing, stable
  demand_level TEXT, -- high, medium, low
  supply_level TEXT, -- surplus, balanced, shortage
  analysis_date DATE,
  data_sources TEXT[],
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS price_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  product_id UUID REFERENCES products(id),
  target_price DECIMAL(10,2),
  alert_type TEXT, -- above, below
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Communication & Collaboration
CREATE TABLE IF NOT EXISTS user_communications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES profiles(id),
  recipient_id UUID REFERENCES profiles(id),
  message_type TEXT, -- chat, sms, whatsapp, email
  content TEXT,
  attachments TEXT[],
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Quality Management & Compliance
CREATE TABLE IF NOT EXISTS quality_inspections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  inspector_id UUID REFERENCES profiles(id),
  inspection_type TEXT, -- pre_shipment, post_delivery, routine
  quality_parameters JSONB, -- moisture, foreign_matter, defects, etc.
  inspection_result TEXT, -- passed, failed, conditional
  certificate_url TEXT,
  inspection_date TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE commodity_grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE farms ENABLE ROW LEVEL SECURITY;
ALTER TABLE crop_planning ENABLE ROW LEVEL SECURITY;
ALTER TABLE farm_inputs ENABLE ROW LEVEL SECURITY;
ALTER TABLE processing_facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE processing_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE warehouses ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE trade_financing ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_intelligence ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE quality_inspections ENABLE ROW LEVEL SECURITY;

-- RLS policies for key tables
CREATE POLICY "Users can view their own farms" ON farms
  FOR SELECT USING (farmer_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can create their own farms" ON farms
  FOR INSERT WITH CHECK (farmer_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

CREATE POLICY "Anyone can view certifications" ON certifications
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view commodity grades" ON commodity_grades
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view market intelligence" ON market_intelligence
  FOR SELECT USING (true);

CREATE POLICY "Users can view their own price alerts" ON price_alerts
  FOR SELECT USING (user_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can manage their own price alerts" ON price_alerts
  FOR ALL USING (user_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

-- Add updated_at triggers
CREATE TRIGGER update_farms_updated_at
  BEFORE UPDATE ON farms
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO certifications (name, description, issuing_authority, validity_period_months) VALUES
  ('Organic', 'Certified organic farming practices', 'India Organic Certification Agency', 12),
  ('Fair Trade', 'Fair trade practices certification', 'Fair Trade India', 24),
  ('ISO 22000', 'Food safety management system', 'ISO', 36),
  ('HACCP', 'Hazard Analysis Critical Control Points', 'FSSAI', 12);

INSERT INTO commodity_grades (product_id, grade_code, grade_name, size_range, moisture_content, defect_tolerance) 
SELECT p.id, 'W180', 'Premium White', '180 pieces/lb', 5.0, 2.0
FROM products p WHERE p.name LIKE '%Cashew%' LIMIT 1;

INSERT INTO commodity_grades (product_id, grade_code, grade_name, size_range, moisture_content, defect_tolerance)
SELECT p.id, 'W210', 'Standard White', '210 pieces/lb', 5.0, 3.0
FROM products p WHERE p.name LIKE '%Cashew%' LIMIT 1;