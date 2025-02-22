import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";
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

const formSchema = z.object({
  recipientName: z.string().min(2, "Name must be at least 2 characters"),
  recipientEmail: z.string().email("Invalid email address"),
  recipientPhone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(1, "Address is required"),
  department: z.string().min(1, "Please select a department"),
});

interface RecipientDetailsFormProps {
  onSubmit?: (data: z.infer<typeof formSchema>) => void;
  defaultValues?: Partial<z.infer<typeof formSchema>>;
}

const RecipientDetailsForm = ({
  onSubmit = (data) => console.log("Form submitted:", data),
  defaultValues = {
    recipientName: "",
    recipientEmail: "",
    recipientPhone: "",
    address: "",
    department: "",
  },
}: RecipientDetailsFormProps) => {
  const { t, language } = useLanguage();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Card className="w-full max-w-2xl p-6 bg-card border border-border">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="recipientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("recipientName")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("recipientName")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="recipientEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("email")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("enterEmail")}
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="recipientPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("phone")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("phone")} {...field} />
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
                  <FormLabel>{t("department")}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("department")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="hr">{t("hr")}</SelectItem>
                      <SelectItem value="finance">{t("finance")}</SelectItem>
                      <SelectItem value="it">{t("it")}</SelectItem>
                      <SelectItem value="legal">{t("legal")}</SelectItem>
                      <SelectItem value="operations">
                        {t("operations")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("address")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("address")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div
            className={cn(
              "flex gap-4",
              language === "ar" ? "justify-start" : "justify-end",
            )}
          >
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              className={cn(language === "ar" && "flex-row-reverse gap-2")}
            >
              {t("reset")}
            </Button>
            <Button
              type="submit"
              className={cn(language === "ar" && "flex-row-reverse gap-2")}
            >
              {t("continue")}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default RecipientDetailsForm;
