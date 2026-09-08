import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function Hero3DCanvas() {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000)
    camera.position.set(0, 2, 28)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const networkGroup = new THREE.Group()
    scene.add(networkGroup)

    // Neural Network Architecture Specification
    // 4 Layers: Input (5) -> Feature Extractor (8) -> Latent Embeddings (8) -> Classification Head (4)
    const layerDefs = [
      { x: -14, count: 5, spacingY: 3.4, label: 'INPUT TENSOR' },
      { x: -5, count: 8, spacingY: 2.3, label: 'HIDDEN DENSE 1' },
      { x: 5, count: 8, spacingY: 2.3, label: 'LATENT EMBEDDINGS' },
      { x: 14, count: 4, spacingY: 3.6, label: 'OUTPUT LOGITS' },
    ]

    const nodeObjects = []
    const allLayers = []

    // Refined Ultra-Sleek Micro Node Geometry (razor-sharp AI points)
    const nodeGeo = new THREE.SphereGeometry(0.06, 32, 32)
    const nodeMatBase = new THREE.MeshBasicMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.95,
    })
    const nodeGlowMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.18,
      wireframe: true,
    })

    // Build Nodes Layer by Layer
    layerDefs.forEach((def, layerIdx) => {
      const layerNodes = []
      const startY = -((def.count - 1) * def.spacingY) / 2

      for (let i = 0; i < def.count; i++) {
        const y = startY + i * def.spacingY
        // Add delicate Z variation for deep 3D perspective
        const z = (Math.sin(i * 1.6 + layerIdx) * 2.2)

        const nodeMesh = new THREE.Mesh(nodeGeo, nodeMatBase.clone())
        nodeMesh.position.set(def.x, y, z)

        // Ultra-fine Outer Wireframe Halo
        const haloMesh = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), nodeGlowMat)
        nodeMesh.add(haloMesh)

        networkGroup.add(nodeMesh)

        const nodeData = {
          mesh: nodeMesh,
          halo: haloMesh,
          pos: new THREE.Vector3(def.x, y, z),
          baseScale: 1,
          pulse: 0,
          layer: layerIdx,
        }
        nodeObjects.push(nodeData)
        layerNodes.push(nodeData)
      }
      allLayers.push(layerNodes)
    })

    // Build Synaptic Connections (Lines between adjacent layers)
    const linePositions = []
    const connectionPairs = []

    for (let l = 0; l < allLayers.length - 1; l++) {
      const curr = allLayers[l]
      const next = allLayers[l + 1]

      curr.forEach((n1) => {
        next.forEach((n2) => {
          // Semi-sparse connectivity for clean architectural look
          const dist = Math.abs(n1.pos.y - n2.pos.y)
          if (dist < 5.8) {
            linePositions.push(n1.pos.x, n1.pos.y, n1.pos.z)
            linePositions.push(n2.pos.x, n2.pos.y, n2.pos.z)
            connectionPairs.push({ from: n1, to: n2 })
          }
        })
      })
    }

    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.12,
    })
    const synapseLines = new THREE.LineSegments(lineGeo, lineMat)
    networkGroup.add(synapseLines)

    // Active Synaptic Signal Impulses (Data Packets traveling through the network)
    const impulseCount = 42
    const impulses = []
    const impulseGeo = new THREE.SphereGeometry(0.035, 12, 12)
    const impulseMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.98,
    })

    for (let i = 0; i < impulseCount; i++) {
      const mesh = new THREE.Mesh(impulseGeo, impulseMat)
      networkGroup.add(mesh)
      const randomPair = connectionPairs[Math.floor(Math.random() * connectionPairs.length)]
      impulses.push({
        mesh,
        pair: randomPair,
        progress: Math.random(),
        speed: 0.008 + Math.random() * 0.012,
      })
    }

    // Interactive mouse drag & parallax tracking
    let targetRotY = 0.15
    let targetRotX = 0.05
    let isDragging = false
    let prevMouseX = 0
    let prevMouseY = 0

    const onMouseDown = (e) => {
      isDragging = true
      prevMouseX = e.clientX
      prevMouseY = e.clientY
    }

    const onMouseUp = () => {
      isDragging = false
    }

    const onMouseMove = (e) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX
        const deltaY = e.clientY - prevMouseY
        targetRotY += deltaX * 0.005
        targetRotX += deltaY * 0.005
        prevMouseX = e.clientX
        prevMouseY = e.clientY
      } else {
        targetRotY = ((e.clientX / window.innerWidth) * 2 - 1) * 0.35 + 0.15
        targetRotX = -((e.clientY / window.innerHeight) * 2 - 1) * 0.2 + 0.05
      }
    }

    // Trigger forward-pass wave on click
    const onClick = () => {
      impulses.forEach((imp) => {
        imp.progress = 0
        imp.speed = 0.02 + Math.random() * 0.015
      })
      nodeObjects.forEach((n) => {
        n.pulse = 1.0
      })
    }

    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('click', onClick)

    const handleResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    const ro = new ResizeObserver(handleResize)
    ro.observe(container)

    let isVisible = true
    const io = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
    }, { threshold: 0.05 })
    io.observe(container)

    // Animation Loop
    const clock = new THREE.Clock()
    let raf
    const animate = () => {
      raf = requestAnimationFrame(animate)
      if (!isVisible) return

      const t = clock.getElapsedTime()

      if (!prefersReducedMotion) {
        // Smooth camera dampening
        networkGroup.rotation.y += (targetRotY - networkGroup.rotation.y) * 0.04
        networkGroup.rotation.x += (targetRotX - networkGroup.rotation.x) * 0.04
        networkGroup.position.y = Math.sin(t * 0.8) * 0.4

        // Update Synaptic Impulses (Forward propagation along edges)
        impulses.forEach((imp) => {
          imp.progress += imp.speed
          if (imp.progress >= 1) {
            imp.progress = 0
            imp.pair.to.pulse = 1.0
            // Choose next connected pair or random
            imp.pair = connectionPairs[Math.floor(Math.random() * connectionPairs.length)]
          }
          const p1 = imp.pair.from.pos
          const p2 = imp.pair.to.pos
          imp.mesh.position.lerpVectors(p1, p2, imp.progress)
        })

        // Pulse Decay on Nodes (smooth & gentle)
        nodeObjects.forEach((node) => {
          if (node.pulse > 0) {
            node.pulse -= 0.012
            const s = 1 + node.pulse * 0.35
            node.mesh.scale.set(s, s, s)
            node.halo.scale.set(s * 1.2, s * 1.2, s * 1.2)
            node.mesh.material.color.setHex(node.pulse > 0.3 ? 0xffffff : 0x93c5fd)
          } else {
            node.mesh.scale.set(1, 1, 1)
          }
        })
      }

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('click', onClick)
      ro.disconnect()
      io.disconnect()
      cancelAnimationFrame(raf)
      renderer.dispose()
      nodeGeo.dispose()
      nodeMatBase.dispose()
      nodeGlowMat.dispose()
      lineGeo.dispose()
      lineMat.dispose()
      impulseGeo.dispose()
      impulseMat.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div className="hero-3d-canvas" ref={mountRef} aria-hidden="true">
      <div className="canvas-tech-tag">
        <code>3D ARCHITECTURE: FEED-FORWARD DEEP NEURAL NETWORK</code>
      </div>
    </div>
  )
}
