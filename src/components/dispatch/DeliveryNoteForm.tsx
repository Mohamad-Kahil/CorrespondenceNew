import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
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
  deliveryType: z.string().min(1, "Please select a delivery type"),
  trackingNumber: z.string().optional(),
  estimatedDeliveryDate: z.string().min(1, "Please select a delivery date"),
  specialInstructions: z.string().optional(),
  packageDetails: z.string().min(1, "Package details are required"),
});

interface DeliveryNoteFormProps {
  onSubmit?: (data: z.infer<typeof formSchema>) => void;
  defaultValues?: Partial<z.infer<typeof formSchema>>;
}

const DeliveryNoteForm = ({
  onSubmit = (data) => console.log("Form submitted:", data),
  defaultValues = {
    deliveryType: "",
    trackingNumber: "",
    estimatedDeliveryDate: "",
    specialInstructions: "",
    packageDetails: "",
  },
}: DeliveryNoteFormProps) => {
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
              name="deliveryType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("deliveryType")}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("deliveryType")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="standard">
                        {t("standardDelivery")}
                      </SelectItem>
                      <SelectItem value="express">
                        {t("expressDelivery")}
                      </SelectItem>
                      <SelectItem value="courier">
                        {t("courierService")}
                      </SelectItem>
                      <SelectItem value="registered">
                        {t("registeredMail")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="trackingNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("trackingNumber")} ({t("optional")})
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={t("enterTrackingNumber")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="estimatedDeliveryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("estimatedDeliveryDate")}</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="packageDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("packageDetails")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("enterPackageDetails")}
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specialInstructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("specialInstructions")} ({t("optional")})
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("enterSpecialInstructions")}
                      className="min-h-[100px]"
                      {...field}
                    />
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

export default DeliveryNoteForm;
