// Utility functions for working with assignees

import { Assignee } from '../data/assignmentsData';

/**
 * Get initials from a person's name
 * @param name - Full name of the person
 * @returns Initials (up to 2 characters)
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2) // Take only first 2 initials
    .join('');
}

/**
 * Generate a consistent color for an assignee based on their name
 * @param name - Full name of the person
 * @returns Hex color string
 */
export function getAssigneeColor(name: string): string {
  const colors = [
    '#1976d2', // Blue
    '#388e3c', // Green
    '#f57c00', // Orange
    '#7b1fa2', // Purple
    '#c2185b', // Pink
    '#00796b', // Teal
    '#5d4037', // Brown
    '#455a64', // Blue Grey
    '#e64a19', // Deep Orange
    '#303f9f', // Indigo
  ];
  
  // Create a simple hash from the name to consistently assign colors
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
}

/**
 * Get tooltip text for assignee avatars
 * @param assignees - Array of assignees
 * @param maxDisplay - Maximum number of names to show in tooltip
 * @returns Formatted tooltip text
 */
export function getAssigneeTooltip(assignees: Assignee[], maxDisplay: number = 4): string {
  if (assignees.length === 0) return 'No assignees';
  
  const displayNames = assignees.slice(0, maxDisplay).map(a => a.name);
  const remainingCount = assignees.length - maxDisplay;
  
  if (remainingCount > 0) {
    return `${displayNames.join(', ')} and ${remainingCount} more`;
  }
  
  return displayNames.join(', ');
}
