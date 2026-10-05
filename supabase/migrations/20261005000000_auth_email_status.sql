-- Lets the sign-in window explain a failed sign-in instead of a generic "email and password don't match".
-- Returns one of:
--   'none'        no account uses this email
--   'oauth'       the account signs in with Google only (no password set)
--   'unconfirmed' the account exists but its email link hasn't been clicked yet
--   'password'    a confirmed email + password account exists (so the password was wrong)
-- Trade-off: anyone can learn whether an email has an account. Fine for a guesthouse site.
create or replace function public.auth_email_status(p_email text)
returns text
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_user auth.users%rowtype;
begin
  select * into v_user from auth.users where lower(email) = lower(trim(p_email)) limit 1;
  if not found then
    return 'none';
  end if;
  if not exists (select 1 from auth.identities i where i.user_id = v_user.id and i.provider = 'email') then
    return 'oauth';
  end if;
  if v_user.email_confirmed_at is null then
    return 'unconfirmed';
  end if;
  return 'password';
end;
$$;

revoke all on function public.auth_email_status(text) from public;
grant execute on function public.auth_email_status(text) to anon, authenticated;
