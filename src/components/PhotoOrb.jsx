import { useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'

function RingTorus({ hovered }) {
  const ref = useRef()
  useFrame((_, delta) => {
    ref.current.rotation.z += delta * (hovered ? 1.4 : 0.6)
  })
  return (
    <mesh ref={ref}>
      <torusGeometry args={[1.28, 0.045, 16, 100]} />
      <meshStandardMaterial color="#ffc94a" emissive="#ff2e9a" emissiveIntensity={0.6} roughness={0.3} />
    </mesh>
  )
}

function PhotoDisc({ src }) {
  const texture = useLoader(THREE.TextureLoader, src)
  const meshRef = useRef()
  const [target, setTarget] = useState({ x: 0, y: 0 })

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    meshRef.current.rotation.y += (target.x - meshRef.current.rotation.y) * 0.06
    meshRef.current.rotation.x += (target.y - meshRef.current.rotation.x) * 0.06
    meshRef.current.position.y = Math.sin(t * 0.9) * 0.06
  })

  function handlePointerMove(e) {
    const nx = (e.point.x / 1.1)
    const ny = (e.point.y / 1.1)
    setTarget({ x: nx * 0.5, y: -ny * 0.5 })
  }

  return (
    <mesh
      ref={meshRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setTarget({ x: 0, y: 0 })}
    >
      <circleGeometry args={[1.1, 64]} />
      <meshStandardMaterial map={texture} roughness={0.5} />
    </mesh>
  )
}

export default function PhotoOrb({ src }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="photo-stage"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas camera={{ position: [0, 0, 3.4], fov: 40 }} dpr={[1, 2]}>
        <ambientLight intensity={0.9} />
        <pointLight position={[3, 3, 4]} intensity={1.4} color="#22e7ff" />
        <pointLight position={[-3, -2, 3]} intensity={1.1} color="#ff2e9a" />
        <RingTorus hovered={hovered} />
        <PhotoDisc src={src} />
      </Canvas>
    </div>
  )
}
