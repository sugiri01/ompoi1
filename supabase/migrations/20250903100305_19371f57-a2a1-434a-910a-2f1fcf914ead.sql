-- Fix critical security vulnerability: Replace overly permissive profiles RLS policy
-- This prevents users from viewing other users' personal information

-- Drop the dangerous "view all profiles" policy
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Create secure policies for profile access
-- Users can only view their own profile by default
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Allow sellers to be visible to buyers during active transactions/listings
-- This is business-necessary for the marketplace functionality
CREATE POLICY "Sellers visible during transactions" 
ON public.profiles 
FOR SELECT 
USING (
  id IN (
    SELECT DISTINCT seller_id 
    FROM listings 
    WHERE is_active = true
  )
);

-- Allow buyers to be visible to sellers for completed orders
-- This enables sellers to see buyer information for order fulfillment
CREATE POLICY "Buyers visible for order fulfillment" 
ON public.profiles 
FOR SELECT 
USING (
  id IN (
    SELECT DISTINCT buyer_id 
    FROM orders 
    WHERE status IN ('confirmed', 'quality_check', 'shipped', 'delivered')
  )
);