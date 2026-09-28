import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function FloatingRings({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth subtle mouse parallax
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouse.current.y * 0.35 + state.clock.getElapsedTime() * 0.05,
      0.04
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.current.x * 0.4 + state.clock.getElapsedTime() * 0.08,
      0.04
    );

    if (innerRingRef.current) {
      innerRingRef.current.rotation.x += delta * 0.2;
      innerRingRef.current.rotation.z += delta * 0.15;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.y += delta * 0.18;
      outerRingRef.current.rotation.x -= delta * 0.1;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
      <group ref={groupRef} position={[0, 0, -0.5]} scale={1.1}>
        {/* Outer Elegant Ring */}
        <mesh ref={outerRingRef}>
          <torusGeometry args={[2.2, 0.025, 32, 100]} />
          <meshStandardMaterial
            color="#c8935a"
            metalness={0.95}
            roughness={0.15}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Inner Gyroscope Ring */}
        <mesh ref={innerRingRef} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[1.7, 0.02, 32, 100]} />
          <meshStandardMaterial
            color="#8a5a3c"
            metalness={0.9}
            roughness={0.2}
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Center Faceted Crystal / Core */}
        <mesh ref={coreRef}>
          <octahedronGeometry args={[0.65, 0]} />
          <meshPhysicalMaterial
            color="#261d17"
            emissive="#5a3d2b"
            emissiveIntensity={0.4}
            roughness={0.1}
            metalness={0.9}
            clearcoat={1}
            clearcoatRoughness={0.1}
            wireframe={false}
          />
        </mesh>

        {/* Delicate Wireframe Cage around Core */}
        <mesh>
          <icosahedronGeometry args={[0.9, 1]} />
          <meshBasicMaterial color="#c8935a" wireframe transparent opacity={0.25} />
        </mesh>
      </group>
    </Float>
  );
}

function StarField() {
  const count = 100;
  const meshRef = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      // Disperse in a wide volume around the camera
      const x = (Math.random() - 0.5) * 18;
      const y = (Math.random() - 0.5) * 14;
      const z = (Math.random() - 0.5) * 8 - 1;
      const scale = Math.random() * 0.035 + 0.01;
      dummy.position.set(x, y, z);
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.015) * 0.05;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#e0ac72" transparent opacity={0.45} />
    </instancedMesh>
  );
}

export default function HeroScene() {
  const mouse = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(reducedMotionQuery.matches);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsVisible(false);
      } else if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setIsVisible(rect.bottom > 0 && rect.top < window.innerHeight);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
    };
  }, []);

  if (isReducedMotion) {
    return (
      <div aria-hidden="true" className="hero-scene-fallback">
        <div className="hero-static-orb" />
      </div>
    );
  }

  return (
    <div ref={containerRef} aria-hidden="true" className="hero-3d-canvas-container">
      {isVisible && (
        <Canvas
          dpr={[1, Math.min(window.devicePixelRatio, 1.5)]}
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ pointerEvents: "none" }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[4, 5, 4]} intensity={2.2} color="#fcebd9" />
          <directionalLight position={[-4, -3, -2]} intensity={1.0} color="#8a5a3c" />
          <pointLight position={[0, 0, 2]} intensity={1.2} color="#c8935a" />
          <Suspense fallback={null}>
            <FloatingRings mouse={mouse} />
            <StarField />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
