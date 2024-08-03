import moment from "moment";

export const convertTimestamp = (timestamp: number): string => {
  const date = moment.unix(timestamp);

  return date.format("DD-MM-YYYY hh:mm A");
};
