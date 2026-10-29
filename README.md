# Next.js + Supabase - Ejemplo Mínimo

## Archivos necesarios

```
next-supabase-example/
├── package.json
├── next.config.js
├── .env.local          (crea desde .env.local.example)
├── lib/
│   └── supabase.js
└── app/
    └── page.js
```

---

## 1. Conectar Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com)
2. Ve a **Settings → API** y copia:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Crea `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima
```

---

## 2. Crear tabla y datos de prueba

En el **SQL Editor** de Supabase, ejecuta:

```sql
create table productos (
  id bigint generated always as identity primary key,
  nombre text not null,
  precio numeric(10,2) not null
);

insert into productos (nombre, precio) values
  ('Laptop', 999.99),
  ('Mouse', 29.99);
```

---

## 3. Instalar y ejecutar

```bash
cd next-supabase-example
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

---

## Cómo funciona

- `lib/supabase.js`: Crea el cliente de Supabase con tus credenciales
- `app/page.js`: **Server Component** que ejecuta la consulta en el servidor
- `supabase.from('productos').select('nombre, precio')`: Obtiene datos de la tabla
- Next.js renderiza el HTML con los datos ya incluidos (SSR)

---

## Flujo de datos

```
Navegador → Next.js Server → Supabase (PostgreSQL) → Next.js → HTML → Navegador
```

La clave: `async/await` en un **Server Component** (por defecto en App Router) permite leer la BD directamente sin API routes ni `useEffect`.