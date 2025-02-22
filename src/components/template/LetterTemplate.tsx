import React, { useState } from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { NewWorkflow } from "../workflow/NewWorkflow";

interface LetterTemplateProps {
  type: "formal" | "business" | "memo";
  onCancel: () => void;
}

const LetterTemplate = ({ type = "formal", onCancel }: LetterTemplateProps) => {
  const [formData, setFormData] = useState({
    reference: "",
    date: "",
    to: "",
    title: "",
    subject: "",
    body: "",
    senderName: "",
    senderTitle: "",
    department: "",
  });
  const [showWorkflow, setShowWorkflow] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setFormData({
      reference: "",
      date: "",
      to: "",
      title: "",
      subject: "",
      body: "",
      senderName: "",
      senderTitle: "",
      department: "",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <Card className="p-8 space-y-6 print:shadow-none print:border-none">
          {/* Company Header */}
          <div className="text-center mb-8 print:mb-12">
            <img
              src="https://api.dicebear.com/7.x/initials/svg?seed=Company"
              alt="Company Logo"
              className="h-16 mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-primary">Company Name</h1>
            <p className="text-muted-foreground">
              123 Business Street, City, Country
            </p>
            <p className="text-muted-foreground">
              Phone: (123) 456-7890 • Email: info@company.com
            </p>
          </div>

          {/* Letter Content */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Reference No.</Label>
                <Input
                  placeholder="Enter reference number"
                  className="print:border-none"
                  value={formData.reference}
                  onChange={(e) => handleChange("reference", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  className="print:border-none"
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                />
              </div>
            </div>

            {type !== "memo" && (
              <div className="space-y-2">
                <Label>To</Label>
                <Input
                  placeholder="Recipient's name"
                  className="print:border-none"
                  value={formData.to}
                  onChange={(e) => handleChange("to", e.target.value)}
                />
              </div>
            )}

            {type === "formal" && (
              <div className="space-y-2">
                <Label>Title/Position</Label>
                <Input
                  placeholder="Recipient's title"
                  className="print:border-none"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>Subject</Label>
              <Input
                placeholder="Letter subject"
                className="print:border-none"
                value={formData.subject}
                onChange={(e) => handleChange("subject", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Body</Label>
              <Textarea
                placeholder={
                  type === "memo"
                    ? "Enter memo content"
                    : "Enter letter content"
                }
                className="min-h-[200px] print:border-none"
                value={formData.body}
                onChange={(e) => handleChange("body", e.target.value)}
              />
            </div>

            {type !== "memo" && (
              <>
                <div className="space-y-2">
                  <Label>Sender's Name</Label>
                  <Input
                    placeholder="Your name"
                    className="print:border-none"
                    value={formData.senderName}
                    onChange={(e) => handleChange("senderName", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Sender's Title</Label>
                  <Input
                    placeholder="Your title"
                    className="print:border-none"
                    value={formData.senderTitle}
                    onChange={(e) =>
                      handleChange("senderTitle", e.target.value)
                    }
                  />
                </div>
              </>
            )}

            {type === "memo" && (
              <div className="space-y-2">
                <Label>From</Label>
                <Input
                  placeholder="Your department"
                  className="print:border-none"
                  value={formData.department}
                  onChange={(e) => handleChange("department", e.target.value)}
                />
              </div>
            )}
          </div>
        </Card>

        <div className="flex justify-end gap-4 print:hidden">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handlePrint}>
            Print {type === "memo" ? "Memo" : "Letter"}
          </Button>
          <Button onClick={() => setShowWorkflow(true)} variant="default">
            Start Workflow
          </Button>
        </div>
      </div>

      <NewWorkflow
        open={showWorkflow}
        onOpenChange={setShowWorkflow}
        initialDocument={{
          name: `${type}-${formData.reference || "no-ref"}.pdf`,
          content: formData,
        }}
      />
    </>
  );
};

export default LetterTemplate;
