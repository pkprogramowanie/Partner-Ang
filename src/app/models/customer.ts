export interface Customer {
  ID: string;
  name?: string;
  street?: string;
  streetNumber?: string;
  place?: string;
  postalCode?: string;
  phones?: [
    {
      number: string;
      label?: string;
    }
  ];
  emails?: [
    {
      email: string;
      label?: string;
      primary?: boolean
    }
  ];
  tags?: [
    {
      tag: string
    }
  ];
}
