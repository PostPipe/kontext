"use client";

import CardNav from "./CardNav";


const NAV_ITEMS = [
  {
    label: "Features",
    bgColor: "#dbeafe",
    textColor: "#000",
    links: [
      { label: "Supported Environments", ariaLabel: "Supported Environments", href: "#ide-showcase" },
      { label: "Platform Experience", ariaLabel: "Platform Experience", href: "#platform-showcase" },
      { label: "Download", ariaLabel: "Download", href: "#download-section" },
    ],
  },
  {
    label: "Products",
    bgColor: "#dbeafe",
    textColor: "#000",
    links: [
      { label: "PostPipe", ariaLabel: "PostPipe", href: "https://www.postpipe.in" },
      { label: "LogJSON", ariaLabel: "LogJSON", href: "https://logjson.postpipe.in" },
      { label: "Kontext", ariaLabel: "Kontext", href: "https://kontext.postpipe.in" },
    ],
  },
  {
    label: "Community",
    bgColor: "#dbeafe",
    textColor: "#000",
    links: [
      { label: "GitHub", ariaLabel: "GitHub", href: "https://github.com/PostPipe" },
      { label: "Instagram", ariaLabel: "Instagram", href: "https://www.instagram.com/postpipe.official" },
      { label: "Contact", ariaLabel: "Contact", href: "#footer" },
    ],
  },
];

export const Navbar = () => (
  <CardNav
    logo="/Kontext-light.svg"
    logoAlt="Kontext"
    items={NAV_ITEMS}
    baseColor="#ffffff"
    menuColor="#000000"
    buttonBgColor="#000000"
    buttonTextColor="#ffffff"
    buttonHref="#download-section"
    ease="power3.out"
  />
);
