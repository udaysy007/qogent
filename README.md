# Qogent.in Project Documentation

Welcome to the Qogent.in project documentation! This repository contains comprehensive documentation for building and maintaining the Qogent.in platform, a global education hub focused on democratizing access to international education.

## Documentation Overview

This README provides a high-level summary of available documentation. For detailed information, please refer to the specific files.

### Core Documentation

| Document                                         | Description                                                                                    |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| [`rules/prd.md`](#product-requirements-document) | Product Requirements Document outlining project objectives, features, and implementation plans |
| [`rules/project-setup.md`](#project-setup)       | Technical setup guide with configuration, dependencies, and project structure                  |
| [`rules/QogentStyleGuide.md`](#style-guide)      | Comprehensive design system with UI patterns, color guidelines, and component requirements     |
| [`rules/content-strategy.md`](#content-strategy) | Content creation approach, voice & tone guidelines, and editorial standards                    |

### Technical Documentation

| Document                                           | Description                                                                         |
| -------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [`rules/component-library.md`](#component-library) | UI component hierarchy, implementation details, and usage guidelines                |
| [`rules/data-mocking.md`](#data-mocking-strategy)  | Strategy for implementing and managing mock data for development and testing        |
| [`rules/testing-plan.md`](#testing-plan)           | Comprehensive testing approach including unit, integration, and performance testing |
| [`rules/seo-strategy.md`](#seo-strategy)           | SEO guidelines, keyword strategy, and performance optimization plan                 |

## Document Summaries

### Product Requirements Document

**File:** `rules/prd.md`

Defines the comprehensive project requirements for Qogent.in, including:

- Platform objectives to serve as Qogent's central digital hub
- Target audience segments and user needs
- Key features including country exploration, job portal, and educational resources
- Technical requirements using Next.js, TypeScript, and Tailwind CSS
- Project milestones and implementation phases
- Success metrics and risk mitigation strategies

### Project Setup

**File:** `rules/project-setup.md`

Technical guide for setting up the Qogent.in development environment:

- Initial project configuration with Next.js, TypeScript, and Tailwind CSS
- Essential dependencies including React Query, shadcn/ui, and related libraries
- Project structure following App Router architecture
- Configuration files for TypeScript, ESLint, Tailwind, etc.
- Deployment configuration for Netlify
- Git-based development workflow
- Quality assurance setup with Jest and Cypress

### Style Guide

**File:** `rules/QogentStyleGuide.md`

Comprehensive design system for Qogent.in:

- Dark-mode-first, mobile-first design philosophy
- CSS variable requirements for consistent theming
- Color system based on Irish-inspired palette
- Typography guidelines with Geist Sans as the primary font
- Component design patterns and standards
- Accessibility requirements (WCAG 2.1 AA)
- Form design patterns with modern, minimalist input styling
- Animation guidelines for interactive elements

### Content Strategy

**File:** `rules/content-strategy.md`

Guidelines for creating, organizing, and maintaining content:

- Content principles focusing on user-centered, authentic, and actionable content
- Brand voice that's authentically casual and conversational
- Writing style guidelines with specific techniques
- Typography and visual language recommendations
- Content types, formats, and organizational structure
- Content development process and quality standards
- Editorial calendar and workflow
- Content localization strategy
- Performance metrics and governance policies

### Component Library

**File:** `rules/component-library.md`

Documentation of UI components for Qogent.in:

- Component hierarchy from base elements to composite components
- Implementation details for typography, containers, and UI elements
- Design patterns for layout components, navigation, cards, and interactive elements
- Accessibility considerations for all components
- State management patterns
- Responsive behavior guidelines
- Performance optimization for components

### Data Mocking Strategy

**File:** `rules/data-mocking.md`

Strategy for implementing mock data in the frontend application:

- Directory structure for organizing data models, static data, and API mocks
- TypeScript interfaces for all data entities
- Mock API implementation guidelines
- Data generation techniques and seeding scripts
- Strategies for simulating server-side functionality
- Performance considerations for data handling

### Testing Plan

**File:** `rules/testing-plan.md`

Comprehensive testing approach:

- Unit testing with Jest and React Testing Library
- Integration testing strategy
- End-to-end testing with Cypress
- Accessibility testing guidelines
- Performance testing metrics and tools
- Cross-browser and device testing approach
- CI/CD integration for automated testing
- Test coverage targets and reporting

### SEO Strategy

**File:** `rules/seo-strategy.md`

Search engine optimization plan:

- SEO objectives and target audience personas
- Keyword strategy with primary and secondary keywords
- Technical SEO implementation guides
- Content optimization guidelines
- Performance optimization for Core Web Vitals
- Meta tag and schema markup implementation
- Analytics and measurement approach

## Getting Started

1. Begin with the `rules/prd.md` to understand project objectives
2. Follow `rules/project-setup.md` to set up the development environment
3. Refer to `rules/QogentStyleGuide.md` for design implementation guidelines
4. Use `rules/component-library.md` for building UI components
5. Follow `rules/content-strategy.md` for content creation

## Development Guidelines

- Follow the mobile-first, dark-mode-first approach outlined in the style guide
- Use CSS variables for theming as specified in the style guide
- Implement components according to the component library documentation
- Follow the testing plan for quality assurance
- Apply SEO best practices from the SEO strategy

## Deployment

Deployment guidelines are covered in the `rules/project-setup.md` document, focusing on Netlify-based deployment with appropriate configuration.

---

© 2024 Qogent - Democratizing access to international education
