import * as React from "react";
import { GlobalSearch } from "~/GlobalSearch";
import { Theme } from "~/Theme";

export function OpenButton() {
  const { open } = GlobalSearch.Modal.useState();
  const openModal = React.useCallback(() => open(), [open]);

  return (
    <Theme.IconButton
      tooltip="Search the site"
      tooltipPlacement="bottom"
      tooltipDelay={1_000}
      onClick={openModal}
    >
      <Theme.Icon.Search />
    </Theme.IconButton>
  );
}
