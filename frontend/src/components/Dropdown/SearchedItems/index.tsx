import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import { SearchDropdownPanel } from './SearchDropdownPanel';
import { useDebounced } from '../../../hooks/useDebounced';
import { Bounds, Coords, SearchedLocationType } from '../../../types';
import { useOutsideClick } from '../../../hooks/useOutsideClick';
import { firestoreGeoDataService } from '../../../firebase/firestore/firestoreServices/firestoreGeoDataService';

type Props = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onSearchHandler: (value: string) => Promise<SearchedLocationType[]>;
  onSearchedItemClicked?: (item: SearchedLocationType) => void;
  focus?: boolean;
  setBounds?: (bounds: Bounds) => void;
  searchRef?: React.RefObject<HTMLDivElement>;
  setLocation?: (bounds: Coords) => void;
};

export const SearchedItems: FC<Props> = ({
  value,
  onSearchHandler,
  setValue,
  onSearchedItemClicked,
  focus = true,
  setBounds,
  searchRef,
  setLocation,
}) => {
  const [items, setItems] = useState([]);
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
    if (debouncedValue?.length === 0) {
      setItems([]);
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (debouncedValue?.length >= 2 && focus) {
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

  useOutsideClick(() => setOpen(false), searchRef);

  if (!open) {
    return null;
  }

  return (
    <SearchDropdownPanel
      loading={loading}
      onItemClick={async (item) => {
        clickedValue.current = true;
        setItems([]);
        setOpen(false);
        setValue(item.name);
        if (item.bounds && setBounds) {
          setBounds(item.bounds);
        }
        if (item.geonameRef && setLocation) {
          const loc = await firestoreGeoDataService.getGeonameById(item.geonameRef);
          if (loc.coords) {
            setLocation(loc.coords);
          }
        }
        if (onSearchedItemClicked) {
          onSearchedItemClicked(item);
        }
      }}
      items={items}
    />
  );
};
