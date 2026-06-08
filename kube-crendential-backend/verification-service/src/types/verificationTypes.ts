export type Credential = {
  id: string;
  name: string;
  email: string;
  worker?: string;
  timestamp?: string;
  verified?: boolean;
  verifiedBy?: string;
  verifiedAt?: string;
};
