export function paginate(items, pageSize, pageNumber) {
  const startIndex = pageSize * (pageNumber - 1);
  return items.slice(startIndex, startIndex + pageSize);
}
