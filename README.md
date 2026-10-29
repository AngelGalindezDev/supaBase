# Next.js + Supabase - Ejemplo Mínimo (TypeScript)

## Archivos necesarios

```
next-supabase-example/
├── package.json
├── tsconfig.json
├── .env.local          (crea desde .env.local.example)
├── lib/
│   └── supabase/
│       ├── server.ts
│       └── client.ts
├── app/
│   ├── layout.ts
│   └── page.ts
└── next.config.js
```

---

## 1. Conectar Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com)
2. Ve a **Settings → API** y copia:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Crea `.env.local` en la raíz:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=tu_clave_anonima
```

> Nota: `@supabase/ssr` espera `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Si tu dashboard muestra `ANON_KEY`, usa ese mismo valor.

---

## 2. Crear tabla y datos de prueba

En el **SQL Editor** de Supabase:

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

- `lib/supabase/server.ts`: Crea el cliente de Supabase para Server Components usando cookies (`createServerClient`)
- `app/page.ts`: Server Component `async` que consulta `productos` directamente desde Supabase
- `supabase.from('productos').select('nombre, precio')`: Obtiene datos de la tabla
- Next.js renderiza el HTML con los datos (SSR), sin necesidad de `useEffect` ni API Routes

---

## Flujo de datos

```
Navegador → Next.js Server → Supabase (PostgreSQL) → Next.js → HTML → Navegador
```