import projectPlaceholder from "../assets/icons/project-placeholder.svg";

export type LinkItem = {
  label: string;
  href: string;
};

export type SocialItem = LinkItem & {
  icon: "linkedin" | "github" | "instagram";
};

export type ProjectItem = LinkItem & {
  icon: string;
  description: string;
};

export const intro = [
  { text: "Connected to Ahmed's portfolio" },
];

export const about = [
  "I'm Ahmed.-",
  "Sophomore pursuing Information Science and Engineering",
  "Bugs > Features",
  "Poems > Assignments",
  "Pani Puri > Health",
  "Sleep > Exercise",
];

export const projects: ProjectItem[] = [
  {
    label: "Adhkar",
    href: "https://adhkar.asterhyphen.xyz/",
    icon: projectPlaceholder,
    description: "Dummy description: short details about this project will go here.",
  },
  {
    label: "CTFriend",
    href: "/ctf/",
    icon: projectPlaceholder,
    description: "Dummy description: short details about this project will go here.",
  },
  {
    label: "Faculty Availability Checker",
    href: "https://github.com/asterhyphen/faculty-availability",
    icon: projectPlaceholder,
    description: "Dummy description: short details about this project will go here.",
  },
  {
    label: "File Sorter According to Date",
    href: "https://github.com/asterhyphen/sort",
    icon: projectPlaceholder,
    description: "Dummy description: short details about this project will go here.",
  },
  {
    label: "Hisaab",
    href: "https://github.com/asterhyphen/hisaab",
    icon: projectPlaceholder,
    description: "Dummy description: short details about this project will go here.",
  },
  {
    label: "In-Campus Queue System",
    href: "https://github.com/asterhyphen/campus-queue-priority",
    icon: projectPlaceholder,
    description: "Dummy description: short details about this project will go here.",
  },
  {
    label: "Rent Track-Kar",
    href: "https://github.com/asterhyphen/rent-track-kar",
    icon: projectPlaceholder,
    description: "Dummy description: short details about this project will go here.",
  },
  {
    label: "Geo-Tag Camera",
    href: "https://github.com/asterhyphen/geotag-camera",
    icon: projectPlaceholder,
    description: "Dummy description: short details about this project will go here.",
  },
  {
    label: "Migraine Tracker",
    href: "https://github.com/asterhyphen/migraine-tracker",
    icon: projectPlaceholder,
    description: "Dummy description: short details about this project will go here.",
  },
];

export const socials: SocialItem[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ahmed-s-284bb7359",
    icon: "linkedin",
  },
  { label: "Github", href: "https://github.com/asterhyphen", icon: "github" },
  {
    label: "Instagram",
    href: "https://www.instagram.com/aster.hyphen/",
    icon: "instagram",
  },
];
