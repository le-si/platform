export type DateTime = Date;
export namespace DateTime {
  export const formatted = (dateTime: DateTime) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    return new Intl.DateTimeFormat(window.navigator.language, options).format(
      dateTime.valueOf()
    );
  };
}
