import {
  useEffect, useState,
} from 'react';

export default function usePlacesPredictions(input: string): string[] {
  const [predictions, setPredictions] = useState([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let autocomplete: any;
  function getPlacePredictions(): void {
    autocomplete.getPlacePredictions(
      { input },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (prediction: any) => {
        setPredictions(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          prediction?.map((predict: any) => predict.description),
        );
      },
    );
  }

  useEffect(() => {
    if (window && window.google) {
      if (!autocomplete) {
        autocomplete = new window.google.maps.places.AutocompleteService();
      }
    }
  }, []);
  useEffect(() => {
    (autocomplete && input.length > 2) && getPlacePredictions();
  }, [input]);

  return predictions;
}
