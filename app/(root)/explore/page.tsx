"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { MapPin, Search, Filter, X, Info } from "lucide-react";
import { heritageLocations } from "@/constants/heritageLocations";
import { HeritageLocation, MapViewState } from "@/types/heritage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LoaderSpinner from "@/components/LoaderSpinner";

// Dynamically import the Map component to avoid SSR issues with Leaflet
const HeritageMap = dynamic(() => import("@/components/Explore/HeritageMap"), {
  ssr: false,
  loading: () => <div className="h-[600px] bg-black-1/30 rounded-xl flex items-center justify-center"><LoaderSpinner /></div>
});

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState<HeritageLocation[]>(heritageLocations);
  const [selectedLocation, setSelectedLocation] = useState<HeritageLocation | null>(null);
  const [mapViewState, setMapViewState] = useState<MapViewState>({
    center: [20.5937, 78.9629], // Center of India
    zoom: 5
  });

  // Extract unique categories and states for filters
  const categories = Array.from(new Set(heritageLocations.map(loc => loc.category)));
  const states = Array.from(new Set(heritageLocations.map(loc => loc.state)));

  // Filter locations based on search query and filters
  useEffect(() => {
    let filtered = heritageLocations;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        loc => 
          loc.name.toLowerCase().includes(query) || 
          loc.description.toLowerCase().includes(query) ||
          loc.state.toLowerCase().includes(query)
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(loc => loc.category === selectedCategory);
    }

    if (selectedState) {
      filtered = filtered.filter(loc => loc.state === selectedState);
    }

    setFilteredLocations(filtered);
  }, [searchQuery, selectedCategory, selectedState]);

  // Handle location selection
  const handleLocationSelect = (location: HeritageLocation) => {
    setSelectedLocation(location);
    setMapViewState({
      center: [location.location.lat, location.location.lng],
      zoom: 12
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSelectedState(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-white-1/10 to-white-1/5 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white-1/10 relative overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-1/10 to-transparent opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white-1 mb-2 flex items-center gap-3">
            <MapPin size={32} className="text-orange-1" />
            Explore Indian Heritage
          </h1>
          <p className="text-white-2">
            Discover the rich cultural and historical landmarks of India
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white-3" size={18} />
            <Input
              type="text"
              placeholder="Search heritage sites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-black-1/30 border-gray-800 focus-visible:ring-orange-1/50"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white-3 hover:text-white-1"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <Button 
            variant="outline" 
            className={cn(
              "border-gray-800 text-white-2 hover:text-white-1 hover:bg-black-1/50",
              showFilters && "bg-black-1/50 text-white-1 border-orange-1/50"
            )}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} className="mr-2" />
            Filters
            {(selectedCategory || selectedState) && (
              <span className="ml-2 bg-orange-1 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {(selectedCategory ? 1 : 0) + (selectedState ? 1 : 0)}
              </span>
            )}
          </Button>
        </div>

        {/* Filter options */}
        {showFilters && (
          <div className="bg-black-1/30 border border-gray-800 rounded-xl p-4 mb-4 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <h3 className="text-white-2 mb-2 text-sm">Category</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                      className={cn(
                        "px-3 py-1 rounded-full text-sm",
                        selectedCategory === category
                          ? "bg-orange-1 text-white"
                          : "bg-black-1/50 text-white-2 hover:bg-black-1/70 border border-gray-800"
                      )}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-white-2 mb-2 text-sm">State</h3>
                <div className="flex flex-wrap gap-2">
                  {states.map(state => (
                    <button
                      key={state}
                      onClick={() => setSelectedState(selectedState === state ? null : state)}
                      className={cn(
                        "px-3 py-1 rounded-full text-sm",
                        selectedState === state
                          ? "bg-orange-1 text-white"
                          : "bg-black-1/50 text-white-2 hover:bg-black-1/70 border border-gray-800"
                      )}
                    >
                      {state}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="text-white-3 hover:text-white-1"
              >
                Clear All
              </Button>
            </div>
          </div>
        )}

        {/* Results count */}
        <div className="text-white-3 text-sm flex items-center">
          <Info size={14} className="mr-2" />
          {filteredLocations.length === 0 
            ? "No heritage sites found. Try adjusting your filters." 
            : `Showing ${filteredLocations.length} heritage site${filteredLocations.length !== 1 ? 's' : ''}`}
        </div>
      </div>

      {/* Main content: Map and Locations List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Locations List */}
        <div className="lg:col-span-1 h-[600px] overflow-y-auto pr-2 bg-black-1/10 rounded-xl p-4 border border-white-1/10">
          {filteredLocations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <MapPin size={48} className="text-white-3 mb-4" />
              <h3 className="text-white-1 text-lg font-medium mb-2">No locations found</h3>
              <p className="text-white-3 mb-4">Try adjusting your search or filters</p>
              <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredLocations.map(location => (
                <div 
                  key={location.id}
                  className={cn(
                    "bg-black-1/30 rounded-lg p-4 cursor-pointer transition-all border",
                    selectedLocation?.id === location.id 
                      ? "border-orange-1 bg-black-1/50" 
                      : "border-gray-800 hover:border-white-3"
                  )}
                  onClick={() => handleLocationSelect(location)}
                >
                  <h3 className="text-white-1 font-medium flex items-center">
                    <MapPin size={16} className={cn(
                      "mr-2",
                      selectedLocation?.id === location.id ? "text-orange-1" : "text-white-3"
                    )} />
                    {location.name}
                  </h3>
                  <p className="text-white-3 text-sm mt-1">{location.state}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-xs bg-black-1/50 text-white-2 px-2 py-1 rounded-full">
                      {location.category}
                    </span>
                    {location.unesco && (
                      <span className="text-xs bg-orange-1/20 text-orange-1 px-2 py-1 rounded-full ml-2">
                        UNESCO
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Map */}
        <div className="lg:col-span-2">
          <HeritageMap 
            locations={filteredLocations}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            viewState={mapViewState}
            setViewState={setMapViewState}
          />
        </div>
      </div>

      {/* Selected Location Details */}
      {selectedLocation && (
        <div className="mt-8 bg-black-1/30 border border-white-1/10 rounded-xl p-6 animate-in fade-in duration-300">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-white-1">{selectedLocation.name}</h2>
              <p className="text-white-3">{selectedLocation.state}, India</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setSelectedLocation(null)}
              className="text-white-3 hover:text-white-1"
            >
              <X size={20} />
            </Button>
          </div>
          
          <p className="mt-4 text-white-2">{selectedLocation.description}</p>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {selectedLocation.yearBuilt && (
              <div className="bg-black-1/20 p-3 rounded-lg">
                <h4 className="text-white-3 text-sm">Year Built</h4>
                <p className="text-white-1">{selectedLocation.yearBuilt}</p>
              </div>
            )}
            {selectedLocation.visitingHours && (
              <div className="bg-black-1/20 p-3 rounded-lg">
                <h4 className="text-white-3 text-sm">Visiting Hours</h4>
                <p className="text-white-1">{selectedLocation.visitingHours}</p>
              </div>
            )}
            {selectedLocation.entryFee && (
              <div className="bg-black-1/20 p-3 rounded-lg">
                <h4 className="text-white-3 text-sm">Entry Fee</h4>
                <p className="text-white-1">{selectedLocation.entryFee}</p>
              </div>
            )}
            <div className="bg-black-1/20 p-3 rounded-lg">
              <h4 className="text-white-3 text-sm">Category</h4>
              <p className="text-white-1">{selectedLocation.category}</p>
            </div>
          </div>
          
          {selectedLocation.website && (
            <div className="mt-6">
              <Button 
                variant="outline" 
                className="border-orange-1/50 text-orange-1 hover:bg-orange-1/10"
                onClick={() => window.open(selectedLocation.website, '_blank')}
              >
                Visit Official Website
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExplorePage;