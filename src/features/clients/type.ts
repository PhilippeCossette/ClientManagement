export type Client = {
  name: string;
  email: string;
  company: string;
  budget: number;
  status: "new" | "contacted" | "closed";
};
