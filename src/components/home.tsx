import React from "react";
import DocumentIntakeWizard from "./DocumentIntakeWizard";

const Home = () => {
  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="p-6 border-b">
          <h1 className="text-2xl font-semibold">Document Intake System</h1>
          <p className="text-muted-foreground mt-2">
            Process and manage physical documents through our digital system
          </p>
        </header>

        <main>
          <DocumentIntakeWizard
            onComplete={(data) => {
              console.log("Document intake completed:", data);
            }}
          />
        </main>
      </div>
    </div>
  );
};

export default Home;
