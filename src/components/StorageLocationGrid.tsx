import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { cn } from "../lib/utils";
import { CheckCircle, XCircle } from "lucide-react";

interface StorageLocation {
  id: string;
  row: number;
  column: number;
  isAvailable: boolean;
  label: string;
}

interface StorageLocationGridProps {
  locations?: StorageLocation[];
  onLocationSelect?: (location: StorageLocation) => void;
  selectedLocationId?: string;
}

const defaultLocations: StorageLocation[] = [
  { id: "1", row: 0, column: 0, isAvailable: true, label: "A1" },
  { id: "2", row: 0, column: 1, isAvailable: false, label: "A2" },
  { id: "3", row: 0, column: 2, isAvailable: true, label: "A3" },
  { id: "4", row: 1, column: 0, isAvailable: true, label: "B1" },
  { id: "5", row: 1, column: 1, isAvailable: true, label: "B2" },
  { id: "6", row: 1, column: 2, isAvailable: false, label: "B3" },
  { id: "7", row: 2, column: 0, isAvailable: true, label: "C1" },
  { id: "8", row: 2, column: 1, isAvailable: true, label: "C2" },
  { id: "9", row: 2, column: 2, isAvailable: true, label: "C3" },
];

const StorageLocationGrid = ({
  locations = defaultLocations,
  onLocationSelect = () => {},
  selectedLocationId = "",
}: StorageLocationGridProps) => {
  // Get the maximum row and column numbers to determine grid dimensions
  const maxRow = Math.max(...locations.map((loc) => loc.row));
  const maxColumn = Math.max(...locations.map((loc) => loc.column));

  // Create a 2D array to represent the grid
  const grid = Array(maxRow + 1)
    .fill(null)
    .map(() => Array(maxColumn + 1).fill(null));

  // Fill the grid with locations
  locations.forEach((location) => {
    grid[location.row][location.column] = location;
  });

  return (
    <Card className="p-6 bg-card border border-border">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-foreground">
          Storage Location Grid
        </h2>
        <p className="text-muted-foreground">
          Select an available storage location
        </p>
      </div>

      <div className="grid gap-4">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-4">
            {row.map((location, colIndex) => (
              <TooltipProvider key={`${rowIndex}-${colIndex}`}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-24 h-24 p-2 relative",
                        location?.isAvailable
                          ? "hover:bg-primary/10 border-primary/20"
                          : "bg-muted cursor-not-allowed",
                        location?.id === selectedLocationId &&
                          "ring-2 ring-blue-500",
                      )}
                      onClick={() => {
                        if (location?.isAvailable) {
                          onLocationSelect(location);
                        }
                      }}
                      disabled={!location?.isAvailable}
                    >
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-lg font-bold">
                          {location?.label || "-"}
                        </span>
                        {location &&
                          (location.isAvailable ? (
                            <CheckCircle className="w-6 h-6 text-green-500 mt-2" />
                          ) : (
                            <XCircle className="w-6 h-6 text-red-500 mt-2" />
                          ))}
                      </div>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {location
                      ? `Location ${location.label} - ${location.isAvailable ? "Available" : "Occupied"}`
                      : "No location"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-4 items-center text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <XCircle className="w-4 h-4 text-red-500" />
          <span>Occupied</span>
        </div>
      </div>
    </Card>
  );
};

export default StorageLocationGrid;
