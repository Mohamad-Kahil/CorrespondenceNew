import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface AddOrganizationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddOrganization: (organization: any) => void;
}

const formSchema = z.object({
  // Organization Overview
  id: z.string().min(1, "Organization ID is required"),
  name: z.string().min(2, "Organization name is required"),
  shortName: z.string().min(1, "Short name is required"),
  type: z.string().min(1, "Organization type is required"),
  region: z.string().min(1, "Region is required"),
  parentOrganization: z.string().optional(),
  securityClassification: z
    .string()
    .min(1, "Security classification is required"),

  // Designated Personnel
  personnelId: z.string().optional(),
  personnelName: z.string().optional(),
  personnelPosition: z.string().optional(),
  personnelDepartment: z.string().optional(),
  personnelEmail: z.string().email("Invalid email").optional(),
  personnelSecondaryEmail: z.string().email("Invalid email").optional(),
  personnelPhone: z.string().optional(),
  personnelMobile: z.string().optional(),
  personnelFax: z.string().optional(),
  personnelAddressRef: z.string().optional(),
  personnelSecurityClearance: z.string().optional(),
  personnelAuthorizationLevel: z.string().optional(),
  personnelSystemRoles: z.string().optional(),
  personnelStatus: z.string().optional(),

  // Office Addresses
  addressId: z.string().optional(),
  addressName: z.string().optional(),
  fullAddress: z.string().optional(),
  addressPhone: z.string().optional(),

  // Additional Information
  preferredLanguage: z.string().optional(),
  timeZone: z.string().optional(),
  businessHours: z.string().optional(),
  notes: z.string().optional(),
});

export function AddOrganizationDialog({
  open,
  onOpenChange,
  onAddOrganization,
}: AddOrganizationDialogProps) {
  const { t } = useLanguage();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
      shortName: "",
      type: "",
      region: "",
      parentOrganization: "",
      securityClassification: "",
      personnelId: "",
      personnelName: "",
      personnelPosition: "",
      personnelDepartment: "",
      personnelEmail: "",
      personnelSecondaryEmail: "",
      personnelPhone: "",
      personnelMobile: "",
      personnelFax: "",
      personnelAddressRef: "",
      personnelSecurityClearance: "",
      personnelAuthorizationLevel: "",
      personnelSystemRoles: "",
      personnelStatus: "Active",
      addressId: "",
      addressName: "",
      fullAddress: "",
      addressPhone: "",
      preferredLanguage: "",
      timeZone: "",
      businessHours: "",
      notes: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Transform form data to match organization data structure
    const newOrganization = {
      id: data.id,
      name: data.name,
      shortName: data.shortName,
      type: data.type,
      region: data.region,
      parentOrganization: data.parentOrganization || null,
      securityClassification: data.securityClassification,
      designatedPersonnel: data.personnelId
        ? [
            {
              id: data.personnelId,
              fullName: data.personnelName,
              position: data.personnelPosition,
              department: data.personnelDepartment,
              contact: {
                primaryEmail: data.personnelEmail,
                secondaryEmail: data.personnelSecondaryEmail,
                phone: data.personnelPhone,
                mobile: data.personnelMobile,
                fax: data.personnelFax,
              },
              officeAddressRef: data.personnelAddressRef,
              accessLevel: {
                securityClearance: data.personnelSecurityClearance,
                authorizationLevel: data.personnelAuthorizationLevel,
                systemRoles:
                  data.personnelSystemRoles
                    ?.split(",")
                    .map((role) => role.trim()) || [],
              },
              status: data.personnelStatus,
            },
          ]
        : [],
      officeAddresses: data.addressId
        ? [
            {
              id: data.addressId,
              name: data.addressName,
              fullAddress: data.fullAddress,
              contact: {
                phone: data.addressPhone,
              },
            },
          ]
        : [],
      additionalInformation: {
        preferredLanguage: data.preferredLanguage,
        timeZone: data.timeZone,
        businessHours: data.businessHours,
        notes: data.notes,
      },
    };

    onAddOrganization(newOrganization);
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-4xl max-h-[90vh] overflow-auto"
        dir={t("direction")}
      >
        <DialogHeader>
          <DialogTitle>
            {t("addNewOrganization") || "Add New Organization"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs
              defaultValue="overview"
              className="w-full"
              dir={t("direction") === "rtl" ? "rtl" : "ltr"}
            >
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="overview">
                  {t("organizationOverview") || "Organization Overview"}
                </TabsTrigger>
                <TabsTrigger value="personnel">
                  {t("designatedPersonnel") || "Designated Personnel"}
                </TabsTrigger>
                <TabsTrigger value="addresses">
                  {t("officeAddresses") || "Office Addresses"}
                </TabsTrigger>
                <TabsTrigger value="additional">
                  {t("additionalInformation") || "Additional Information"}
                </TabsTrigger>
              </TabsList>

              {/* Organization Overview Tab */}
              <TabsContent value="overview" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("organizationId") || "Organization ID"}
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="ORG-001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("organizationName") || "Organization Name"}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ministry of Interior"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shortName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("shortName") || "Short Name"}</FormLabel>
                        <FormControl>
                          <Input placeholder="MOI" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("organizationType") || "Organization Type"}
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={t("selectType") || "Select type"}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Ministry">
                              {t("ministry") || "Ministry"}
                            </SelectItem>
                            <SelectItem value="Government Agency">
                              {t("governmentAgency") || "Government Agency"}
                            </SelectItem>
                            <SelectItem value="Corporation">
                              {t("corporation") || "Corporation"}
                            </SelectItem>
                            <SelectItem value="NGO">
                              {t("ngo") || "NGO"}
                            </SelectItem>
                            <SelectItem value="Foreign Entity">
                              {t("foreignEntity") || "Foreign Entity"}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="region"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("region") || "Region"}</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={
                                  t("selectRegion") || "Select region"
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Kuwait">
                              {t("kuwait") || "Kuwait"}
                            </SelectItem>
                            <SelectItem value="Saudi Arabia">
                              {t("saudiArabia") || "Saudi Arabia"}
                            </SelectItem>
                            <SelectItem value="UAE">
                              {t("uae") || "UAE"}
                            </SelectItem>
                            <SelectItem value="Qatar">
                              {t("qatar") || "Qatar"}
                            </SelectItem>
                            <SelectItem value="Bahrain">
                              {t("bahrain") || "Bahrain"}
                            </SelectItem>
                            <SelectItem value="Oman">
                              {t("oman") || "Oman"}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="parentOrganization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("parentOrganization") || "Parent Organization"}
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="ORG-000 (optional)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="securityClassification"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("securityClassification") ||
                            "Security Classification"}
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={
                                  t("selectClassification") ||
                                  "Select classification"
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Top Secret">
                              {t("topSecret") || "Top Secret"}
                            </SelectItem>
                            <SelectItem value="Secret">
                              {t("secret") || "Secret"}
                            </SelectItem>
                            <SelectItem value="Confidential">
                              {t("confidential") || "Confidential"}
                            </SelectItem>
                            <SelectItem value="Restricted">
                              {t("restricted") || "Restricted"}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              {/* Designated Personnel Tab */}
              <TabsContent value="personnel" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="personnelId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("personnelId") || "Personnel ID"}
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="PER-00123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="personnelName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("fullName") || "Full Name"}</FormLabel>
                        <FormControl>
                          <Input placeholder="John Smith" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="personnelPosition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("position") || "Position"}</FormLabel>
                        <FormControl>
                          <Input placeholder="Director" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="personnelDepartment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("departmentField") || "Department"}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="International Relations"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">
                    {t("contactInformation") || "Contact Information"}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="personnelEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t("primaryEmail") || "Primary Email"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="john.smith@moi.gov.kw"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="personnelSecondaryEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t("secondaryEmail") || "Secondary Email"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="john.smith@gmail.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="personnelPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("phoneField") || "Phone"}</FormLabel>
                          <FormControl>
                            <Input placeholder="+965-2222-3333" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="personnelMobile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("mobileLabel") || "Mobile"}</FormLabel>
                          <FormControl>
                            <Input placeholder="+965-9999-8888" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="personnelFax"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("fax") || "Fax"}</FormLabel>
                          <FormControl>
                            <Input placeholder="+965-2222-4444" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="personnelAddressRef"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t("officeAddressRef") || "Office Address Ref"}
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="ADDR-001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">
                    {t("accessLevel") || "Access Level"}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="personnelSecurityClearance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t("securityClearance") || "Security Clearance"}
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={
                                    t("selectSecurityClearance") ||
                                    "Select security clearance"
                                  }
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="5">
                                {t("level")} 5 ({t("highest")})
                              </SelectItem>
                              <SelectItem value="4">{t("level")} 4</SelectItem>
                              <SelectItem value="3">{t("level")} 3</SelectItem>
                              <SelectItem value="2">{t("level")} 2</SelectItem>
                              <SelectItem value="1">
                                {t("level")} 1 ({t("lowest")})
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="personnelAuthorizationLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t("authorizationLevelField") ||
                              "Authorization Level"}
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={
                                    t("selectAuthorizationLevel") ||
                                    "Select authorization level"
                                  }
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Top Secret">
                                {t("topSecret") || "Top Secret"}
                              </SelectItem>
                              <SelectItem value="Secret">
                                {t("secret") || "Secret"}
                              </SelectItem>
                              <SelectItem value="Confidential">
                                {t("confidential") || "Confidential"}
                              </SelectItem>
                              <SelectItem value="Restricted">
                                {t("restricted") || "Restricted"}
                              </SelectItem>
                              <SelectItem value="Unclassified">
                                {t("unclassified") || "Unclassified"}
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="personnelSystemRoles"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>
                            {t("systemRoles") || "System Roles"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Admin, User, Approver (comma separated)"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="personnelStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("status") || "Status"}</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={
                                    t("selectStatus") || "Select status"
                                  }
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Active">
                                {t("active") || "Active"}
                              </SelectItem>
                              <SelectItem value="Retired">
                                {t("retired") || "Retired"}
                              </SelectItem>
                              <SelectItem value="Reassigned">
                                {t("reassigned") || "Reassigned"}
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Office Addresses Tab */}
              <TabsContent value="addresses" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="addressId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("addressId") || "Address ID"}</FormLabel>
                        <FormControl>
                          <Input placeholder="ADDR-001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="addressName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("addressName") || "Address Name"}
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Headquarters" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fullAddress"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>
                          {t("fullAddress") || "Full Address"}
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Block 1, Street 2, Building 3, Floor 4, Kuwait City, Kuwait"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="addressPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("phoneField") || "Phone"}</FormLabel>
                        <FormControl>
                          <Input placeholder="+965-2222-3333" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              {/* Additional Information Tab */}
              <TabsContent value="additional" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="preferredLanguage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("preferredLanguage") || "Preferred Language"}
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={
                                  t("selectLanguage") || "Select language"
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Arabic">
                              {t("arabic") || "Arabic"}
                            </SelectItem>
                            <SelectItem value="English">
                              {t("english") || "English"}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="timeZone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("timeZone") || "Time Zone"}</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={
                                  t("selectTimeZone") || "Select time zone"
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Kuwait/Riyadh">
                              {t("kuwaitRiyadh") || "Kuwait/Riyadh (GMT+3)"}
                            </SelectItem>
                            <SelectItem value="UAE">
                              {t("uaeTimeZone") || "UAE (GMT+4)"}
                            </SelectItem>
                            <SelectItem value="UK">
                              {t("ukTimeZone") || "UK (GMT+0)"}
                            </SelectItem>
                            <SelectItem value="Asia">
                              {t("asiaTimeZone") || "Asia (Various)"}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="businessHours"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("businessHours") || "Business Hours"}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Sunday-Thursday: 08:00-16:00"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>{t("notes") || "Notes"}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Additional notes about the organization"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                {t("cancelAction") || "Cancel"}
              </Button>
              <Button type="submit">
                {t("addOrganization") || "Add Organization"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
