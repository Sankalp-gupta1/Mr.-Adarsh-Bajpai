import { motion } from 'framer-motion'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045 } },
}
const letter = {
  hidden: { opacity: 0, y: 60, rotate: 8 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] },
  },
}

export default function KineticTitle({ text }) {
  return (
    <motion.h1
      className="kinetic-title"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {text.split('').map((ch, i) => (
        <motion.span key={i} variants={letter}>
          {ch === ' ' ? '\u00A0' : ch}
        </motion.span>
      ))}
    </motion.h1>
  )
}
