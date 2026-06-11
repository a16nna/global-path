import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Earth() {
  return (
    <mesh>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshBasicMaterial color="cyan" wireframe />
    </mesh>
  );
}

export default function Globe() {
  return (
    <div
      style={{
        width: "100%",
        height: "350px",
        marginBottom: "20px",
      }}
    >
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={2} />
        <Earth />
        <OrbitControls
          autoRotate
          autoRotateSpeed={1}
          enableZoom={false}
        />
      </Canvas>
    </div>
  );
}