
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface KeywordInputProps {
  keyword: string;
  setKeyword: (value: string) => void;
  searchVolume: number | string;
  setSearchVolume: (value: number) => void;
  maxSearchVolume?: number;
  className?: string;
}

const KeywordInput: React.FC<KeywordInputProps> = ({
  keyword,
  setKeyword,
  searchVolume,
  setSearchVolume,
  maxSearchVolume = 1000000,
  className = '',
}) => {
  const handleSearchVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow empty string or convert to number
    const value = e.target.value;
    
    if (value === '') {
      setSearchVolume(0);
    } else {
      // Remove all non-numeric characters (including commas) before parsing
      const numericValue = parseInt(value.replace(/[^\d]/g, ''), 10);
      
      // Check if it's a valid number and below the max search volume
      if (!isNaN(numericValue)) {
        if (numericValue <= maxSearchVolume) {
          setSearchVolume(numericValue);
        } else {
          // If value exceeds max, set to max
          setSearchVolume(maxSearchVolume);
        }
      }
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="space-y-2 animate-slide-up">
        <Label htmlFor="keyword" className="text-sm font-medium">
          Keyword
        </Label>
        <Input
          id="keyword"
          placeholder="Enter target keyword..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="input-transition focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="space-y-2 animate-slide-up" style={{ animationDelay: '100ms' }}>
        <Label htmlFor="search-volume" className="text-sm font-medium">
          Monthly Search Volume
        </Label>
        <Input
          id="search-volume"
          type="text"
          placeholder={`e.g. 1000 (max: ${maxSearchVolume.toLocaleString()})`}
          value={typeof searchVolume === 'number' ? searchVolume.toLocaleString() : searchVolume}
          onChange={handleSearchVolumeChange}
          className="input-transition focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </div>
  );
};

export default KeywordInput;
