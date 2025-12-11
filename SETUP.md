# Instrucțiuni de instalare și configurare

## Cerințe

- Node.js (v18 sau mai nou)
- MySQL (v8.0 sau mai nou)
- npm sau yarn

## Pași de instalare

### 1. Instalare dependențe Angular

```bash
npm install
```

### 2. Configurare MySQL

1. Deschide MySQL și conectează-te:
```bash
mysql -u root -p
```

2. Rulează scriptul SQL pentru a crea baza de date:
```bash
mysql -u root -p < server/database.sql
```

Sau copiază și rulează manual conținutul din `server/database.sql` în MySQL.

### 3. Configurare backend

1. Creează fișierul `.env` în folderul `server/`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=parola_ta_mysql
DB_NAME=fashion_shop

PORT=3000
NODE_ENV=development
```

2. Instalează dependențele backend (dacă nu sunt deja instalate):
```bash
cd server
npm install
cd ..
```

### 4. Pornire aplicație

**Terminal 1 - Backend API:**
```bash
cd server
npm start
```

Serverul backend va rula pe `http://localhost:3000`

**Terminal 2 - Frontend Angular:**
```bash
npm start
```

Aplicația Angular va rula pe `http://localhost:4200`

### 5. Verificare

1. Deschide `http://localhost:3000/api/health` pentru a verifica dacă backend-ul rulează
2. Deschide `http://localhost:4200` pentru a accesa aplicația

## Structura proiectului

```
├── server/                 # Backend Node.js/Express
│   ├── config/            # Configurare baza de date
│   ├── routes/            # Rute API
│   ├── database.sql       # Script creare baza de date
│   └── server.js          # Punct de intrare backend
├── src/                   # Frontend Angular
│   ├── app/
│   │   ├── core/          # Servicii și modele
│   │   ├── pages/         # Componente pagini
│   │   └── shared/        # Componente partajate
│   └── environments/      # Configurare environment
└── package.json
```

## Funcționalități implementate

✅ Baza de date MySQL cu 2 tabele (items, categories) și relații
✅ Backend API Node.js/Express cu CRUD complet
✅ Frontend Angular cu servicii HTTP
✅ Componente pentru listare, detalii, adăugare, editare, ștergere
✅ Căutare și filtrare produse
✅ Sortare produse
✅ Loader vizual pentru requests
✅ Mesaje de succes/eroare
✅ Routing funcțional cu navigare

## Configurare producție

Pentru producție:

1. Actualizează `src/environments/environment.prod.ts` cu URL-ul API-ului de producție
2. Schimbă `NODE_ENV=production` în `.env`
3. Build Angular: `npm run build`
4. Configurează serverul web (nginx/apache) pentru a servi aplicația

## Suport

Pentru probleme, verifică:
- MySQL rulează și este accesibil
- Porturile 3000 și 4200 nu sunt ocupate
- Configurarea `.env` este corectă
- Baza de date a fost creată cu succes


