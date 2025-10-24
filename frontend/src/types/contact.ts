export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarUrl: string | null;
  company: string;
  jobTitle: string;
  tags: string[];
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  tags: string[];
  favorite: boolean;
}

export interface ContactsResponse {
  data: Contact[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface ContactsParams {
  search?: string;
  page?: number;
  limit?: number;
  favorite?: boolean;
  tags?: string[];
}
