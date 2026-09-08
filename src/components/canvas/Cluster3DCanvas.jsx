import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

export function Cluster3DCanvas({ activeCluster = 'all' }) {
  const mountRef = useRef(null)
  const [hoveredCluster, setHoveredCluster] = useState(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000)
    camera.position.set(0, 0, 22)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const clusterGroup = new THREE.Group()
    scene.add(clusterGroup)

    // 3 Clinical Clusters (Patient Phenotypes in Latent Embedding Space)
    const clusterConfigs = [
      { id: 'stable', name: 'Cluster 0: Hemodynamically Stable', center: new THREE.Vector3(-6, -2, -1), color: '#60a5fa', count: 45 },
      { id: 'sirs', name: 'Cluster 1: Systemic SIRS Progression', center: new THREE.Vector3(1, 4, 2), color: '#38bdf8', count: 50 },
      { id: 'septic', name: 'Cluster 2: Septic Shock & Hypoperfusion', center: new THREE.Vector3(5, -3, -2), color: '#93c5fd', count: 40 },
    ]

    const pointsGeo = new THREE.BufferGeometry()
    const allPositions = []
    const allColors = []

    const centroidMeshes = []
    const centroidGeo = new THREE.OctahedronGeometry(0.7, 0)

    clusterConfigs.forEach((c) => {
      // Centroid Mesh
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(c.color),
        wireframe: true,
      })
      const mesh = new THREE.Mesh(centroidGeo, mat)
      mesh.position.copy(c.center)
      clusterGroup.add(mesh)
      centroidMeshes.push({ mesh, config: c })

      // Data Points surrounding centroid with gaussian-like dispersion
      for (let i = 0; i < c.count; i++) {
        const u = Math.random()
        const v = Math.random()
        const theta = u * 2.0 * Math.PI
        const phi = Math.acos(2.0 * v - 1.0)
        const r = Math.cbrt(Math.random()) * 3.2

        const sinPhi = Math.sin(phi)
        const x = c.center.x + r * sinPhi * Math.cos(theta)
        const y = c.center.y + r * sinPhi * Math.sin(theta)
        const z = c.center.z + r * Math.cos(phi)

        allPositions.push(x, y, z)

        const col = new THREE.Color(c.color)
        allColors.push(col.r, col.g, col.b)
      }
    })

    pointsGeo.setAttribute('position', new THREE.Float32BufferAttribute(allPositions, 3))
    pointsGeo.setAttribute('color', new THREE.Float32BufferAttribute(allColors, 3))

    // Particle Material with refined micro points
    const pointsMat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
    })
    const pointCloud = new THREE.Points(pointsGeo, pointsMat)
    clusterGroup.add(pointCloud)

    // Latent Space Connecting Spider Lines between Nearest Points
    const linePositions = []
    for (let i = 0; i < allPositions.length / 3; i += 3) {
      for (let j = i + 1; j < Math.min(i + 8, allPositions.length / 3); j++) {
        const p1 = new THREE.Vector3(allPositions[i * 3], allPositions[i * 3 + 1], allPositions[i * 3 + 2])
        const p2 = new THREE.Vector3(allPositions[j * 3], allPositions[j * 3 + 1], allPositions[j * 3 + 2])
        if (p1.distanceTo(p2) < 2.8) {
          linePositions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z)
        }
      }
    }
    const linesGeo = new THREE.BufferGeometry()
    linesGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
    const linesMat = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.12,
    })
    const clusterLines = new THREE.LineSegments(linesGeo, linesMat)
    clusterGroup.add(clusterLines)

    // Mouse Interaction
    let targetX = 0
    let targetY = 0
    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      targetX = (((e.clientX - rect.left) / rect.width) * 2 - 1) * 0.4
      targetY = -(((e.clientY - rect.top) / rect.height) * 2 - 1) * 0.3
    }
    container.addEventListener('mousemove', onMouseMove)

    const handleResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    const ro = new ResizeObserver(handleResize)
    ro.observe(container)

    let isVisible = true
    const io = new IntersectionObserver(([e]) => { isVisible = e.isIntersecting }, { threshold: 0.05 })
    io.observe(container)

    const clock = new THREE.Clock()
    let raf
    const animate = () => {
      raf = requestAnimationFrame(animate)
      if (!isVisible) return

      const t = clock.getElapsedTime()

      if (!prefersReducedMotion) {
        clusterGroup.rotation.y += 0.003
        clusterGroup.rotation.y += (targetX - clusterGroup.rotation.y) * 0.03
        clusterGroup.rotation.x += (targetY - clusterGroup.rotation.x) * 0.03

        // Centroid rotation
        centroidMeshes.forEach((item, idx) => {
          item.mesh.rotation.x = t * (0.5 + idx * 0.2)
          item.mesh.rotation.y = t * (0.6 + idx * 0.2)
          const s = 1 + Math.sin(t * 2 + idx) * 0.15
          item.mesh.scale.set(s, s, s)
        })
      }

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      container.removeEventListener('mousemove', onMouseMove)
      ro.disconnect()
      io.disconnect()
      cancelAnimationFrame(raf)
      renderer.dispose()
      pointsGeo.dispose()
      pointsMat.dispose()
      linesGeo.dispose()
      linesMat.dispose()
      centroidGeo.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [activeCluster])

  return (
    <div className="cluster-3d-canvas-wrap" ref={mountRef}>
      <div className="cluster-canvas-badge">
        <code>LATENT SPACE: 3D PATIENT EMBEDDING CLUSTERS (t-SNE / PCA)</code>
      </div>
    </div>
  )
}
