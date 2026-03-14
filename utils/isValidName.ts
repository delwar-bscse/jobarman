  export function isValidFullName(name: string) {
    // Trim whitespace and split by one or more spaces
    const parts = name.trim().split(/\s+/);

    // Check if we have at least two name components
    return parts.length >= 2 && parts[0] !== "";
  }