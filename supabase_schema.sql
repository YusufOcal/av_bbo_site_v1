-- BBO Legal - Supabase Tablo & Güvenlik Politikası Kurulumu
-- Bu SQL kodunu Supabase Dashboard > SQL Editor sekmesine yapıştırıp "Run" butonuna basınız.

-- 1. İçerik Tablosunu Oluştur
create table if not exists public.site_content (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz default now()
);

-- 2. Row Level Security (RLS) Aktifleştir
alter table public.site_content enable row level security;

-- 3. Ziyaretçiler İçin Okuma Politikası (Herkes güncel içeriği okuyabilir)
drop policy if exists "Public read site_content" on public.site_content;
create policy "Public read site_content"
  on public.site_content
  for select
  using (true);

-- 4. Panel İçin Yazma & Güncelleme Politikası
drop policy if exists "Allow anon update site_content" on public.site_content;
create policy "Allow anon update site_content"
  on public.site_content
  for update
  using (true)
  with check (true);

drop policy if exists "Allow anon insert site_content" on public.site_content;
create policy "Allow anon insert site_content"
  on public.site_content
  for insert
  with check (true);

-- 5. Başarı Kontrolü
comment on table public.site_content is 'BBO Legal web sitesi dinamik metin ve makale içerikleri tablosu';
