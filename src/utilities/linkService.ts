export interface Link {
  display: string;
  icon?: string;
  href: string;
  animationClass?: string;
}

const socialLinks: Link[] = [
  {
    icon: "fa fa-linkedin-square",
    display: "LinkedIn",
    href: "https://www.linkedin.com/in/jonathan-hamel-701aa680",
  },
  {
    icon: "fa fa-stack-overflow",
    display: "Stack Overflow",
    href: "https://stackoverflow.com/users/5842628/jonathan-hamel",
  },
  {
    icon: "fa fa-github",
    display: "Github",
    href: "https://github.com/jonathanhamel4",
  },
  {
    icon: "fa fa-envelope",
    animationClass: "buzz-timed",
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
