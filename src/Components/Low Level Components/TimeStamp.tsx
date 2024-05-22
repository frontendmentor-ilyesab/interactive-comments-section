function TimeStamp({ createdAt }: { createdAt: string }) {
  const createdAtDate = new Date(createdAt);
  const currentDate = new Date();
  const dateObject: { [key: string]: number } = {
    year: currentDate.getFullYear() - createdAtDate.getFullYear(),
    month: currentDate.getMonth() - createdAtDate.getMonth(),
    day: currentDate.getDate() - createdAtDate.getDate(),
    hour: currentDate.getHours() - createdAtDate.getHours(),
    minute: currentDate.getMinutes() - createdAtDate.getMinutes(),
    second: currentDate.getSeconds() - createdAtDate.getSeconds(),
  };

  let timestamp;
  let timeLabel;
  let timeValue;
  for (const key in dateObject) {
    if (dateObject[key] > 0) {
      if (key === "day" && dateObject[key] >= 7) {
        timeLabel = "week";
        timeValue = Math.floor(dateObject[key] / 7);
      } else {
        timeLabel = key;
        timeValue = dateObject[key];
      }
      timestamp = `${timeValue} ${
        timeValue > 1 ? timeLabel + "s" : timeLabel
      } ago`;
      break;
    }
  }

  if (!timeValue) {
    timestamp = "Now";
  }

  return <span className="comment__createdAt">{timestamp}</span>;
}

export default TimeStamp;
