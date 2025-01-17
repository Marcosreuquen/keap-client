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
      default_value: string;
      field_name: string;
      field_type: "Currency";
      id: 0;
      label: string;
      options: [
        {
          id: string;
          label: string;
          options: [
            {
              id: string;
              label: string;
              options: object[];
            }
          ];
        }
      ];
      record_type: "CONTACT";
    }
  ];
  optional_properties: [string];
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

type Pagination = {
  count?: number;
  next?: string;
  previous?: string;
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

interface IAccountInfo {
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
}

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

type OpportunityStage = {
  details: {
    check_list_items: Array<{
      description: string;
      done_date: string;
      id: number;
      instance_id: number;
      item_order: number;
      required: boolean;
    }>;
    probability: number;
    stage_order: number;
    target_num_days: number;
  };
  id: number;
  name: string;
  reasons: Array<string>;
};

type ReferenceContact = {
  company_name?: string;
  email?: string;
  first_name?: string;
  id: number;
  job_title?: string;
  last_name?: string;
  phone_number?: string;
};

interface IOpportunity {
  affiliate_id?: number;
  contact: ReferenceContact;
  custom_fields?: Array<{
    content: object;
    id: number;
  }>;
  date_created?: string;
  estimated_close_date?: string;
  id?: number;
  include_in_forecast?: number;
  last_updated?: string;
  next_action_date?: string;
  next_action_notes?: string;
  opportunity_notes?: string;
  opportunity_title: string;
  projected_revenue_high?: number;
  projected_revenue_low?: number;
  stage: OpportunityStage;
  user?: {
    first_name: string;
    id: number;
    last_name: string;
  };
}

interface IProduct {
  active?: boolean;
  id?: number;
  product_desc?: string;
  product_name: string;
  product_price?: number;
  product_short_desc?: string;
  sku?: string;
  subscription_only?: boolean;
  subscription_plans?: Array<IProductSubscription>;
  url?: string;
}

interface IProductSubscription {
  active?: boolean;
  cycle_type: "DAY" | "WEEK" | "MONTH" | "YEAR";
  frequency?: number;
  id?: number;
  number_of_cycles?: number;
  plan_price: number;
  subscription_plan_index?: number;
  subscription_plan_name?: string;
  url?: string;
}

type ProductsWithPagination = Pagination & {
  products: Product[];
  sync_token?: string;
};

type ContactsWithPagination = Pagination & {
  contacts: Contact[];
};

type EmailsWithPagination = Pagination & {
  emails: EmailRecord[];
};

type TagWithPagination = Pagination & {
  tags: Tag[];
};

type OpportunitiesWithPagination = Pagination & {
  opportunities: Opportunity[];
};

type Base64Image = `data:image/${
  | "png"
  | "gif"
  | "jpg"
  | "jpeg"};base64${string}`;

type ImageName = `${string}.${"png" | "gif" | "jpg" | "jpeg"}`;

interface IAffiliate {
  code?: string;
  contact_id?: number;
  id?: number;
  name?: string;
  notify_on_lead?: boolean;
  notify_on_sale?: boolean;
  parent_id?: number;
  status?: string;
  track_leads_for?: number;
}

interface IOrderItem {
  cost?: number;
  description?: string;
  discount?: number;
  id?: number;
  jobRecurringId?: number;
  name?: string;
  notes?: string;
  price?: number;
  product?: ProductReference;
  quantity?: number;
  specialAmount?: number;
  specialId?: number;
  specialPctOrAmt?: number;
  subscriptionPlan?: IProductSubscription;
  type?: string;
}

type ProductReference = {
  description?: string;
  id?: number;
  name?: string;
  shippable?: boolean;
  sku?: string;
  taxable?: boolean;
};

interface IOrder {
  allow_payment?: boolean;
  allow_paypal?: boolean;
  contact?: ReferenceContact;
  creation_date?: string;
  id?: number;
  invoice_number?: number;
  lead_affiliate_id?: number;
  modification_date?: string;
  notes?: string;
  order_date: string;
  order_items: IOrderItem[];
  order_type: string;
  payment_plan?: PaymentPlan;
  recurring?: boolean;
  refund_total?: number;
  sales_affiliate_id?: number;
  shipping_information?: ShippingInformation;
  source_type?: string;
  status?: string;
  terms?: string;
  title: string;
  total?: number;
  total_due?: number;
  total_paid?: number;
}

type ShippingInformation = {
  city?: string;
  company?: string;
  country?: string;
  first_name?: string;
  id?: number;
  invoiceToCompany?: boolean;
  last_name?: string;
  middle_name?: string;
  phone?: string;
  state?: string;
  street1?: string;
  street2?: string;
  zip?: string;
};

type PaymentPlan = {
  auto_charge?: boolean;
  credit_card_id?: number;
  days_between_payments?: number;
  initial_payment_amount?: number;
  initial_payment_date?: string;
  number_of_payments?: number;
  payment_gateway?: {
    merchant_account_id?: number;
    use_default?: boolean;
  };
  plan_start_date?: string;
};

type OrdersWithPagination = Pagination & {
  orders: IOrder[];
};

type createOrderPayment = {
  apply_to_commissions?: boolean;
  charge_now?: boolean;
  credit_card_id?: number;
  date?: string;
  notes?: string;
  payment_amount?: string;
  payment_gateway_id?: number;
  payment_method_type?: "CREDIT_CARD" | "CASH" | "CHECK" | "TOKEN";
};

interface ISubscription {
  active?: boolean;
  allow_tax?: boolean;
  auto_charge?: boolean;
  billing_amount?: number;
  billing_cycle?: "DAY" | "WEEK" | "MONTH" | "YEAR";
  billing_frequency?: number;
  contact_id?: number;
  credit_card_id?: number;
  end_date?: string;
  id?: number;
  next_bill_date?: string;
  payment_gateway_id?: number;
  product_id?: number;
  quantity?: number;
  sale_affiliate_id?: number;
  start_date?: string;
  subscription_plan_id?: number;
  use_default_payment_gateway?: boolean;
}

type SubscriptionWithPagination = Pagination & {
  subscriptions: ISubscription[];
};

type createSubscription = {
  allow_duplicate?: boolean;
  allow_tax?: boolean;
  auto_charge?: boolean;
  billing_amount?: number;
  contact_id: number;
  credit_card_id?: number;
  first_bill_date?: string;
  payment_gateway_id?: number;
  quantity?: number;
  sale_affiliate_id?: number;
  subscription_plan_id?: number;
};

interface ITransaction {
  amount?: number;
  collection_method?: string;
  contact_id?: number;
  currency?: string;
  errors?: string;
  gateway?: string;
  gateway_account_name?: string;
  id?: number;
  order_ids?: string;
  orders?: IOrder[];
  paymentDate?: string;
  status?: string;
  test?: boolean;
  transaction_date?: string;
  type?: string;
}

type TransactionsWithPagination = Pagination & {
  transactions: ITransaction[];
};


type SendEmailRequest = {
  address_filed?: string;
  attachments?: string[];
  contacts: IContact.id[];
  html_content?: string;
  plain_content?: string;
  subject: string;
  user_id: number;
};

type FileCategory =
  | "Attachments"
  | "Cart"
  | "Documents"
  | "Hidden"
  | "Invoice"
  | "Logo"
  | "Tickets"
  | "WebForm"
  | "Funnel";
type FileBoxType =
  | "Attachment"
  | "DigitalProduct"
  | "Funnel"
  | "LogoThumbnail"
  | "ReSampledImage"
  | "StyledCart"
  | "TemplateThumbnail"
  | "Unlayer"
  | "BrandingCenterLogo";

interface IFile {
  id?: number;
  category?: FileCategory;
  contact_id?: number;
  created_by?: number;
  date_created?: string;
  download_url?: string;
  file_box_type?: FileBoxType;
  file_name?: string;
  file_size?: number;
  last_updated: string;
  public: boolean;
  remote_file_key?: string;
}

type FilesWithPagination = Pagination & {
  files: IFile[];
};

type FileUploadRequest = {
  file_name: string;
  public?: boolean;
  file_data: string;
  contact_id?: number;
  is_public: boolean;
  file_association: "CONTACT" | "USER" | "COMPANY";
};

type FileAssociation = "CONTACT" | "USER" | "COMPANY";

type FileResponse = {
  file_data: string;
  file_descriptor: IFile;
};

interface IUser {
  address?: ContactAddress;
  company_name?: string;
  created_by?: number;
  date_created?: string;
  email_address?: string;
  family_name?: string;
  fax_numbers?: Array<{
    field?: string;
    number?: string;
    type?: string;
  }>;
  given_name?: string;
  global_user_id?: number;
  id?: number;
  infusionsoft_id?: number;
  job_title?: string;
  last_updated?: string;
  last_updated_by?: number;
  middle_name?: string;
  partner?: boolean;
  phone_numbers?: Array<{
    extension?: string;
    field?: string;
    number?: string;
    type?: string;
  }>;
  preferred_name?: string;
  status?: string;
  time_zone?: string;
  website?: string;
}

type UsersWithPagination = Pagination & {
  users: IUser[];
};

type UserCreateRequest = {
  admin?: boolean;
  email: string;
  given_name: string;
  partner?: boolean;
};

interface ApiErrorResponse {
  statusCode: number;
  message: string;
  error?: Throwable; // Adjuntar el objeto Throwable si es necesario
}

interface Throwable {
  cause?: Throwable;
  localizedMessage?: string;
  message?: string;
  stackTrace?: StackTraceElement[];
  suppressed?: Throwable[];
}

interface StackTraceElement {
  classLoaderName?: string;
  className?: string;
  fileName?: string;
  lineNumber?: number; // integer <int32>
  methodName?: string;
  moduleName?: string;
  moduleVersion?: string;
  nativeMethod?: boolean;
}