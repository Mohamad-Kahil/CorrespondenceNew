import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
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

interface AddEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddEmployee: (employee: any) => void;
}

const formSchema = z.object({
  // Personal Info
  id: z.string().min(1, "Employee ID is required"),
  fullName: z.string().min(2, "Full name is required"),
  preferredName: z.string().optional(),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(1, "Mobile number is required"),
  phone: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  postCode: z.string().min(1, "Post code is required"),
  emergencyContactName: z.string().min(1, "Emergency contact name is required"),
  emergencyContactRelationship: z.string().min(1, "Relationship is required"),
  emergencyContactDescription: z.string().optional(),
  emergencyContactMobile: z
    .string()
    .min(1, "Emergency contact mobile is required"),
  emergencyContactPhone: z.string().optional(),

  // Education
  highestDegree: z.string().min(1, "Highest degree is required"),
  institution: z.string().min(1, "Institution is required"),
  graduationYear: z.string().min(1, "Graduation year is required"),
  major: z.string().min(1, "Major is required"),

  // Experience
  currentPosition: z.string().min(1, "Current position is required"),
  department: z.string().min(1, "Department is required"),
  hireDate: z.string().min(1, "Hire date is required"),
  employmentType: z.string().min(1, "Employment type is required"),
  manager: z.string().optional(),

  // Access Level
  securityClearance: z.string().min(1, "Security clearance is required"),
  authorizationLevel: z.string().min(1, "Authorization level is required"),
  systemRoles: z.string().min(1, "System roles are required"),
  lastAccessReview: z.string().optional(),

  // HR & Administrative
  salary: z.string().min(1, "Salary is required"),
  benefits: z.string().min(1, "Benefits are required"),
  status: z.string().min(1, "Status is required"),
  notes: z.string().optional(),
});

export function AddEmployeeDialog({
  open,
  onOpenChange,
  onAddEmployee,
}: AddEmployeeDialogProps) {
  const { t } = useLanguage();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      fullName: "",
      preferredName: "",
      dateOfBirth: "",
      gender: "",
      email: "",
      mobile: "",
      phone: "",
      address: "",
      city: "",
      country: "",
      postCode: "",
      emergencyContactName: "",
      emergencyContactRelationship: "",
      emergencyContactDescription: "",
      emergencyContactMobile: "",
      emergencyContactPhone: "",
      highestDegree: "",
      institution: "",
      graduationYear: "",
      major: "",
      currentPosition: "",
      department: "",
      hireDate: "",
      employmentType: "",
      manager: "",
      securityClearance: "",
      authorizationLevel: "",
      systemRoles: "",
      lastAccessReview: "",
      salary: "",
      benefits: "",
      status: "Active",
      notes: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Transform form data to match employee data structure
    const newEmployee = {
      id: data.id,
      personalInfo: {
        fullName: data.fullName,
        preferredName: data.preferredName || data.fullName,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        contact: {
          email: data.email,
          mobile: data.mobile,
          phone: data.phone,
          address: data.address,
          city: data.city,
          country: data.country,
          postCode: data.postCode,
        },
        emergencyContact: {
          name: data.emergencyContactName,
          relationship: data.emergencyContactRelationship,
          description: data.emergencyContactDescription,
          mobile: data.emergencyContactMobile,
          phone: data.emergencyContactPhone,
        },
        profilePhoto: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.fullName.replace(/ /g, "")}`,
      },
      education: {
        highestDegree: data.highestDegree,
        institution: data.institution,
        graduationYear: parseInt(data.graduationYear),
        major: data.major,
        additionalCertifications: [],
      },
      experience: {
        currentPosition: data.currentPosition,
        department: data.department,
        hireDate: data.hireDate,
        employmentType: data.employmentType,
        manager: data.manager || null,
        previousExperience: [],
      },
      accessLevel: {
        securityClearance: parseInt(data.securityClearance),
        authorizationLevel: data.authorizationLevel,
        systemRoles: data.systemRoles.split(",").map((role) => role.trim()),
        lastAccessReview:
          data.lastAccessReview || new Date().toISOString().split("T")[0],
      },
      performanceAndSkills: {
        performanceReviews: [],
        skills: [],
        trainingCompleted: [],
      },
      hrAndAdministrative: {
        salary: parseInt(data.salary),
        benefits: data.benefits.split(",").map((benefit) => benefit.trim()),
        status: data.status,
        terminationDate: null,
        notes: data.notes,
      },
    };

    onAddEmployee(newEmployee);
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
          <DialogTitle>{t("addNewEmployee") || "Add New Employee"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs
              defaultValue="personal"
              className="w-full"
              dir={t("direction") === "rtl" ? "rtl" : "ltr"}
            >
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="personal">
                  {t("personalInfo") || "Personal Info"}
                </TabsTrigger>
                <TabsTrigger value="education">
                  {t("education") || "Education"}
                </TabsTrigger>
                <TabsTrigger value="experience">
                  {t("experience") || "Experience"}
                </TabsTrigger>
                <TabsTrigger value="access">
                  {t("accessLevel") || "Access Level"}
                </TabsTrigger>
                <TabsTrigger value="hr">
                  {t("hrAdmin") || "HR & Admin"}
                </TabsTrigger>
              </TabsList>

              {/* Personal Information Tab */}
              <TabsContent value="personal" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("employeeIdLabel") || "Employee ID"}
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="EMP001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fullName"
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
                    name="preferredName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("preferredName") || "Preferred Name"}
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Johnny" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("dateOfBirth") || "Date of Birth"}
                        </FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("gender") || "Gender"}</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={
                                  t("selectGender") || "Select gender"
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Male">
                              {t("male") || "Male"}
                            </SelectItem>
                            <SelectItem value="Female">
                              {t("female") || "Female"}
                            </SelectItem>
                          </SelectContent>
                        </Select>
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
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("emailField") || "Email"}</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="john.smith@company.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="mobile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("mobileLabel") || "Mobile"}</FormLabel>
                          <FormControl>
                            <Input placeholder="+1-555-123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("phoneField") || "Phone"}</FormLabel>
                          <FormControl>
                            <Input placeholder="+1-555-987-6543" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t("addressField") || "Address"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="123 Main Street, Apt 4B"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("city") || "City"}</FormLabel>
                          <FormControl>
                            <Input placeholder="Chicago" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("country") || "Country"}</FormLabel>
                          <FormControl>
                            <Input placeholder="United States" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="postCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("postCode") || "Post Code"}</FormLabel>
                          <FormControl>
                            <Input placeholder="60601" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">
                    {t("emergencyContact") || "Emergency Contact"}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="emergencyContactName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("nameLabel") || "Name"}</FormLabel>
                          <FormControl>
                            <Input placeholder="Sarah Smith" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="emergencyContactRelationship"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {t("relationship") || "Relationship"}
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Spouse" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="emergencyContactMobile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("mobileLabel") || "Mobile"}</FormLabel>
                          <FormControl>
                            <Input placeholder="+1-555-765-4321" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="emergencyContactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("phoneField") || "Phone"}</FormLabel>
                          <FormControl>
                            <Input placeholder="+1-555-234-5678" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="emergencyContactDescription"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>
                            {t("descriptionText") || "Description"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Wife, works at Memorial Hospital"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Education Tab */}
              <TabsContent value="education" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="highestDegree"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("highestDegree") || "Highest Degree"}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Master of Business Administration"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="institution"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("institution") || "Institution"}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Harvard Business School"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="graduationYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("graduationYear") || "Graduation Year"}
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="2010" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="major"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("major") || "Major/Field of Study"}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Business Administration"
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
                    {t("additionalCertifications") ||
                      "Additional Certifications"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("certificationsNote") ||
                      "Certifications can be added after creating the employee profile."}
                  </p>
                </div>
              </TabsContent>

              {/* Experience Tab */}
              <TabsContent value="experience" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="currentPosition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("currentPosition") || "Current Position"}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Chief Executive Officer"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("departmentField") || "Department"}
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={
                                  t("selectDepartmentAction") ||
                                  "Select department"
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Executive">
                              {t("executive") || "Executive"}
                            </SelectItem>
                            <SelectItem value="Finance">
                              {t("financeField") || "Finance"}
                            </SelectItem>
                            <SelectItem value="Technology">
                              {t("technologyField") || "Technology"}
                            </SelectItem>
                            <SelectItem value="Human Resources">
                              {t("humanResources") || "Human Resources"}
                            </SelectItem>
                            <SelectItem value="Operations">
                              {t("operationsField") || "Operations"}
                            </SelectItem>
                            <SelectItem value="Marketing">
                              {t("marketing") || "Marketing"}
                            </SelectItem>
                            <SelectItem value="Sales">
                              {t("sales") || "Sales"}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hireDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("hireDate") || "Hire Date"}</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="employmentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("employmentType") || "Employment Type"}
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={
                                  t("selectEmploymentType") ||
                                  "Select employment type"
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Full-time">
                              {t("fullTime") || "Full-time"}
                            </SelectItem>
                            <SelectItem value="Part-time">
                              {t("partTime") || "Part-time"}
                            </SelectItem>
                            <SelectItem value="Contract">
                              {t("contractType") || "Contract"}
                            </SelectItem>
                            <SelectItem value="Temporary">
                              {t("temporary") || "Temporary"}
                            </SelectItem>
                            <SelectItem value="Intern">
                              {t("intern") || "Intern"}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="manager"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("managerRole") || "Manager"}</FormLabel>
                        <FormControl>
                          <Input placeholder="EMP001 (optional)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">
                    {t("previousExperience") || "Previous Experience"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t("experienceNote") ||
                      "Previous experience can be added after creating the employee profile."}
                  </p>
                </div>
              </TabsContent>

              {/* Access Level Tab */}
              <TabsContent value="access" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="securityClearance"
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
                    name="authorizationLevel"
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
                    name="systemRoles"
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
                    name="lastAccessReview"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t("lastAccessReview") || "Last Access Review"}
                        </FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              {/* HR & Administrative Tab */}
              <TabsContent value="hr" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("salary") || "Salary"}</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="75000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
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
                            <SelectItem value="On Leave">
                              {t("onLeave") || "On Leave"}
                            </SelectItem>
                            <SelectItem value="Terminated">
                              {t("terminated") || "Terminated"}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="benefits"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>{t("benefits") || "Benefits"}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Health Insurance, 401(k) Matching, Paid Time Off (comma separated)"
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
                            placeholder="Additional notes about the employee"
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
                {t("addEmployee") || "Add Employee"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
