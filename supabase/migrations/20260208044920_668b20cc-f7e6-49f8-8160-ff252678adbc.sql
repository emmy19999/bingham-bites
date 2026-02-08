
-- Fix permissive INSERT policy on order_status_logs
DROP POLICY "System can insert logs" ON public.order_status_logs;

CREATE POLICY "Users can insert own order logs"
  ON public.order_status_logs FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_status_logs.order_id AND orders.user_id = auth.uid())
    OR public.has_role(auth.uid(), 'super_admin')
    OR public.has_role(auth.uid(), 'cafeteria_admin')
  );
