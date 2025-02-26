export const SECURITY_LEVELS = {
  1: {
    label: "Level 1",
    color: "bg-green-100 dark:bg-green-900/50",
    borderColor: "border-green-300 dark:border-green-700",
  },
  2: {
    label: "Level 2",
    color: "bg-blue-100 dark:bg-blue-900/50",
    borderColor: "border-blue-300 dark:border-blue-700",
  },
  3: {
    label: "Level 3",
    color: "bg-blue-200 dark:bg-blue-800/50",
    borderColor: "border-blue-400 dark:border-blue-600",
  },
  4: {
    label: "Level 4",
    color: "bg-red-100 dark:bg-red-900/50",
    borderColor: "border-red-300 dark:border-red-700",
  },
  5: {
    label: "Level 5",
    color: "bg-red-200 dark:bg-red-800/50",
    borderColor: "border-red-400 dark:border-red-600",
  },
};

export const AUTHORIZATION_LEVELS = {
  T: {
    label: "Top Secret",
    color: "text-red-600 dark:text-red-400",
    badge: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  },
  S: {
    label: "Secret",
    color: "text-orange-600 dark:text-orange-400",
    badge:
      "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  },
  C: {
    label: "Confidential",
    color: "text-yellow-600 dark:text-yellow-400",
    badge:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  },
  R: {
    label: "Restricted",
    color: "text-blue-600 dark:text-blue-400",
    badge: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  },
  U: {
    label: "Unclassified",
    color: "text-green-600 dark:text-green-400",
    badge: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
};
