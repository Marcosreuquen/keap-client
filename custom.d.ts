interface IContact {
  ScoreValue?: string | null;
  addresses?: Array<ContactAddress> | null;
  anniversary?: Date | null;
  birthday?: Date | null;
  company?: {
    company_name?: string;
    id?: number;
  } | null;
  company_name?: string | null;
  contact_type?: string | null;
  custom_fields?: Array<{
    content?: object;
    id?: number;
  }> | null;
  date_created?: Date | null;
  email_addresses?: Array<{
    email?: string;
    field?: string;
  }> | null;
  email_opted_in?: boolean | null;
  email_status?: string | null;
  family_name?: string | null;
  fax_numbers?: Array<{
    field?: string;
    number?: string;
    type?: string;
  }> | null;
  given_name?: string | null;
  id?: number | null;
  job_title?: string | null;
  last_updated?: Date | null;
  lead_source_id?: number | null;
  middle_name?: string | null;
  opt_in_reason?: string | null;
  origin?: {
    date?: Date;
    ip_address?: string;
  } | null;
  owner_id?: number | null;
  phone_numbers?: Array<{
    extension?: string;
    field?: string;
    number?: string;
    type?: string;
  }> | null;
  preferred_locale?: string | null;
  preferred_name?: string | null;
  prefix?: string | null;
  relationships?: Array<{
    id?: number;
    linked_contact_id?: number;
    relationship_type_id?: number;
  }> | null;
  social_accounts?: Array<{
    name?: string;
    type?: string;
  }> | null;
  source_type?: string | null;
  spouse_name?: string | null;
  suffix?: string | null;
  tag_ids?: Array<number> | null;
  time_zone?: string | null;
  website?: string | null;
}

type ContactModel = {
  custom_fields: [
    {
      default_value: "string";
      field_name: "string";
      field_type: "Currency";
      id: 0;
      label: "string";
      options: [
        {
          id: "string";
          label: "string";
          options: [
            {
              id: "string";
              label: "string";
              options: object[];
            }
          ];
        }
      ];
      record_type: "CONTACT";
    }
  ];
  optional_properties: ["string"];
};

type CustomField = {
  field_type:
    | "Currency"
    | "Date"
    | "DateTime"
    | "DayOfWeek"
    | "Drilldown"
    | "Email"
    | "Month"
    | "ListBox"
    | "Name"
    | "WholeNumber"
    | "DecimalNumber"
    | "Percent"
    | "PhoneNumber"
    | "Radio"
    | "Dropdown"
    | "SocialSecurityNumber"
    | "State"
    | "Text"
    | "TextArea"
    | "User"
    | "UserListBox"
    | "Website"
    | "Year"
    | "YesNo"; //required
  group_id?: number;
  label: string; //required
  options?: object[];
  user_group_id?: number;
  id?: number;
  record_type?:
    | "CONTACT"
    | "REFERRAL_PARTNER"
    | "OPPORTUNITY"
    | "TASK_NOTE_APPOINTMENT"
    | "COMPANY"
    | "ORDER"
    | "SUBSCRIPTION";
  default_value?: string;
  field_name?: string;
};

type CreditCard = {
  address: ContactAddress;
  card_number: string;
  card_type: string;
  consent_type: string;
  email_address: string;
  expiration_month: string;
  expiration_year: string;
  maestro_issue_number: string;
  maestro_start_date_month: string;
  maestro_start_date_year: string;
  name_on_card: string;
  verification_code: string;
};

type EmailRecord = {
  clicked_date?: string;
  contact_id?: number;
  headers?: string;
  html_content?: string;
  id?: number;
  opened_date?: string;
  original_provider?: "UNKNOWN" | "INFUSIONSOFT" | "MICROSOFT" | "GOOGLE";
  original_provider_id?: string;
  plain_content?: string;
  provider_source_id?: string;
  received_date?: string;
  sent_date?: string;
  sent_from_address?: string;
  sent_from_reply_address?: string;
  sent_to_address?: string; //required
  sent_to_bcc_addresses?: string;
  sent_to_cc_addresses?: string;
  subject?: string;
};

type PaginationWrapper<T, K extends string> = {
  count?: number;
  next?: string;
  previous?: string;
  [key in K]?: T[];
};

type Tag = {
  category: string;
  id: number;
  name: string;
};

type UTM = {
  contactUtmId?: number;
  keapSourceId: string;
  utmCampaign?: string;
  utmContent?: string;
  utmMedium?: string;
  utmSource?: string;
  utmTerm?: string;
};

type AccountInfo = {
  address?: ContactAddress;
  business_goals?: string[];
  business_primary_color?: string;
  business_secondary_color?: string;
  business_type?: string;
  currency_code?: string;
  email?: string;
  language_tag?: string;
  logo_url?: string;
  name?: string;
  phone?: string;
  phone_ext?: string;
  time_zone?: string;
  website?: string;
};

type ContactAddress = {
  country_code: string;
  field: string;
  line1: string;
  line2: string;
  locality: string;
  postal_code: string;
  region: string;
  zip_code: string;
  zip_four: string;
};
