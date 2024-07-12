import { IconDefinition, faGithub, faLinkedin, faStackOverflow } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export interface Link {
  display: string;
  icon?: IconDefinition;
  href: string;
  buzz?: boolean;
}

const socialLinks: Link[] = [
  {
    icon: faLinkedin,
    display: "LinkedIn",
    href: "https://www.linkedin.com/in/jonathan-hamel-701aa680",
  },
  {
    icon: faStackOverflow,
    display: "Stack Overflow",
    href: "https://stackoverflow.com/users/5842628/jonathan-hamel",
  },
  {
    icon: faGithub,
    display: "Github",
    href: "https://github.com/jonathanhamel4",
  },
  {
    icon: faEnvelope,
    buzz: true,
    display: "Email",
    href: "mailto:jonathanhamel4@gmail.com?Subject=Hey%20there!",
  },
];

const sectionLinks: Link[] = [
  { display: "About", href: "about" },
  { display: "Education", href: "education" },
  { display: "Work", href: "work" },
  { display: "Skills", href: "skills" },
  { display: "Volunteering", href: "volunteering" },
];

export function useLinks() {
  return { sectionLinks, socialLinks };
}
