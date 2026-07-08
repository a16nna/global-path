import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Core() {
  const meshRef = useRef();
  const wireRef = useRef();

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.06;
    if (wireRef.current) wireRef.current.rotation.y += delta * 0.09;
  });

  return (
    <group>
      {/* solid inner globe */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.55, 48, 48]} />
        <meshStandardMaterial
          color="#12162a"
          emissive="#1f7261"
          emissiveIntensity={0.25}
          roughness={0.85}
          metalness={0.1}
        />
      </mesh>

      {/* wireframe route-grid shell */}
      <mesh ref={wireRef}>
        <sphereGeometry args={[1.62, 20, 20]} />
        <meshBasicMaterial color="#2fa88f" wireframe transparent opacity={0.35} />
      </mesh>

      {/* amber atmosphere rim */}
      <mesh>
        <sphereGeometry args={[1.78, 32, 32]} />
        <meshBasicMaterial
          color="#e8a33d"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

export default function Globe() {
  return (
    <div style={{ width: "100%", height: "380px" }} aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 4.4], fov: 42 }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[4, 3, 5]} intensity={1.4} color="#e8a33d" />
        <pointLight position={[-4, -2, -3]} intensity={0.6} color="#2fa88f" />
        <Core />
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.6}
          enableZoom={false}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
}
