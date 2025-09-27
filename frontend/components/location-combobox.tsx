"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronsUpDown, MapPin } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type Location = {
  id: string;
  name: string;
};

type LocationComboboxProps = {
  locations: Location[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  label: string;
  disabled?: boolean;
  excludeId?: string;
};

export function LocationCombobox({
  locations,
  value,
  onValueChange,
  placeholder,
  label,
  disabled = false,
  excludeId,
}: LocationComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const selectedLocation = locations.find(location => location.id === value);

  const filteredLocations = locations
    .filter((location) => {
      const matchesSearch = location.name.toLowerCase().includes(searchValue.toLowerCase());
      const isNotExcluded = !excludeId || location.id !== excludeId;
      return matchesSearch && isNotExcluded;
    })
    .sort((a, b) => {
      if (a.id === "1")
        return -1;
      if (b.id === "1")
        return 1;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-foreground">
        <MapPin className="h-4 w-4 text-primary" />
        {label}
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-12 px-4 text-left font-normal transition-all duration-200 hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 bg-transparent"
            disabled={disabled}
          >
            <motion.span initial={false} animate={{ opacity: selectedLocation ? 1 : 0.7 }} className="truncate">
              {selectedLocation ? selectedLocation.name : placeholder}
            </motion.span>
            <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </motion.div>
          </Button>
        </PopoverTrigger>
        <AnimatePresence>
          {open && (
            <PopoverContent className="w-(--radix-popover-trigger-width) p-0" align="start" asChild>
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                <Command>
                  <CommandInput
                    placeholder={`Search ${label.toLowerCase()}...`}
                    value={searchValue}
                    onValueChange={setSearchValue}
                    className="h-9"
                  />

                  <CommandList>
                    <CommandEmpty>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="py-6 text-center text-sm text-muted-foreground"
                      >
                        No locations found.
                      </motion.div>
                    </CommandEmpty>
                    <CommandGroup>
                      <AnimatePresence mode="popLayout">
                        {filteredLocations.map((location, index) => (
                          <motion.div
                            key={location.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{
                              duration: 0.15,
                              delay: index * 0.02,
                              ease: "easeOut",
                            }}
                          >
                            <CommandItem
                              value={location.name}
                              onSelect={() => {
                                onValueChange(location.id);
                                setOpen(false);
                                setSearchValue("");
                              }}
                              className="cursor-pointer"
                            >
                              <motion.div
                                initial={false}
                                animate={{
                                  scale: location.id === value ? 1 : 0,
                                  opacity: location.id === value ? 1 : 0,
                                }}
                                transition={{ duration: 0.15 }}
                              >
                                <Check className="mr-2 h-4 w-4" />
                              </motion.div>
                              <span className="truncate">
                                {location.name
                                  .split(" ")
                                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                  .join(" ")}
                              </span>

                            </CommandItem>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </motion.div>
            </PopoverContent>
          )}
        </AnimatePresence>
      </Popover>
    </div>
  );
}
