export interface Customer {
  ID: string;
  name?: string;
  street?: string;
  streetNumber?: string;
  place?: string;
  postalCode?: string;
  phones?: [
    { phone: string;
      label?: string;
      default?: boolean
    }
  ];
  emails?: [
    { email: string;
      label?: string;
      default?: boolean
    }
  ];
}
