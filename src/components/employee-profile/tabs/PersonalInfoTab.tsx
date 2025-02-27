import React from "react";
import { Card } from "../../ui/card";
import { Separator } from "../../ui/separator";

interface PersonalInfoTabProps {
  employee: any;
}

export function PersonalInfoTab({ employee }: PersonalInfoTabProps) {
  const { personalInfo } = employee;

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Personal Information</h3>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Employee ID
            </h4>
            <p>{employee.id}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Full Name
            </h4>
            <p>{personalInfo.fullName}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Preferred Name
            </h4>
            <p>{personalInfo.preferredName}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Date of Birth
            </h4>
            <p>{personalInfo.dateOfBirth}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Gender
            </h4>
            <p>{personalInfo.gender}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              Contact Information
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p>{personalInfo.contact.email}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Mobile</p>
                <p>{personalInfo.contact.mobile}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p>{personalInfo.contact.phone}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Country</p>
                <p>{personalInfo.contact.country}</p>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-xs text-muted-foreground">Address</p>
              <p>
                {personalInfo.contact.address}, {personalInfo.contact.city},{" "}
                {personalInfo.contact.postCode}
              </p>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              Emergency Contact
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Name</p>
                <p>{personalInfo.emergencyContact.name}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Relationship</p>
                <p>{personalInfo.emergencyContact.relationship}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Mobile</p>
                <p>{personalInfo.emergencyContact.mobile}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p>{personalInfo.emergencyContact.phone}</p>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-xs text-muted-foreground">Description</p>
              <p>{personalInfo.emergencyContact.description}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
