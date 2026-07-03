import * as THREE from "three";

export type NetworkNode = {
  id: string;
  label?: string;
  isPortfolio?: boolean;
  position: THREE.Vector3;
};

const nodes: NetworkNode[] = [];

const TOTAL_POINTS = 320;
const RADIUS = 5.2;

const goldenAngle =
  Math.PI * (3 - Math.sqrt(5));

for (let i = 0; i < TOTAL_POINTS; i++) {
  const y =
    1 - (i / (TOTAL_POINTS - 1)) * 2;

  const r =
    Math.sqrt(1 - y * y);

  const theta =
    goldenAngle * i;

  const x =
    Math.cos(theta) * r;

  const z =
    Math.sin(theta) * r;

  nodes.push({
    id: `hidden-${i}`,
    position: new THREE.Vector3(
      x * RADIUS,
      y * RADIUS,
      z * RADIUS
    ),
  });
}

/* PORTFOLIO NODES
   Existing sphere vertices reuse kar rahe hain
*/

const picks = {
  about1: 12,
  about2: 48,
  about3: 275,

  skills1: 25,
  skills2: 155,
  skills3: 295,

  cv1: 38,
  cv2: 180,
  cv3: 310,

  github1: 55,
  github2: 205,
  github3: 145,

  linkedin1: 70,
  linkedin2: 235,
  linkedin3: 100,

  contact1: 88,
  contact2: 260,
  contact3: 170,

  projects1: 120,
  projects2: 220,
  projects3: 32,

  clients1: 135,
  clients2: 285,
  clients3: 195,
};

nodes.push(

  // ABOUT

  {
    id: "about1",
    label: "ABOUT",
    isPortfolio: true,
    position: nodes[picks.about1].position.clone(),
  },

  {
    id: "about2",
    label: "ABOUT",
    isPortfolio: true,
    position: nodes[picks.about2].position.clone(),
  },

  {
    id: "about3",
    label: "ABOUT",
    isPortfolio: true,
    position: nodes[picks.about3].position.clone(),
  },

  // SKILLS

  {
    id: "skills1",
    label: "SKILLS",
    isPortfolio: true,
    position: nodes[picks.skills1].position.clone(),
  },

  {
    id: "skills2",
    label: "SKILLS",
    isPortfolio: true,
    position: nodes[picks.skills2].position.clone(),
  },

  {
    id: "skills3",
    label: "SKILLS",
    isPortfolio: true,
    position: nodes[picks.skills3].position.clone(),
  },

  // CV

  {
    id: "cv1",
    label: "MY CV",
    isPortfolio: true,
    position: nodes[picks.cv1].position.clone(),
  },

  {
    id: "cv2",
    label: "MY CV",
    isPortfolio: true,
    position: nodes[picks.cv2].position.clone(),
  },

  {
    id: "cv3",
    label: "MY CV",
    isPortfolio: true,
    position: nodes[picks.cv3].position.clone(),
  },

  // GITHUB

  {
    id: "github1",
    label: "GITHUB",
    isPortfolio: true,
    position: nodes[picks.github1].position.clone(),
  },

  {
    id: "github2",
    label: "GITHUB",
    isPortfolio: true,
    position: nodes[picks.github2].position.clone(),
  },

  {
    id: "github3",
    label: "GITHUB",
    isPortfolio: true,
    position: nodes[picks.github3].position.clone(),
  },

  // LINKEDIN

  {
    id: "linkedin1",
    label: "LINKEDIN",
    isPortfolio: true,
    position: nodes[picks.linkedin1].position.clone(),
  },

  {
    id: "linkedin2",
    label: "LINKEDIN",
    isPortfolio: true,
    position: nodes[picks.linkedin2].position.clone(),
  },

  {
    id: "linkedin3",
    label: "LINKEDIN",
    isPortfolio: true,
    position: nodes[picks.linkedin3].position.clone(),
  },

  // CONTACT

  {
    id: "contact1",
    label: "CONTACT",
    isPortfolio: true,
    position: nodes[picks.contact1].position.clone(),
  },

  {
    id: "contact2",
    label: "CONTACT",
    isPortfolio: true,
    position: nodes[picks.contact2].position.clone(),
  },

  {
    id: "contact3",
    label: "CONTACT",
    isPortfolio: true,
    position: nodes[picks.contact3].position.clone(),
  },

  // PROJECTS

  {
    id: "projects1",
    label: "PROJECTS",
    isPortfolio: true,
    position: nodes[picks.projects1].position.clone(),
  },

  {
    id: "projects2",
    label: "PROJECTS",
    isPortfolio: true,
    position: nodes[picks.projects2].position.clone(),
  },

  {
    id: "projects3",
    label: "PROJECTS",
    isPortfolio: true,
    position: nodes[picks.projects3].position.clone(),
  },

  // CLIENT WORKS

  {
    id: "clients1",
    label: "CLIENT WORKS",
    isPortfolio: true,
    position: nodes[picks.clients1].position.clone(),
  },

  {
    id: "clients2",
    label: "CLIENT WORKS",
    isPortfolio: true,
    position: nodes[picks.clients2].position.clone(),
  },

  {
    id: "clients3",
    label: "CLIENT WORKS",
    isPortfolio: true,
    position: nodes[picks.clients3].position.clone(),
  }

);
export default nodes;