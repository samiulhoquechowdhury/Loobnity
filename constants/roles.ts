// constants/roles.ts

export type Role = {
  title: string;
  team: string;
  location: string;
  type: "Full-time" | "Contract";
};

export const OPEN_ROLES: Role[] = [
  {
    title: "Senior Full-Stack Engineer",
    team: "Engineering",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "AI/ML Engineer",
    team: "Engineering",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Product Designer",
    team: "Design",
    location: "Remote",
    type: "Contract",
  },
];
