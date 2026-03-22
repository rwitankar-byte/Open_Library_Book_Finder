import React from 'react';

const SORT_OPTIONS = [
  { value: '', label: 'Default' },
  { value: 'title-asc', label: 'Title A → Z' },
  { value: 'title-desc', label: 'Title Z → A' },
  { value: 'year-asc', label: 'Year ↑ Oldest' },
  { value: 'year-desc', label: 'Year ↓ Newest' },
];

const DECADE_OPTIONS = [
  { value: 'all', label: 'All Decades' },
  { value: '1960s', label: '1960s' },
  { value: '1970s', label: '1970s' },
  { value: '1980s', label: '1980s' },
  { value: '1990s', label: '1990s' },
  { value: '2000s', label: '2000s' },
  { value: '2010s', label: '2010s' },
  { value: '2020s', label: '2020s' },
];

export default function SortFilterBar({
  sortOption,
  filterDecade,
  onSortChange,
  onFilterChange,
}) {
  return (
    <div className="sort-filter-bar">
      <div className="sort-filter-group">
        <label htmlFor="sort-select">Sort by</label>
        <select
          id="sort-select"
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div className="sort-filter-group">
        <label htmlFor="filter-select">Decade</label>
        <select
          id="filter-select"
          value={filterDecade}
          onChange={(e) => onFilterChange(e.target.value)}
        >
          {DECADE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
