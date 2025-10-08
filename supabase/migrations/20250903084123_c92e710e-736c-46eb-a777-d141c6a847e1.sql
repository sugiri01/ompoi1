-- Fix security issues: Add missing RLS policies for new tables

-- Crop planning policies
CREATE POLICY "Users can view crop planning for their farms" ON crop_planning
  FOR SELECT USING (farm_id IN (SELECT id FROM farms WHERE farmer_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())));

CREATE POLICY "Users can manage crop planning for their farms" ON crop_planning
  FOR ALL USING (farm_id IN (SELECT id FROM farms WHERE farmer_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())));

-- Farm inputs policies
CREATE POLICY "Users can view inputs for their farms" ON farm_inputs
  FOR SELECT USING (farm_id IN (SELECT id FROM farms WHERE farmer_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())));

CREATE POLICY "Users can manage inputs for their farms" ON farm_inputs
  FOR ALL USING (farm_id IN (SELECT id FROM farms WHERE farmer_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())));

-- Processing facilities policies
CREATE POLICY "Users can view their own processing facilities" ON processing_facilities
  FOR SELECT USING (operator_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can manage their own processing facilities" ON processing_facilities
  FOR ALL USING (operator_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

-- Processing batches policies
CREATE POLICY "Facility operators can view their batches" ON processing_batches
  FOR SELECT USING (facility_id IN (SELECT id FROM processing_facilities WHERE operator_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())));

CREATE POLICY "Facility operators can manage their batches" ON processing_batches
  FOR ALL USING (facility_id IN (SELECT id FROM processing_facilities WHERE operator_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())));

-- Warehouses policies
CREATE POLICY "Users can view their own warehouses" ON warehouses
  FOR SELECT USING (owner_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can manage their own warehouses" ON warehouses
  FOR ALL USING (owner_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

-- Inventory movements policies
CREATE POLICY "Warehouse owners can view inventory movements" ON inventory_movements
  FOR SELECT USING (warehouse_id IN (SELECT id FROM warehouses WHERE owner_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())));

CREATE POLICY "Warehouse owners can manage inventory movements" ON inventory_movements
  FOR ALL USING (warehouse_id IN (SELECT id FROM warehouses WHERE owner_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())));

-- Payment transactions policies
CREATE POLICY "Users can view their payment transactions" ON payment_transactions
  FOR SELECT USING (payer_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()) OR payee_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can create payment transactions" ON payment_transactions
  FOR INSERT WITH CHECK (payer_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

-- Trade financing policies
CREATE POLICY "Users can view their own trade financing" ON trade_financing
  FOR SELECT USING (borrower_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can manage their own trade financing" ON trade_financing
  FOR ALL USING (borrower_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

-- User communications policies
CREATE POLICY "Users can view their communications" ON user_communications
  FOR SELECT USING (sender_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()) OR recipient_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can send communications" ON user_communications
  FOR INSERT WITH CHECK (sender_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

-- Quality inspections policies
CREATE POLICY "Order participants can view quality inspections" ON quality_inspections
  FOR SELECT USING (order_id IN (SELECT id FROM orders WHERE buyer_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()) OR listing_id IN (SELECT id FROM listings WHERE seller_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()))));

CREATE POLICY "Inspectors can manage quality inspections" ON quality_inspections
  FOR ALL USING (inspector_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));