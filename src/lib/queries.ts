/** Shared section union selection — aliases avoid GraphQL field conflicts across inline fragments */
export const SECTIONS_GQL = `
  sections {
    __typename
    ... on HeroBlock {
      eyebrow headline subheadline
      primaryCta { label url variant }
      secondaryCta { label url variant }
    }
    ... on RichTextBlock {
      richBody: body { raw }
    }
    ... on CallToActionBanner {
      layout
      ctaBannerTitle: title
      ctaBannerBody: body { raw }
      cta { label url variant }
      image { url width height }
    }
    ... on CardGridBlock {
      intro { eyebrow title subtitle }
      cards { title excerpt href }
    }
    ... on FeatureGridBlock {
      intro { eyebrow title subtitle }
      features { title description { raw } }
    }
    ... on StatsBlock {
      intro { eyebrow title subtitle }
      stats { value label }
    }
    ... on LogoStripBlock {
      logoStripTitle: title
    }
    ... on QuoteBlock {
      quote authorName authorTitle
    }
    ... on MediaWithTextBlock {
      mediaPosition
      mwtTitle: title
      mwtBody: body { raw }
      image { url width height }
      mwtCta: cta { label url variant }
    }
    ... on FaqBlock {
      intro { eyebrow title subtitle }
      items { question answer { raw } }
    }
  }
`;

export const SITE_SETTINGS_QUERY = `
  query SiteSettings {
    siteSettingsCollection(first: 1) {
      id
      siteName
      headerCtaLabel
      headerCtaUrl
      footerTagline
      logo { url width height }
      defaultOgImage { url width height }
    }
  }
`;

export const LANDING_BY_SLUG = `
  query LandingBySlug($slug: String!) {
    landingPages(where: { slug: $slug }, stage: PUBLISHED, locales: [en], first: 1) {
      id
      title
      slug
      seo { metaTitle metaDescription }
      featuredProducts { name slug summary }
      featuredCustomerStories { title slug clientName excerpt }
      ${SECTIONS_GQL}
    }
  }
`;

export const LANDING_SLUGS = `
  query LandingSlugs {
    landingPages(stage: PUBLISHED, locales: [en], first: 100) {
      slug
    }
  }
`;

export const PRODUCT_BY_SLUG = `
  query ProductBySlug($slug: String!) {
    products(where: { slug: $slug }, stage: PUBLISHED, locales: [en], first: 1) {
      id
      name
      slug
      summary
      heroImage { url width height }
      seo { metaTitle metaDescription }
      ${SECTIONS_GQL}
    }
  }
`;

export const PRODUCT_SLUGS = `
  query ProductSlugs {
    products(stage: PUBLISHED, locales: [en], first: 100) {
      slug
    }
  }
`;

export const INDUSTRY_BY_SLUG = `
  query IndustryBySlug($slug: String!) {
    industries(where: { slug: $slug }, stage: PUBLISHED, locales: [en], first: 1) {
      id
      name
      slug
      summary
      heroImage { url width height }
      seo { metaTitle metaDescription }
      ${SECTIONS_GQL}
    }
  }
`;

export const INDUSTRY_SLUGS = `
  query IndustrySlugs {
    industries(stage: PUBLISHED, locales: [en], first: 100) {
      slug
    }
  }
`;

export const PERSONA_BY_SLUG = `
  query PersonaBySlug($slug: String!) {
    personaRoles(where: { slug: $slug }, stage: PUBLISHED, locales: [en], first: 1) {
      id
      title
      slug
      summary
      heroImage { url width height }
      seo { metaTitle metaDescription }
      recommendedProducts { name slug summary }
      ${SECTIONS_GQL}
    }
  }
`;

export const PERSONA_SLUGS = `
  query PersonaSlugs {
    personaRoles(stage: PUBLISHED, locales: [en], first: 100) {
      slug
    }
  }
`;

export const RESOURCE_BY_SLUG = `
  query ResourceBySlug($slug: String!) {
    resources(where: { slug: $slug }, stage: PUBLISHED, locales: [en], first: 1) {
      id
      title
      slug
      resourceType
      summary
      externalUrl
      releaseDate
      thumbnail { url width height }
      file { url fileName }
      relatedProduct { name slug }
    }
  }
`;

export const RESOURCE_SLUGS = `
  query ResourceSlugs {
    resources(stage: PUBLISHED, locales: [en], first: 100) {
      slug
    }
  }
`;

export const CUSTOMER_BY_SLUG = `
  query CustomerBySlug($slug: String!) {
    customerStories(where: { slug: $slug }, stage: PUBLISHED, locales: [en], first: 1) {
      id
      title
      slug
      clientName
      excerpt
      clientLogo { url width height }
      heroImage { url width height }
      industry { name slug }
      seo { metaTitle metaDescription }
      ${SECTIONS_GQL}
    }
  }
`;

export const CUSTOMER_SLUGS = `
  query CustomerSlugs {
    customerStories(stage: PUBLISHED, locales: [en], first: 100) {
      slug
    }
  }
`;

export const LIST_QUERIES = {
  products: `
    query ProductList {
      products(stage: PUBLISHED, locales: [en], first: 100, orderBy: name_ASC) {
        name slug summary
      }
    }
  `,
  industries: `
    query IndustryList {
      industries(stage: PUBLISHED, locales: [en], first: 100, orderBy: name_ASC) {
        name slug summary
      }
    }
  `,
  personas: `
    query PersonaList {
      personaRoles(stage: PUBLISHED, locales: [en], first: 100, orderBy: title_ASC) {
        title slug summary
      }
    }
  `,
  resources: `
    query ResourceList {
      resources(stage: PUBLISHED, locales: [en], first: 100, orderBy: title_ASC) {
        title slug summary resourceType releaseDate
      }
    }
  `,
  customers: `
    query CustomerList {
      customerStories(stage: PUBLISHED, locales: [en], first: 100, orderBy: title_ASC) {
        title slug excerpt clientName
      }
    }
  `,
};
