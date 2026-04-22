import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";

interface SortActionsProps {
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export default function SortActions({ sortBy, setSortBy }: SortActionsProps) {
  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortBy(event.target.value as string);
  };

  return (
    <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
      <InputLabel>Sort By</InputLabel>
      <Select value={sortBy} onChange={handleSortChange} label="Sort By">
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="year">Year</MenuItem>
        <MenuItem value="make">Make</MenuItem>
      </Select>
    </FormControl>
  );
}