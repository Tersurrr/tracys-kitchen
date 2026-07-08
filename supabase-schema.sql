-- Tracy's Kitchen - Supabase schema
-- Safe to run in the Supabase SQL Editor for a new or existing project.

create extension if not exists pgcrypto;

-- Categories
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now()
);

alter table public.categories
  alter column id set default gen_random_uuid(),
  alter column created_at set default now(),
  alter column name set not null;

-- Menu items
create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  description text not null default '',
  price numeric(10,2) not null default 0,
  image text,
  available boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.menu_items
  alter column id set default gen_random_uuid(),
  alter column description set default '',
  alter column price set default 0,
  alter column available set default true,
  alter column created_at set default now(),
  alter column name set not null;

-- Orders
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  delivery_type text not null check (delivery_type in ('pickup', 'delivery')),
  special_request text,
  total numeric(10,2) not null default 0,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'preparing', 'ready', 'delivered')),
  created_at timestamptz not null default now()
);

alter table public.orders
  alter column id set default gen_random_uuid(),
  alter column total set default 0,
  alter column status set default 'pending',
  alter column created_at set default now();

-- Order items
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade,
  menu_item_id uuid references public.menu_items(id) on delete set null,
  quantity integer not null default 1 check (quantity > 0),
  price numeric(10,2) not null default 0
);

alter table public.order_items
  alter column id set default gen_random_uuid(),
  alter column quantity set default 1,
  alter column price set default 0;

-- Helpful indexes for joins and admin dashboards.
create index if not exists menu_items_category_id_idx on public.menu_items(category_id);
create index if not exists orders_created_at_idx on public.orders(created_at desc);
create index if not exists order_items_order_id_idx on public.order_items(order_id);

-- PostgreSQL grants used by Supabase's anon/authenticated roles.
grant usage on schema public to anon, authenticated;
grant select on public.categories to anon, authenticated;
grant select on public.menu_items to anon, authenticated;
grant insert on public.orders to anon, authenticated;
grant insert on public.order_items to anon, authenticated;
grant select, insert, update, delete on public.categories to authenticated;
grant select, insert, update, delete on public.menu_items to authenticated;
grant select, update on public.orders to authenticated;
grant select on public.order_items to authenticated;

-- Enable Row Level Security
alter table public.categories enable row level security;
alter table public.menu_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

drop policy if exists "Public can view categories" on public.categories;
drop policy if exists "Authenticated can manage categories" on public.categories;
drop policy if exists "Public can view menu items" on public.menu_items;
drop policy if exists "Authenticated can manage menu items" on public.menu_items;
drop policy if exists "Public can create orders" on public.orders;
drop policy if exists "Authenticated can view orders" on public.orders;
drop policy if exists "Authenticated can update orders" on public.orders;
drop policy if exists "Public can create order items" on public.order_items;
drop policy if exists "Authenticated can view order items" on public.order_items;

-- Public visitors can browse categories and available menu items only.
create policy "Public can view categories"
  on public.categories for select
  using (true);

create policy "Public can view menu items"
  on public.menu_items for select
  using (available = true or auth.role() = 'authenticated');

-- Public visitors can create preorders. They cannot read or update orders.
create policy "Public can create orders"
  on public.orders for insert
  with check (true);

create policy "Public can create order items"
  on public.order_items for insert
  with check (quantity > 0);

-- Authenticated admins can manage operational data.
create policy "Authenticated can manage categories"
  on public.categories for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated can manage menu items"
  on public.menu_items for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated can view orders"
  on public.orders for select
  using (auth.role() = 'authenticated');

create policy "Authenticated can update orders"
  on public.orders for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated can view order items"
  on public.order_items for select
  using (auth.role() = 'authenticated');

-- Storage bucket for food images
insert into storage.buckets (id, name, public)
values ('foods', 'foods', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public can view food images" on storage.objects;
drop policy if exists "Authenticated can upload food images" on storage.objects;
drop policy if exists "Authenticated can update food images" on storage.objects;
drop policy if exists "Authenticated can delete food images" on storage.objects;

create policy "Public can view food images"
  on storage.objects for select
  using (bucket_id = 'foods');

create policy "Authenticated can upload food images"
  on storage.objects for insert
  with check (bucket_id = 'foods' and auth.role() = 'authenticated');

create policy "Authenticated can update food images"
  on storage.objects for update
  using (bucket_id = 'foods' and auth.role() = 'authenticated')
  with check (bucket_id = 'foods' and auth.role() = 'authenticated');

create policy "Authenticated can delete food images"
  on storage.objects for delete
  using (bucket_id = 'foods' and auth.role() = 'authenticated');

-- Optional starter categories. Uncomment/edit if you want to seed a new project.
-- insert into public.categories (name) values
--   ('Rice'), ('Soups'), ('Snacks'), ('Drinks'), ('Desserts')
-- on conflict (name) do nothing;
