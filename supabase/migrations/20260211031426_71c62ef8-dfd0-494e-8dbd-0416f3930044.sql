
-- Fix notifications insert policy to be more restrictive
DROP POLICY "System can insert notifications" ON public.notifications;
CREATE POLICY "Admins can insert notifications" ON public.notifications FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'super_admin'::app_role) OR has_role(auth.uid(), 'cafeteria_admin'::app_role) OR auth.uid() = user_id);
