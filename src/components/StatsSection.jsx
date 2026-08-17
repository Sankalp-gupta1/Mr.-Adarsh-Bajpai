import { motion } from 'framer-motion'

const stats = [
  { num: '∞', lbl: 'Bakchodi ki koi limit nahi' },
  { num: '100%', lbl: 'Tagda energy, hamesha' },
  { num: '1st', lbl: 'Number ka dost, hamesha se' },
  { num: '24/7', lbl: 'Support on-call, bina fail' },
]

export default function StatsSection() {
  return (
    <section className="hype" id="hype">
      <div className="scene-label h2c">✦ Scene 02 — Hisaab Kitaab ✦</div>
      <h2 className="section-title">Dosti ka <em>score-card</em></h2>
      <div className="stat-grid">
        {stats.map((s, i) => (
          <motion.div
            className="stat-card"
            key={s.lbl}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
          >
            <div className="num">{s.num}</div>
            <div className="lbl">{s.lbl}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
