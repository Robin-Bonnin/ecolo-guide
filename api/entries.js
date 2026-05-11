import { neon } from '@neondatabase/serverless'

export default async function handler(req, res) {
  const sql = neon(process.env.DATABASE_URL)
  const isAdmin = req.headers['x-admin-password'] === process.env.ADMIN_PASSWORD
  if (req.method === 'GET') {
    const rows = isAdmin
      ? await sql`select * from entries order by title`
      : await sql`select * from entries where published=true order by title`
    return res.status(200).json(rows)
  }
  if (!isAdmin) return res.status(401).json({ error: 'Non autorisé' })
  if (req.method === 'POST') {
    const b = req.body
    const rows = await sql`
      insert into entries (title,cat,city,addr,lat,lng,descr,cost,subtags,link,published)
      values (${b.title},${b.cat},${b.city||['Bangkok']},${b.addr},${b.lat||13.75},${b.lng||100.52},
              ${b.desc||b.descr},${b.cost},${b.subtags||[]},${b.link},${b.published!==false})
      returning *`
    return res.status(200).json(rows[0])
  }
  if (req.method === 'PATCH') {
    const b = req.body
    await sql`update entries set title=${b.title},cat=${b.cat},city=${b.city},
      addr=${b.addr},descr=${b.desc||b.descr},cost=${b.cost},subtags=${b.subtags||[]},
      link=${b.link},published=${b.published!==false},updated_at=now() where id=${b.id}`
    return res.status(200).json({ success: true })
  }
  res.status(405).end()
}
