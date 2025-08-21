import type { ChangeEvent } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar = ({ placeholder = "Search...", value, onChange }: SearchBarProps) => {
  return (
    <div className="flex items-center w-full max-w-3xl bg-[#111] border border-gray-800 rounded-xl px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-green-500">
      <Search className="text-gray-400 w-5 h-5 mr-3" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent text-gray-200 placeholder-gray-500 focus:outline-none"
      />
    </div>
  );
};
