/** Shared section union — aliases avoid GraphQL field conflicts across inline fragments */
export const SECTIONS_GQL = `
  sections {
    __typename
    ... on HeroBlock {
      id
      eyebrow headline subheadline
      primaryCta { id label url variant }
      secondaryCta { id label url variant }
    }
    ... on RichTextBlock {
      id
      richBody: body { raw }
    }
    ... on CallToActionBanner {
      id
      layout
      ctaBannerTitle: title
      ctaBannerBody: body { raw }
      cta { id label url variant }
      image { url width height }
    }
    ... on CardGridBlock {
      id
      intro { id eyebrow title subtitle }
      cards { id title excerpt href }
    }
    ... on FeatureGridBlock {
      id
      intro { id eyebrow title subtitle }
      features { id title description { raw } }
    }
    ... on StatsBlock {
      id
      intro { id eyebrow title subtitle }
      stats { id value label }
    }
    ... on LogoStripBlock {
      id
      logoStripTitle: title
    }
    ... on QuoteBlock {
      id
      quote authorName authorTitle
    }
    ... on MediaWithTextBlock {
      id
      mediaPosition
      mwtTitle: title
      mwtBody: body { raw }
      image { url width height }
      mwtCta: cta { id label url variant }
    }
    ... on FaqBlock {
      id
      intro { id eyebrow title subtitle }
      items { id question answer { raw } }
    }
  }
`;

export const RESOLVE_PREVIEW_SLUG = `
  query ResolvePreviewSlug($slug: String!) {
    lp: landingPages(where: { slug: $slug }, stage: DRAFT, locales: [en], first: 1) {
      slug
    }
    pr: products(where: { slug: $slug }, stage: DRAFT, locales: [en], first: 1) {
      slug
    }
    ind: industries(where: { slug: $slug }, stage: DRAFT, locales: [en], first: 1) {
      slug
    }
    per: personaRoles(where: { slug: $slug }, stage: DRAFT, locales: [en], first: 1) {
      slug
    }
    res: resources(where: { slug: $slug }, stage: DRAFT, locales: [en], first: 1) {
      slug
    }
    cus: customerStories(where: { slug: $slug }, stage: DRAFT, locales: [en], first: 1) {
      slug
    }
  }
`;

export const SITE_SETTINGS_QUERY = `
  query SiteSettings($stage: Stage!) {
    siteSettingsCollection(first: 1, stage: $stage) {
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
  query LandingBySlug($slug: String!, $stage: Stage!) {
    landingPages(where: { slug: $slug }, stage: $stage, locales: [en], first: 1) {
      id
      title
      slug
      seo { metaTitle metaDescription }
      featuredProducts { id name slug summary }
      featuredCustomerStories { id title slug clientName excerpt }
      ${SECTIONS_GQL}
    }
  }
`;

export const LANDING_SLUGS = `
  query LandingSlugs($stage: Stage!) {
    landingPages(stage: $stage, locales: [en], first: 100) {
      slug
    }
  }
`;

export const PRODUCT_BY_SLUG = `
  query ProductBySlug($slug: String!, $stage: Stage!) {
    products(where: { slug: $slug }, stage: $stage, locales: [en], first: 1) {
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
  query ProductSlugs($stage: Stage!) {
    products(stage: $stage, locales: [en], first: 100) {
      slug
    }
  }
`;

export const INDUSTRY_BY_SLUG = `
  query IndustryBySlug($slug: String!, $stage: Stage!) {
    industries(where: { slug: $slug }, stage: $stage, locales: [en], first: 1) {
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
  query IndustrySlugs($stage: Stage!) {
    industries(stage: $stage, locales: [en], first: 100) {
      slug
    }
  }
`;

export const PERSONA_BY_SLUG = `
  query PersonaBySlug($slug: String!, $stage: Stage!) {
    personaRoles(where: { slug: $slug }, stage: $stage, locales: [en], first: 1) {
      id
      title
      slug
      summary
      heroImage { url width height }
      seo { metaTitle metaDescription }
      recommendedProducts { id name slug summary }
      ${SECTIONS_GQL}
    }
  }
`;

export const PERSONA_SLUGS = `
  query PersonaSlugs($stage: Stage!) {
    personaRoles(stage: $stage, locales: [en], first: 100) {
      slug
    }
  }
`;

export const RESOURCE_BY_SLUG = `
  query ResourceBySlug($slug: String!, $stage: Stage!) {
    resources(where: { slug: $slug }, stage: $stage, locales: [en], first: 1) {
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
  query ResourceSlugs($stage: Stage!) {
    resources(stage: $stage, locales: [en], first: 100) {
      slug
    }
  }
`;

export const CUSTOMER_BY_SLUG = `
  query CustomerBySlug($slug: String!, $stage: Stage!) {
    customerStories(where: { slug: $slug }, stage: $stage, locales: [en], first: 1) {
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
  query CustomerSlugs($stage: Stage!) {
    customerStories(stage: $stage, locales: [en], first: 100) {
      slug
    }
  }
`;

export const LIST_QUERIES = {
  products: `
    query ProductList($stage: Stage!) {
      products(stage: $stage, locales: [en], first: 100, orderBy: name_ASC) {
        name slug summary
      }
    }
  `,
  industries: `
    query IndustryList($stage: Stage!) {
      industries(stage: $stage, locales: [en], first: 100, orderBy: name_ASC) {
        name slug summary
      }
    }
  `,
  personas: `
    query PersonaList($stage: Stage!) {
      personaRoles(stage: $stage, locales: [en], first: 100, orderBy: title_ASC) {
        title slug summary
      }
    }
  `,
  resources: `
    query ResourceList($stage: Stage!) {
      resources(stage: $stage, locales: [en], first: 100, orderBy: title_ASC) {
        title slug summary resourceType releaseDate
      }
    }
  `,
  customers: `
    query CustomerList($stage: Stage!) {
      customerStories(stage: $stage, locales: [en], first: 100, orderBy: title_ASC) {
        title slug excerpt clientName
      }
    }
  `,
};
