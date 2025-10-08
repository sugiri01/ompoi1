-- Remove the problematic policies that cause infinite recursion
DROP POLICY IF EXISTS "Buyers visible for order fulfillment" ON public.profiles;
DROP POLICY IF EXISTS "Sellers visible during transactions" ON public.profiles;

-- The remaining policies on profiles table are safe and should stay:
-- "Users can view own profile" - using auth.uid() = user_id
-- "Users can update own profile" - using auth.uid() = user_id  
-- "Users can insert own profile" - using auth.uid() = user_id

-- These policies were causing circular references with orders/listings tables
-- and should be handled in application layer instead