import { Suspense, useMemo, useRef, type CSSProperties } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

/** Hauteur cible de chaque tête (unités three). */
const TARGET_HEIGHT = 2.25

/**
 * Têtes 3D du hero (Lenny + Gabriel) — compo avec profondeur, décalage,
 * rotation l'une vers l'autre et flottement.
 */
const HEADS = [
  { name: 'lenny', model: '/models/lenny.glb?v=1', x: -0.9, y: -0.12, z: 0.45, rotY: 0.24, phase: 0 },
  { name: 'gabriel', model: '/models/gabriel.glb?v=1', x: 0.9, y: 0.12, z: -0.12, rotY: -0.24, phase: 1.7 },
] as const

function useFitted(url: string) {
  const { scene } = useGLTF(url)
  return useMemo(() => {
    const obj = scene.clone(true)
    const box = new THREE.Box3().setFromObject(obj)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)
    const s = TARGET_HEIGHT / (size.y || 1)
    obj.scale.setScalar(s)
    obj.position.set(-center.x * s, -center.y * s, -center.z * s)
    return obj
  }, [scene])
}

function Head({ head }: { head: (typeof HEADS)[number] }) {
  const fitted = useFitted(head.model)
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.position.y = head.y + Math.sin(t * 0.6 + head.phase) * 0.07
    ref.current.rotation.z = Math.sin(t * 0.4 + head.phase) * 0.03
    ref.current.rotation.y = head.rotY + state.pointer.x * 0.18
    ref.current.rotation.x = -state.pointer.y * 0.1
  })
  return (
    <group ref={ref} position={[head.x, head.y, head.z]}>
      <primitive object={fitted} />
    </group>
  )
}

interface Props {
  className?: string
  style?: CSSProperties
}

export default function HeroHeads({ className, style }: Props) {
  return (
    <div className={className} style={style}>
      <Canvas
        camera={{ position: [0, 0.05, 6], fov: 34 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[3, 4, 5]} intensity={2.6} />
        <directionalLight position={[-4, 2, 2]} intensity={0.8} />
        {/* rim light de marque, doux pour ne pas teinter la peau */}
        <pointLight position={[-3.2, -0.4, 1.6]} intensity={20} color="#B600A8" />
        <pointLight position={[3.2, -1, 1.6]} intensity={20} color="#BE4C00" />
        <Suspense fallback={null}>
          {HEADS.map((h) => (
            <Head key={h.name} head={h} />
          ))}
        </Suspense>
      </Canvas>
    </div>
  )
}
