import type { Contact } from '../types/contact';

export const mockContacts: Contact[] = [
  {
    id: "c1a7b0ff-1234-5678-9abc-def012345678",
    firstName: "Asha",
    lastName: "Sharma",
    email: "asha@example.com",
    phone: "+91-9876543210",
    avatarUrl: null,
    company: "Acme Co.",
    jobTitle: "Product Designer",
    tags: ["design", "india"],
    favorite: true,
    createdAt: "2025-10-01T12:00:00.000Z",
    updatedAt: "2025-10-01T12:00:00.000Z"
  },
  {
    id: "e8f9a8b2-5678-9abc-def0-123456789abc",
    firstName: "Uday",
    lastName: "Srivastava",
    email: "uday@example.com",
    phone: "+91-9999999999",
    avatarUrl: null,
    company: "Example Labs",
    jobTitle: "Software Engineer",
    tags: ["engineering", "friend"],
    favorite: false,
    createdAt: "2025-09-15T09:00:00.000Z",
    updatedAt: "2025-09-15T09:00:00.000Z"
  },
  {
    id: "f1a2b3c4-9abc-def0-1234-56789abcdef0",
    firstName: "Priya",
    lastName: "Patel",
    email: "priya@techcorp.com",
    phone: "+91-8888888888",
    avatarUrl: null,
    company: "TechCorp",
    jobTitle: "Frontend Developer",
    tags: ["engineering", "react", "javascript"],
    favorite: true,
    createdAt: "2025-09-20T14:30:00.000Z",
    updatedAt: "2025-09-20T14:30:00.000Z"
  },
  {
    id: "a1b2c3d4-5678-9abc-def0-123456789abc",
    firstName: "Rajesh",
    lastName: "Kumar",
    email: "rajesh@startup.io",
    phone: "+91-7777777777",
    avatarUrl: null,
    company: "StartupIO",
    jobTitle: "CEO",
    tags: ["leadership", "startup", "business"],
    favorite: false,
    createdAt: "2025-09-10T10:15:00.000Z",
    updatedAt: "2025-09-10T10:15:00.000Z"
  },
  {
    id: "b2c3d4e5-6789-abcd-ef01-23456789abcd",
    firstName: "Sneha",
    lastName: "Gupta",
    email: "sneha@designstudio.com",
    phone: "+91-6666666666",
    avatarUrl: null,
    company: "Design Studio",
    jobTitle: "UX Designer",
    tags: ["design", "ux", "research"],
    favorite: true,
    createdAt: "2025-09-25T16:45:00.000Z",
    updatedAt: "2025-09-25T16:45:00.000Z"
  },
  {
    id: "c3d4e5f6-789a-bcde-f012-3456789abcde",
    firstName: "Amit",
    lastName: "Singh",
    email: "amit@consulting.com",
    phone: "+91-5555555555",
    avatarUrl: null,
    company: "Consulting Inc",
    jobTitle: "Senior Consultant",
    tags: ["consulting", "strategy", "business"],
    favorite: false,
    createdAt: "2025-09-05T08:20:00.000Z",
    updatedAt: "2025-09-05T08:20:00.000Z"
  }
];
