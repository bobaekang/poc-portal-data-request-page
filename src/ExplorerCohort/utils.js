/**
 * @return {ExplorerCohort}
 */
export function createEmptyCohort() {
  return {
    name: '',
    description: '',
    filters: {},
  };
}

/**
 * @param {ExplorerFilters} filters
 */
export function stringifyFilters(filters) {
  if (Object.keys(filters).length == 0) return '';

  let filterStr = '';
  for (const [key, value] of Object.entries(filters)) {
    filterStr += `* ${capitalizeFirstLetter(key)}\n`;
    if (value.hasOwnProperty('selectedValues'))
      for (const selected of value.selectedValues)
        filterStr += `\t- '${selected}'\n`;
    else
      filterStr += `\t- from: ${value.lowerBound}\n\t- to: ${value.upperBound}\n`;
  }

  return filterStr;
}

function capitalizeFirstLetter(str) {
  const res = str.replace(/_|\./gi, ' ');
  return res.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );
}
