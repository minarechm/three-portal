import { Perf } from "r3f-perf"
import portalVertexShader from "./shaders/portal/vertex.js"
import portalFragmentShader from "./shaders/portal/fragment.js"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sparkles, OrbitControls, useGLTF, useTexture,Center, Float } from "@react-three/drei";
import * as THREE from "three"
import { useRef } from "react";

const Scene = () => {
  const { nodes } = useGLTF("./model/portal.glb")
  const bakedTexture = useTexture("./model/baked.jpg")
  bakedTexture.flipY = false;
  const portalMaterialRef = useRef()

  useFrame((state,delta) => {
    portalMaterialRef.current.uniforms.uTime.value += delta;
  })
  return (
    <>
      <OrbitControls/>
      <color args={["#201919"]} attach="background"/>
      <Perf/>
      <Center>
      <Float>
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={bakedTexture}/>
        </mesh>

        <mesh 
          geometry={nodes.poleLightA.geometry}
          position={nodes.poleLightA.position}
        >
          <meshBasicMaterial color="white"/>
        </mesh>

        <mesh 
          geometry={nodes.poleLightB.geometry}
          position={nodes.poleLightB.position}
        >
          <meshBasicMaterial color="white"/>
        </mesh>

        <mesh
          geometry={nodes.portalLight.geometry}
          position={nodes.portalLight.position}
          rotation={nodes.portalLight.rotation}
        >
          <shaderMaterial ref={portalMaterialRef}
            vertexShader={ portalVertexShader }
            fragmentShader={ portalFragmentShader }
            uniforms={ {
              uTime: { value:0},
              uColorStart: { value: new THREE.Color("red")},
              uColorEnd: { value: new THREE.Color("black")}
            }}
          />
        </mesh>
        </Float>
        <Sparkles
          size={ 6 }
          scale={ [4,2,4]}
          position-y={1}
          speed={0.2} //doesnt work when inside float
          count={50}
        />
      </Center>
      
    </>
  )
}
function App() {
  return (
    <>
      <Canvas>
        <Scene/>
      </Canvas>
    </>
  );
}

export default App;
