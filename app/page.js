import { supabase } from '../lib/supabase'

export default async function Home() {
  const { data: productos, error } = await supabase
    .from('productos')
    .select('nombre, precio')

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <h1>Productos</h1>
      {productos?.length === 0 ? (
        <p>No hay productos</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {productos.map((p) => (
            <li key={p.nombre} style={{ margin: '10px 0' }}>
              <strong>{p.nombre}</strong> - ${p.precio}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}