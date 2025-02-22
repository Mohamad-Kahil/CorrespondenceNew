import React from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const mockAddresses = [
  {
    address: "L01S001U0001",
    site: "Site 01",
    store: "Store 001",
    unit: "Unit 0001",
    documents: 12,
  },
  {
    address: "L01S001U0002",
    site: "Site 01",
    store: "Store 001",
    unit: "Unit 0002",
    documents: 8,
  },
  {
    address: "L02S003U0005",
    site: "Site 02",
    store: "Store 003",
    unit: "Unit 0005",
    documents: 15,
  },
];

export function StorageAddressList() {
  const { t } = useLanguage();

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">{t("storageAddresses")}</h2>
        <Input placeholder={t("searchAddresses")} className="max-w-xs" />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("address")}</TableHead>
            <TableHead>{t("site")}</TableHead>
            <TableHead>{t("store")}</TableHead>
            <TableHead>{t("unit")}</TableHead>
            <TableHead className="text-right">{t("documents")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockAddresses.map((addr) => (
            <TableRow key={addr.address}>
              <TableCell className="font-mono">{addr.address}</TableCell>
              <TableCell>{addr.site}</TableCell>
              <TableCell>{addr.store}</TableCell>
              <TableCell>{addr.unit}</TableCell>
              <TableCell className="text-right">{addr.documents}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
