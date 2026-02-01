# Ghid de Debugging pentru Supabase

## Pași pentru a verifica de ce nu se încarcă produsele

### 1. Verifică consola browserului
Deschide Developer Tools (F12) și verifică tab-ul Console pentru:
- Mesaje de eroare
- Log-uri care încep cu "✅" sau "❌"
- Erori de rețea în tab-ul Network

### 2. Verifică dacă tabelul există în Supabase

1. Accesează: https://supabase.com/dashboard/project/rptjcilhsoparwfrwcxl
2. Mergi la **Table Editor** în panoul stâng
3. Verifică dacă există un tabel numit `items`

### 3. Verifică dacă tabelul conține date

1. În **Table Editor**, click pe tabelul `items`
2. Verifică dacă există rânduri în tabel
3. Dacă nu există, rulează scriptul SQL din `supabase_setup.sql`

### 4. Verifică Row Level Security (RLS)

1. Mergi la **Authentication** > **Policies** în panoul stâng
2. Selectează tabelul `items`
3. Verifică dacă există o politică care permite SELECT pentru toți utilizatorii
4. Dacă nu există, creează una:

```sql
CREATE POLICY "Allow public read access" ON items
  FOR SELECT
  USING (true);
```

### 5. Verifică structura tabelului

Tabelul `items` trebuie să aibă următoarele coloane:
- `id` (TEXT, PRIMARY KEY)
- `title` (TEXT, NOT NULL)
- `category` (TEXT, nullable)
- `price` (NUMERIC, NOT NULL)
- `image` (TEXT, NOT NULL)
- `description` (TEXT, nullable)
- `availableSizes` (JSONB, nullable)
- `stock` (INTEGER, default 0)

### 6. Testează conexiunea directă

Rulează următoarea interogare în SQL Editor din Supabase:

```sql
SELECT COUNT(*) FROM items;
```

Dacă returnează 0, înseamnă că tabelul este gol și trebuie să inserezi date.

### 7. Verifică erorile comune

#### Eroare: "relation 'items' does not exist"
**Soluție:** Tabelul nu există. Rulează scriptul SQL din `supabase_setup.sql`

#### Eroare: "new row violates row-level security policy"
**Soluție:** RLS este activat dar nu există politică pentru SELECT. Creează politica de mai sus.

#### Eroare: "permission denied for table items"
**Soluție:** Verifică dacă cheia anon key este corectă în `environment.ts`

#### Nu există erori dar datele sunt goale
**Soluție:** Tabelul este gol. Inserează date folosind scriptul SQL.

### 8. Rezolvare rapidă

Dacă vrei să rezolvi rapid, rulează următorul script SQL complet în Supabase:

```sql
-- 1. Creează tabelul dacă nu există
CREATE TABLE IF NOT EXISTS items (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  price NUMERIC NOT NULL,
  image TEXT NOT NULL,
  description TEXT,
  "availableSizes" JSONB,
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Activează RLS
ALTER TABLE items ENABLE ROW LEVEL SECURITY;

-- 3. Șterge politica veche dacă există
DROP POLICY IF EXISTS "Allow public read access" ON items;

-- 4. Creează politica pentru citire publică
CREATE POLICY "Allow public read access" ON items
  FOR SELECT
  USING (true);

-- 5. Șterge datele vechi (opțional)
-- DELETE FROM items;

-- 6. Inserează datele
INSERT INTO items (id, title, category, price, image, description, "availableSizes", stock) VALUES
('1', 'Sacou business din lână', 'Bărbați', 980, 'https://www.don-men.com/image/cache/catalog/haine/sacou-lana-gri-don-dionisio-2000x2000.jpg', 'Sacou slim fit din lână merinos, ideal pentru întâlniri de business și evenimente formale.', '["48", "50", "52"]'::jsonb, 8),
('2', 'Rochie midi vaporoasă', 'Femei', 620, 'https://www.clessidra.ro/5471-large_default/rochie-midi-vaporoasa-delia-black.jpg', 'Rochie din voal cu imprimeu floral, perfectă pentru evenimente de zi sau seri relaxate.', '["S", "M", "L"]'::jsonb, 15),
('3', 'Tricou din bumbac organic', 'Unisex', 150, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvob7_oIWjsYJKCByLTqBihSAZVSBCjBTSMw&s', 'Tricou respirabil, 100% bumbac organic, disponibil în culori neutre.', '["S", "M", "L", "XL"]'::jsonb, 42),
('4', 'Geacă parka impermeabilă', 'Outdoor', 780, 'https://fdcdn.akamaized.net/m/390x585/products/59771/59770333/images/res_869e0e1afbd563096201d1a2ecbf4b20.jpg?s=bNlfzHcoPAay', 'Geacă parka căptușită, cu tratament impermeabil și glugă detasabilă.', '["M", "L", "XL"]'::jsonb, 5),
('5', 'Sneakers eco-friendly', 'Încălțăminte', 540, 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg', 'Pantofi sport realizați din materiale reciclate, cu talpă flexibilă.', '["38", "39", "40", "41", "42"]'::jsonb, 27),
('6', 'Rucsac urban din piele', 'Accesorii', 450, 'https://urbanbag.ro/media/catalog/product/cache/10756355385beac3ab1caaac34559d3c/r/u/rucsac-din-piele-naturala-the-explorer-by-dece-_-maro-1.jpeg', 'Rucsac minimalist din piele naturală, cu compartimente pentru laptop și accesorii.', '[]'::jsonb, 19),
('7', 'Pantaloni chino clasici', 'Bărbați', 320, 'https://www.bman.ro/cdn/shop/files/3_e7627eb0-b0f6-462b-8938-b7f1cac62728.jpg?v=1728045959', 'Pantaloni chino din bumbac de calitate, cu tăietură clasică, potriviți pentru birou și casual.', '["46", "48", "50", "52", "54"]'::jsonb, 24),
('8', 'Bluză cu mâneci lungi', 'Femei', 280, 'https://cdn12.avanticart.ro/foggi.ro/pictures/bluza-casual-de-dama-cu-maneci-lungi-din-bumbac-aly-burgundy-105298-2.webp', 'Bluză elegantă din material premium, cu mâneci lungi și tăietură feminină.', '["XS", "S", "M", "L"]'::jsonb, 18),
('9', 'Geantă de mână din piele', 'Accesorii', 680, 'https://www.besso.ro/continut/produse/60/1500/geanta-de-mana-din-piele-naturala-dolce-eleganza-roz_981.webp', 'Geantă de mână elegantă din piele naturală, cu interior compartimentat și fermoar sigur.', '[]'::jsonb, 12),
('10', 'Blugi skinny fit', 'Unisex', 390, 'https://static.mohito.com/media/catalog/product/cache/1200/a4e40ebdc3e371adff845072e1c73f37/6/6/6647Y-55J-004-1-786027_5.jpg', 'Blugi din denim premium, cu tăietură skinny fit, spălați cu efect de uzură naturală.', '["28", "30", "32", "34", "36", "38"]'::jsonb, 35),
('11', 'Ghete de piele clasice', 'Încălțăminte', 850, 'https://cdn20.avanticart.ro/epielenaturala.ro/pictures/ghete-scurte-dama-piele-naturala-negre-clasice-cu-inchidere-sireturi-pol250-83317-4.webp', 'Ghete elegante din piele naturală, cu talpă din cauciuc și șireturi din piele, perfecte pentru birou.', '["39", "40", "41", "42", "43", "44"]'::jsonb, 14),
('12', 'Vestă termică pentru iarnă', 'Outdoor', 420, 'https://api.soling.md/media/productsimage/DSC_5202.webp', 'Vestă termică ușoară, perfectă pentru sezonul rece, cu umplutură sintetică de înaltă calitate.', '["S", "M", "L", "XL", "XXL"]'::jsonb, 21)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  price = EXCLUDED.price,
  image = EXCLUDED.image,
  description = EXCLUDED.description,
  "availableSizes" = EXCLUDED."availableSizes",
  stock = EXCLUDED.stock,
  updated_at = NOW();

-- 7. Verifică datele
SELECT COUNT(*) as total_items FROM items;
```

### 9. După ce ai rezolvat problema

1. Reîncarcă pagina în browser (F5 sau Ctrl+R)
2. Verifică consola pentru mesajele "✅ Produse încărcate"
3. Produsele ar trebui să apară în pagină

### 10. Contact

Dacă problema persistă după ce ai urmat pașii de mai sus, verifică:
- Credențialele Supabase în `src/environments/environment.ts`
- Dacă proiectul Supabase este activ
- Dacă există restricții de rețea (firewall, VPN)




