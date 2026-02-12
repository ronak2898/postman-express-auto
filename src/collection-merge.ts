type PostmanItem = {
  name: string;
  item?: PostmanItem[];
  request?: unknown;
};

function isFolder(item: PostmanItem): boolean {
  return Array.isArray(item.item);
}

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

function itemsMatch(a: PostmanItem, b: PostmanItem): boolean {
  return a.name === b.name;
}

function mergeItems(targetItems: PostmanItem[], sourceItems: PostmanItem[]): void {
  for (const sourceItem of sourceItems) {
    if (isFolder(sourceItem)) {
      const targetFolder = targetItems.find(
        item => isFolder(item) && item.name === sourceItem.name
      );

      if (!targetFolder) {
        targetItems.push(deepClone(sourceItem));
        continue;
      }

      mergeItems(targetFolder.item || [], sourceItem.item || []);
      continue;
    }

    const exists = targetItems.some(
      item => !isFolder(item) && itemsMatch(item, sourceItem)
    );

    if (!exists) {
      targetItems.push(deepClone(sourceItem));
    }
  }
}

export function mergeCollections(existing: any, generated: any): any {
  if (!existing || !generated) return generated;
  if (!Array.isArray(existing.item) || !Array.isArray(generated.item)) {
    return generated;
  }

  const merged = deepClone(existing);
  mergeItems(merged.item, generated.item);
  return merged;
}
