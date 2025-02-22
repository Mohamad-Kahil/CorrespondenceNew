import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { FileText, Mail, FileSpreadsheet } from "lucide-react";

const templates = [
  {
    id: "formal-letter",
    name: "Formal Letter",
    icon: FileText,
    description: "Standard formal letterhead template",
  },
  {
    id: "business-letter",
    name: "Business Letter",
    icon: FileSpreadsheet,
    description: "Professional business communication",
  },
  {
    id: "memo",
    name: "Internal Memo",
    icon: Mail,
    description: "Internal communication template",
  },
];

interface TemplateSelectorProps {
  onSelect: (templateId: string) => void;
}

const TemplateSelector = ({ onSelect }: TemplateSelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {templates.map((template) => (
        <Card
          key={template.id}
          className="p-6 hover:border-primary/50 cursor-pointer transition-colors"
          onClick={() => onSelect(template.id)}
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-3 rounded-full bg-primary/10">
              <template.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold">{template.name}</h3>
            <p className="text-sm text-muted-foreground">
              {template.description}
            </p>
            <Button variant="outline" className="w-full">
              Use Template
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TemplateSelector;
