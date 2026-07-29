"use client";

import { Suspense, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  PerspectiveCamera,
  Box,
  Plane,
} from "@react-three/drei";
import * as THREE from "three";
import { Collection, Product } from "@/types";
import { useConfiguratorStore } from "@/stores/configurator";

interface HotspotData {
  id: string;
  position: [number, number, number];
  product: Product;
}

function Wall({ color }: { color: string }) {
  return (
    <group>
      <Plane args={[10, 5]} rotation={[0, 0, 0]} position={[0, 2.5, -5]}>
        <meshStandardMaterial color={color} roughness={0.8} />
      </Plane>
      <Plane args={[10, 5]} rotation={[0, Math.PI / 2, 0]} position={[-5, 2.5, 0]}>
        <meshStandardMaterial color={color} roughness={0.8} />
      </Plane>
    </group>
  );
}

function Floor({ material }: { material: string }) {
  const colors: Record<string, string> = {
    oak: "#C9B8A5",
    marble: "#F4F1EC",
    walnut: "#7A6652",
    travertine: "#E8E0D5",
  };
  return (
    <Plane
      args={[10, 10]}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      receiveShadow
    >
      <meshStandardMaterial color={colors[material] || colors.oak} roughness={0.6} />
    </Plane>
  );
}

function FurniturePlaceholder({
  position,
  color,
  onClick,
  selected,
}: {
  position: [number, number, number];
  color: string;
  onClick: () => void;
  selected: boolean;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (mesh.current && selected) {
      mesh.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.05;
    }
  });
  return (
    <Box
      ref={mesh}
      args={[1.2, 0.8, 0.8]}
      position={position}
      onClick={onClick}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
    </Box>
  );
}

function Hotspot({
  position,
  label,
  onClick,
}: {
  position: [number, number, number];
  label: string;
  onClick: () => void;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.08;
    }
  });
  return (
    <group position={position} ref={ref} onClick={onClick}>
      <mesh>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#C9A86C" />
      </mesh>
      <mesh position={[0, 0, 0.01]}>
        <ringGeometry args={[0.16, 0.18, 32]} />
        <meshBasicMaterial color="#C9A86C" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function Scene({
  collection,
  hotspots,
  onSelectProduct,
  selectedProductId,
}: {
  collection: Collection;
  hotspots: HotspotData[];
  onSelectProduct: (product: Product) => void;
  selectedProductId: string | null;
}) {
  const { wallColor, flooring, lighting } = useConfiguratorStore();
  const envFile = lighting === "night" ? "night" : "studio";

  const furnitureColors = ["#8B6F4E", "#A89B8C", "#C9B8A5", "#5C4A3A", "#2C2A26"];

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2.5, 6]} fov={50} />
      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={9}
        maxPolarAngle={Math.PI / 2 - 0.05}
        autoRotate
        autoRotateSpeed={0.5}
      />
      <ambientLight intensity={lighting === "night" ? 0.3 : 0.6} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={lighting === "night" ? 0.5 : 1.2}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight
        position={[0, 3, 0]}
        intensity={lighting === "night" ? 1.5 : 0.3}
        color="#C9A86C"
      />
      <Environment preset={envFile as any} />
      <Wall color={wallColor} />
      <Floor material={flooring} />
      {hotspots.map((h, i) => (
        <group key={h.id}>
          <FurniturePlaceholder
            position={h.position}
            color={furnitureColors[i % furnitureColors.length]}
            onClick={() => onSelectProduct(h.product)}
            selected={selectedProductId === h.id}
          />
          <Hotspot
            position={[h.position[0], h.position[1] + 0.6, h.position[2]]}
            label={h.product.name}
            onClick={() => onSelectProduct(h.product)}
          />
        </group>
      ))}
      <ContactShadows position={[0, 0.01, 0]} opacity={0.4} scale={10} blur={2} />
    </>
  );
}

export function RoomViewer({
  collection,
  onSelectProduct,
  selectedProductId,
}: {
  collection: Collection;
  onSelectProduct: (product: Product) => void;
  selectedProductId: string | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const hotspots: HotspotData[] = useMemo(() => {
    const positions: [number, number, number][] = [
      [-2, 0.4, -2],
      [0, 0.4, -1.5],
      [2, 0.4, -2],
      [-1.5, 0.4, 1.5],
      [1.5, 0.4, 1.5],
      [0, 0.4, 0],
    ];
    return collection.products.slice(0, 6).map((product, i) => ({
      id: product.id,
      position: positions[i] || [0, 0.4, 0],
      product,
    }));
  }, [collection]);

  return (
    <div ref={containerRef} className="relative h-[60vh] w-full overflow-hidden rounded-3xl bg-[#F5F0E8] md:h-[75vh]">
      <Canvas shadows gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <Scene
            collection={collection}
            hotspots={hotspots}
            onSelectProduct={onSelectProduct}
            selectedProductId={selectedProductId}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
