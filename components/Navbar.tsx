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
      { label: "PostPipe", ariaLabel: "PostPipe", href: "https://www.postpipe.in", target: "_blank" },
      { label: "LogJSON", ariaLabel: "LogJSON", href: "https://logjson.postpipe.in", target: "_blank" },
      { label: "Kontext", ariaLabel: "Kontext", href: "https://kontext.postpipe.in", target: "_blank" },
    ],
  },
  {
    label: "Community",
    bgColor: "#dbeafe",
    textColor: "#000",
    links: [
      { label: "GitHub", ariaLabel: "GitHub", href: "https://github.com/PostPipe", target: "_blank" },
      { label: "Instagram", ariaLabel: "Instagram", href: "https://www.instagram.com/postpipe.official", target: "_blank" },
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
