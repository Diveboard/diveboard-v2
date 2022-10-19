import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import { SearchDropdownPanel } from './SearchDropdownPanel';
import { useDebounced } from '../../../hooks/useDebounced';

type Props = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onSearchHandler: (value: string) => Promise<{ id: string | number, name: string }[]>;
  onSearchedItemClicked?: (item: { id: string | number, name: string }) => void;
};

export const SearchedItems: FC<Props> = ({
  value,
  onSearchHandler,
  setValue,
  onSearchedItemClicked,
}) => {
  const [items, setItems] = useState<{ id:string | number, name:string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const clickedValue = useRef(false);

  const debouncedValue = useDebounced(value, 500);

  useEffect(() => {
    if (debouncedValue && !clickedValue.current) {
      setOpen(true);
    } else if (clickedValue.current) {
      clickedValue.current = false;
    }
    if (debouncedValue.length === 0) {
      setItems([]);
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (debouncedValue.length >= 2) {
      (async () => {
        setLoading(true);
        const res = await onSearchHandler(debouncedValue);
        if (res.length !== 0) {
          setItems(res);
        }
        setLoading(false);
      })();
    }
  }, [debouncedValue]);

  if (!open) {
    return null;
  }

  return (
    <SearchDropdownPanel
      loading={loading}
      onItemClick={(item) => {
        clickedValue.current = true;
        setItems([]);
        setOpen(false);
        setValue(item.name);
        if (onSearchedItemClicked) {
          onSearchedItemClicked(item);
        }
      }}
      items={items}
    />
  );
};
