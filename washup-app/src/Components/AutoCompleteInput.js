
import React, { useState, useEffect, useRef } from 'react';

function AutocompleteInput({ onPlaceSelected }) {
  const [query, setQuery] = useState('');
  const autoCompleteRef = useRef(null);
  
  useEffect(() => {
    const autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      { types: ['geocode'] }
    );

    autoComplete.addListener('place_changed', () => {
      const place = autoComplete.getPlace();
      onPlaceSelected(place);
    });
  }, [onPlaceSelected]);

  return (
    <input
      ref={autoCompleteRef}
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Ingresa una dirección"
    />
  );
}

export default AutocompleteInput;