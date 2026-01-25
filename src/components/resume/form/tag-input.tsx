import { useState, useRef, type KeyboardEvent } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import X from 'lucide-react/dist/esm/icons/x';

type TagInputProps = {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
};

export function TagInput({ value, onChange, placeholder, disabled }: TagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      // Remove last tag on backspace when input is empty
      removeTag(value.length - 1);
    }
  };

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    // Prevent duplicates
    if (value.includes(trimmed)) {
      setInputValue('');
      return;
    }

    onChange([...value, trimmed]);
    setInputValue('');
  };

  const removeTag = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div
      className="min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex flex-wrap gap-2">
        {value.map((tag, index) => (
          <Badge key={index} variant="secondary" className="gap-1">
            {tag}
            {!disabled && (
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="ml-1 rounded-full hover:bg-secondary-foreground/20"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </Badge>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder={value.length === 0 ? placeholder : ''}
          disabled={disabled}
          className="flex-1 min-w-[120px] bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    </div>
  );
}
