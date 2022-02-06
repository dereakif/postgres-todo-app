import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const timeAgo = (timestamp) => dayjs(timestamp).fromNow();
