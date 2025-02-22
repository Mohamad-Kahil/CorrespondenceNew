import React, { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { cn } from "../lib/utils";
import {
  CheckCircle,
  XCircle,
  Building2,
  BoxIcon,
  Archive,
} from "lucide-react";

interface Location {
  id: string;
  name: string;
  number: string;
  isAvailable: boolean;
  stores: Store[];
}

interface Store {
  id: string;
  name: string;
  number: string;
  isAvailable: boolean;
  units: Unit[];
}

interface Unit {
  id: string;
  name: string;
  number: string;
  isAvailable: boolean;
}

interface StorageLocationGridProps {
  onLocationSelect?: (location: string) => void;
  selectedLocationId?: string;
}

// Mock data - in real app this would come from your backend
const mockLocations: Location[] = [
  {
    id: "1",
    name: "Main Building",
    number: "01",
    isAvailable: true,
    stores: [
      {
        id: "1-1",
        name: "Ground Floor",
        number: "001",
        isAvailable: true,
        units: [
          { id: "1-1-1", name: "Unit A", number: "0001", isAvailable: true },
          { id: "1-1-2", name: "Unit B", number: "0002", isAvailable: false },
        ],
      },
      {
        id: "1-2",
        name: "First Floor",
        number: "002",
        isAvailable: true,
        units: [
          { id: "1-2-1", name: "Unit C", number: "0003", isAvailable: true },
          { id: "1-2-2", name: "Unit D", number: "0004", isAvailable: true },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "East Wing",
    number: "02",
    isAvailable: true,
    stores: [
      {
        id: "2-1",
        name: "Archive Room 1",
        number: "003",
        isAvailable: true,
        units: [
          { id: "2-1-1", name: "Unit E", number: "0005", isAvailable: true },
          { id: "2-1-2", name: "Unit F", number: "0006", isAvailable: true },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "West Wing",
    number: "03",
    isAvailable: false,
    stores: [],
  },
];

const StorageLocationGrid = ({
  onLocationSelect = () => {},
  selectedLocationId = "",
}: StorageLocationGridProps) => {
  const { t } = useLanguage();
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

  const handleLocationSelect = (location: Location) => {
    if (!location.isAvailable) return;
    setSelectedLocation(location);
    setSelectedStore(null);
    setSelectedUnit(null);
  };

  const handleStoreSelect = (store: Store) => {
    if (!store.isAvailable) return;
    setSelectedStore(store);
    setSelectedUnit(null);
  };

  const handleUnitSelect = (unit: Unit) => {
    if (!unit.isAvailable) return;
    setSelectedUnit(unit);
  };

  const LocationBox = ({ location }: { location: Location }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full h-24 p-4 relative flex flex-col items-start justify-between",
              location.isAvailable
                ? "hover:bg-primary/10 border-primary/20"
                : "bg-muted cursor-not-allowed",
              selectedLocation?.id === location.id && "ring-2 ring-primary",
            )}
            onClick={() => handleLocationSelect(location)}
            disabled={!location.isAvailable}
          >
            <div className="flex items-center gap-2 w-full">
              <Building2 className="h-4 w-4" />
              <span className="font-semibold">{location.name}</span>
            </div>
            <div className="flex justify-between items-center w-full">
              <span className="text-xs text-muted-foreground">
                {location.stores.length} {t("stores")}
              </span>
              {location.isAvailable ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {location.isAvailable
            ? `${t("location")} ${location.name}`
            : t("locationNotAvailable")}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  const StoreBox = ({ store }: { store: Store }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full h-24 p-4 relative flex flex-col items-start justify-between",
              store.isAvailable
                ? "hover:bg-primary/10 border-primary/20"
                : "bg-muted cursor-not-allowed",
              selectedStore?.id === store.id && "ring-2 ring-primary",
            )}
            onClick={() => handleStoreSelect(store)}
            disabled={!store.isAvailable}
          >
            <div className="flex items-center gap-2 w-full">
              <BoxIcon className="h-4 w-4" />
              <span className="font-semibold">{store.name}</span>
            </div>
            <div className="flex justify-between items-center w-full">
              <span className="text-xs text-muted-foreground">
                {store.units.length} {t("units")}
              </span>
              {store.isAvailable ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {store.isAvailable
            ? `${t("store")} ${store.name}`
            : t("storeNotAvailable")}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  const UnitBox = ({ unit }: { unit: Unit }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full h-24 p-4 relative flex flex-col items-start justify-between",
              unit.isAvailable
                ? "hover:bg-primary/10 border-primary/20"
                : "bg-muted cursor-not-allowed",
              selectedUnit?.id === unit.id && "ring-2 ring-primary",
            )}
            onClick={() => handleUnitSelect(unit)}
            disabled={!unit.isAvailable}
          >
            <div className="flex items-center gap-2 w-full">
              <Archive className="h-4 w-4" />
              <span className="font-semibold">{unit.name}</span>
            </div>
            <div className="flex justify-between items-center w-full">
              <span className="text-xs text-muted-foreground">
                {unit.number}
              </span>
              {unit.isAvailable ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {unit.isAvailable
            ? `${t("unit")} ${unit.name}`
            : t("unitNotAvailable")}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <Card className="p-6 bg-card border border-border">
      <header className="p-6 border-b -mx-6 -mt-6 mb-6">
        <h1 className="text-2xl font-semibold">{t("archiveStorage")}</h1>
        <p className="text-muted-foreground mt-2">{t("archiveDescription")}</p>
      </header>

      <div className="grid grid-cols-3 gap-6">
        {/* Locations Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            {t("locations")}
          </h3>
          <div className="space-y-2">
            {mockLocations.map((location) => (
              <LocationBox key={location.id} location={location} />
            ))}
          </div>
        </div>

        {/* Stores Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            {t("stores")}
          </h3>
          <div className="space-y-2">
            {selectedLocation?.stores.map((store) => (
              <StoreBox key={store.id} store={store} />
            )) || (
              <p className="text-sm text-muted-foreground text-center py-4">
                {t("selectLocationFirst")}
              </p>
            )}
          </div>
        </div>

        {/* Units Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            {t("units")}
          </h3>
          <div className="space-y-2">
            {selectedStore?.units.map((unit) => (
              <UnitBox key={unit.id} unit={unit} />
            )) || (
              <p className="text-sm text-muted-foreground text-center py-4">
                {t("selectStoreFirst")}
              </p>
            )}
          </div>
        </div>
      </div>

      {selectedUnit && selectedLocation && selectedStore && (
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">
                {t("selectedLocation")}:
              </p>
              <p className="text-lg font-mono font-bold mt-1">
                L{selectedLocation.number}S{selectedStore.number}U
                {selectedUnit.number}
              </p>
            </div>
            <Button
              onClick={() =>
                onLocationSelect(
                  `L${selectedLocation.number}S${selectedStore.number}U${selectedUnit.number}`,
                )
              }
              className="ml-4"
            >
              {t("selectedLocation")}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default StorageLocationGrid;
