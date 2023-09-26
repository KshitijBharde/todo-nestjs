export type MonthlyMetrics = {
  date: string;
  metrics: {
    open_tasks: number;
    inprogress_tasks: number;
    completed_tasks: number;
  };
};
