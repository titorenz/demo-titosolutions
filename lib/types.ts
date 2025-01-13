export interface Links {
  label: string;
  href: string;
}

export interface PortfolioListItem {
  id: string;
  title: string;
  slug: string;
  cover_image: string;
  client: string;
  created_at: string;
}

export interface Section {
  title: string;
  text: string;
}
export interface Portfolio {
  id?: string;
  title: string;
  slug?: string;
  cover_image: string;
  client: string;
  services: string;
  duration: string;
  website: string;
  client_value: string;
  services_value: string;
  duration_value: string;
  website_value: string;
  overview_image: string;
  overview_title: string;
  overview_description: string;
  project_results_title: string;
  project_results_description: string;
  project_results_image: string;
  additional_sections: Section[];
  project_results_sections: Section[];
}
