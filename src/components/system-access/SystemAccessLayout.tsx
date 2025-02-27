import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { EmployeeTable } from "./EmployeeTable";
import { AuthorizationMatrix } from "./AuthorizationMatrix";
import { OrganizationalChart } from "./OrganizationalChart";

export function SystemAccessLayout() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">System Access Management</h1>

      <Tabs defaultValue="employees" className="space-y-4">
        <TabsList>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="organization">Organization</TabsTrigger>
        </TabsList>

        <TabsContent value="employees">
          <EmployeeTable />
        </TabsContent>

        <TabsContent value="permissions">
          <AuthorizationMatrix />
        </TabsContent>

        <TabsContent value="organization">
          <OrganizationalChart />
        </TabsContent>
      </Tabs>
    </div>
  );
}
