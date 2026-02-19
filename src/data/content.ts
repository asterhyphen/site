import projectPlaceholder from "../assets/icons/project-placeholder.svg";

export type LinkItem = {
  label: string;
  href: string;
};

export type SocialItem = LinkItem & {
  icon: "linkedin" | "github" | "instagram";
};

export type ProjectItem = LinkItem & {
  category: "websites-apps" | "tools" | "college-projects";
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
    category: "websites-apps",
    icon: projectPlaceholder,
    description: "Add to home screen and recite your adhkars with ease. The site switches between morning adhkars, evening adhkars and sleep adhkars automatically according to the time of the day.",
  },
  {
    label: "CTFriend",
    href: "/ctf/",
    category: "tools",
    icon: projectPlaceholder,
    description: "A multi-decoding tool for beginner CTF players (like myself).",
  },
  {
    label: "File Sorter According to Date",
    href: "https://github.com/asterhyphen/sort",
    category: "tools",
    icon: projectPlaceholder,
    description: "Program to sort and rename files in a folder according to date of creation.",
  },
  {
    label: "Hisaab",
    href: "https://github.com/asterhyphen/hisaab",
    category: "websites-apps",
    icon: projectPlaceholder,
    description: "Easy to use expense tracker to manage from whom you are supposed to take or give money. Also shows statistics and detailed insights and analytics.",
  },
  {
    label: "In-Campus Queue System",
    href: "https://github.com/asterhyphen/campus-queue-priority",
    category: "college-projects",
    icon: projectPlaceholder,
    description: "Manage different queues and assign different roles to different email IDs. Also manage priority.",
  },
  {
    label: "Rent Track-Kar",
    href: "https://github.com/asterhyphen/rent-track-kar",
    category: "websites-apps",
    icon: projectPlaceholder,
    description: "Track rent and other shared expenses and directly send pre-formatted message.",
  },
  {
    label: "Geo-Tag Camera",
    href: "https://github.com/asterhyphen/geotag-camera",
    category: "websites-apps",
    icon: projectPlaceholder,
    description: "Click geotag pictures and add frames or filters without being interrupted by any ads.",
  },
  {
    label: "Migraine Tracker",
    href: "https://github.com/asterhyphen/migraine-tracker",
    category: "websites-apps",
    icon: projectPlaceholder,
    description: "Track your migraines and triggers. Also shows statistics and detailed insights and analytics.",
  },{
    label: "Faculty Availability Checker",
    href: "https://github.com/asterhyphen/faculty-availability",
    category: "college-projects",
    icon: projectPlaceholder,
    description: "Login using your USN and verify if the faculties of your department are available or not.",
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
