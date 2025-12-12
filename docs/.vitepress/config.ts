import { defineConfig } from "vitepress";

export default defineConfig({
    title: "Policy-Based Authorization System",
    description: "Flexible, extensible, and type-safe authorization for Node.js and NestJS",
    base: "/policy-based-authorization-system/",
    themeConfig: {
        nav: [
            { text: "Home", link: "/" },
            { text: "Documentation", link: "/intro" },
            { text: "GitHub", link: "https://github.com/gsomenzi/policy-based-authorization-system" },
        ],
        sidebar: [
            {
                text: "Getting Started",
                items: [
                    { text: "Introduction", link: "/intro" },
                    { text: "Installation", link: "/installation" },
                ],
            },
            {
                text: "Architecture",
                items: [
                    { text: "Overview", link: "/architecture/overview" },
                    { text: "Diagram", link: "/architecture/diagram" },
                    { text: "Decisions", link: "/architecture/decisions" },
                ],
            },
            {
                text: "Usage",
                items: [
                    { text: "Node.js", link: "/usage/nodejs" },
                    { text: "NestJS", link: "/usage/nestjs" },
                ],
            },
            {
                text: "Development",
                items: [
                    { text: "Extensibility", link: "/extensibility" },
                    { text: "Guidelines", link: "/development/guidelines" },
                    { text: "Clean Architecture", link: "/development/clean-architecture" },
                ],
            },
            {
                text: "Reference",
                items: [
                    { text: "API Reference", link: "/api" },
                    { text: "Contributing", link: "/contributing" },
                    { text: "License", link: "/license" },
                ],
            },
        ],
        socialLinks: [{ icon: "github", link: "https://github.com/gsomenzi/policy-based-authorization-system" }],
        footer: {
            message: "Released under the MIT License.",
            copyright: "Copyright © 2025 Guilherme Somenzi",
        },
    },
});
