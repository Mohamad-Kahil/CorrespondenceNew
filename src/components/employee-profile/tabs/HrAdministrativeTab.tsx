import React from "react";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Separator } from "../../ui/separator";

interface HrAdministrativeTabProps {
  employee: any;
}

export function HrAdministrativeTab({ employee }: HrAdministrativeTabProps) {
  const { hrAndAdministrative } = employee;

  // Function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Function to get badge color based on status
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "On Leave":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Terminated":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "";
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">HR & Administrative</h3>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Salary
            </h4>
            <p>{formatCurrency(hrAndAdministrative.salary)}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              Status
            </h4>
            <Badge className={getStatusBadgeColor(hrAndAdministrative.status)}>
              {hrAndAdministrative.status}
            </Badge>
          </div>

          {hrAndAdministrative.terminationDate && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">
                Termination Date
              </h4>
              <p>{hrAndAdministrative.terminationDate}</p>
            </div>
          )}
        </div>

        <Separator />

        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">
            Benefits
          </h4>
          <div className="flex flex-wrap gap-2">
            {hrAndAdministrative.benefits.map(
              (benefit: string, index: number) => (
                <Badge key={index} variant="secondary">
                  {benefit}
                </Badge>
              ),
            )}
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">
            Notes
          </h4>
          <p className="text-sm p-3 bg-muted/30 rounded-md">
            {hrAndAdministrative.notes}
          </p>
        </div>
      </div>
    </Card>
  );
}
