import { getHygraphClient } from "./hygraph";
import {
  CUSTOMER_BY_SLUG,
  CUSTOMER_SLUGS,
  INDUSTRY_BY_SLUG,
  INDUSTRY_SLUGS,
  LANDING_BY_SLUG,
  LANDING_SLUGS,
  LIST_QUERIES,
  PERSONA_BY_SLUG,
  PERSONA_SLUGS,
  PRODUCT_BY_SLUG,
  PRODUCT_SLUGS,
  RESOURCE_BY_SLUG,
  RESOURCE_SLUGS,
  SITE_SETTINGS_QUERY,
} from "./queries";
import type { Section } from "@/components/sections/SectionRenderer";

export async function getSiteSettings() {
  const client = getHygraphClient();
  const data = await client.request<{
    siteSettingsCollection: Array<{
      id: string;
      siteName: string;
      headerCtaLabel?: string | null;
      headerCtaUrl?: string | null;
      footerTagline?: string | null;
      logo?: { url: string; width?: number | null; height?: number | null } | null;
      defaultOgImage?: { url: string } | null;
    }>;
  }>(SITE_SETTINGS_QUERY);
  return data.siteSettingsCollection[0] ?? null;
}

export async function getLandingPage(slug: string) {
  const client = getHygraphClient();
  const data = await client.request<{
    landingPages: Array<{
      id: string;
      title: string;
      slug: string;
      seo?: { metaTitle?: string | null; metaDescription?: string | null } | null;
      featuredProducts: Array<{ name: string; slug: string; summary?: string | null }>;
      featuredCustomerStories: Array<{
        title: string;
        slug: string;
        clientName?: string | null;
        excerpt?: string | null;
      }>;
      sections: Section[];
    }>;
  }>(LANDING_BY_SLUG, { slug });
  return data.landingPages[0] ?? null;
}

export async function getLandingSlugs() {
  const client = getHygraphClient();
  const data = await client.request<{
    landingPages: Array<{ slug: string }>;
  }>(LANDING_SLUGS);
  return data.landingPages.map((p) => p.slug).filter((s) => s !== "home");
}

export async function getProduct(slug: string) {
  const client = getHygraphClient();
  const data = await client.request<{
    products: Array<{
      id: string;
      name: string;
      slug: string;
      summary?: string | null;
      heroImage?: { url: string; width?: number | null; height?: number | null } | null;
      seo?: { metaTitle?: string | null; metaDescription?: string | null } | null;
      sections: Section[];
    }>;
  }>(PRODUCT_BY_SLUG, { slug });
  return data.products[0] ?? null;
}

export async function getProductSlugs() {
  const client = getHygraphClient();
  const data = await client.request<{ products: Array<{ slug: string }> }>(
    PRODUCT_SLUGS,
  );
  return data.products.map((p) => p.slug);
}

export async function getIndustry(slug: string) {
  const client = getHygraphClient();
  const data = await client.request<{
    industries: Array<{
      id: string;
      name: string;
      slug: string;
      summary?: string | null;
      heroImage?: { url: string; width?: number | null; height?: number | null } | null;
      seo?: { metaTitle?: string | null; metaDescription?: string | null } | null;
      sections: Section[];
    }>;
  }>(INDUSTRY_BY_SLUG, { slug });
  return data.industries[0] ?? null;
}

export async function getIndustrySlugs() {
  const client = getHygraphClient();
  const data = await client.request<{ industries: Array<{ slug: string }> }>(
    INDUSTRY_SLUGS,
  );
  return data.industries.map((i) => i.slug);
}

export async function getPersona(slug: string) {
  const client = getHygraphClient();
  const data = await client.request<{
    personaRoles: Array<{
      id: string;
      title: string;
      slug: string;
      summary?: string | null;
      heroImage?: { url: string; width?: number | null; height?: number | null } | null;
      seo?: { metaTitle?: string | null; metaDescription?: string | null } | null;
      recommendedProducts: Array<{ name: string; slug: string; summary?: string | null }>;
      sections: Section[];
    }>;
  }>(PERSONA_BY_SLUG, { slug });
  return data.personaRoles[0] ?? null;
}

export async function getPersonaSlugs() {
  const client = getHygraphClient();
  const data = await client.request<{ personaRoles: Array<{ slug: string }> }>(
    PERSONA_SLUGS,
  );
  return data.personaRoles.map((p) => p.slug);
}

export async function getResource(slug: string) {
  const client = getHygraphClient();
  const data = await client.request<{
    resources: Array<{
      id: string;
      title: string;
      slug: string;
      resourceType: string;
      summary?: string | null;
      externalUrl?: string | null;
      releaseDate?: string | null;
      thumbnail?: { url: string; width?: number | null; height?: number | null } | null;
      file?: { url: string; fileName?: string | null } | null;
      relatedProduct?: { name: string; slug: string } | null;
    }>;
  }>(RESOURCE_BY_SLUG, { slug });
  return data.resources[0] ?? null;
}

export async function getResourceSlugs() {
  const client = getHygraphClient();
  const data = await client.request<{ resources: Array<{ slug: string }> }>(
    RESOURCE_SLUGS,
  );
  return data.resources.map((r) => r.slug);
}

export async function getCustomerStory(slug: string) {
  const client = getHygraphClient();
  const data = await client.request<{
    customerStories: Array<{
      id: string;
      title: string;
      slug: string;
      clientName?: string | null;
      excerpt?: string | null;
      clientLogo?: { url: string } | null;
      heroImage?: { url: string; width?: number | null; height?: number | null } | null;
      industry?: { name: string; slug: string } | null;
      seo?: { metaTitle?: string | null; metaDescription?: string | null } | null;
      sections: Section[];
    }>;
  }>(CUSTOMER_BY_SLUG, { slug });
  return data.customerStories[0] ?? null;
}

export async function getCustomerSlugs() {
  const client = getHygraphClient();
  const data = await client.request<{ customerStories: Array<{ slug: string }> }>(
    CUSTOMER_SLUGS,
  );
  return data.customerStories.map((c) => c.slug);
}

export async function listProducts() {
  const client = getHygraphClient();
  return (
    await client.request<{
      products: Array<{ name: string; slug: string; summary?: string | null }>;
    }>(LIST_QUERIES.products)
  ).products;
}

export async function listIndustries() {
  const client = getHygraphClient();
  return (
    await client.request<{
      industries: Array<{ name: string; slug: string; summary?: string | null }>;
    }>(LIST_QUERIES.industries)
  ).industries;
}

export async function listPersonas() {
  const client = getHygraphClient();
  return (
    await client.request<{
      personaRoles: Array<{ title: string; slug: string; summary?: string | null }>;
    }>(LIST_QUERIES.personas)
  ).personaRoles;
}

export async function listResources() {
  const client = getHygraphClient();
  return (
    await client.request<{
      resources: Array<{
        title: string;
        slug: string;
        summary?: string | null;
        resourceType: string;
        releaseDate?: string | null;
      }>;
    }>(LIST_QUERIES.resources)
  ).resources;
}

export async function listCustomers() {
  const client = getHygraphClient();
  return (
    await client.request<{
      customerStories: Array<{
        title: string;
        slug: string;
        excerpt?: string | null;
        clientName?: string | null;
      }>;
    }>(LIST_QUERIES.customers)
  ).customerStories;
}
