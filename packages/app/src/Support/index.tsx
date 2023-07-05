import * as ReactQuery from "@tanstack/react-query";

import { Device } from "~/Device";
import { User } from "~/User";

import { Page } from "./Page";

export declare namespace Support {
  export { Page };
}

export namespace Support {
  Support.Page = Page;

  export type formData = {
    name: string | undefined;
    email: string | undefined;
    subject: string;
    description: string;
    type: string;
    priority: number;
    status: number;
    source: number;
  };

  export const useGetTicketFields = () =>
    ReactQuery.useQuery({
      queryKey: ["ticketFields"],

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryFn: async (): Promise<any> => {
        // Make a get request to the autocode interface to get ticket fields
        const fields = await fetch(
          "https://freshdesk.stability.workers.dev/ticketfields",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (fields instanceof Error) throw fields;

        // If the request is successful, return the fields number
        if (fields.status === 200) {
          return fields.json();
        }

        // If the request fails, throw an error
        throw new Error(`Failed to get fields: ${fields.status}`);
      },

      // Cache the fields for 10 hours
      cacheTime: 36000000,

      // Refetch the fields every 24 hours
      staleTime: 86400000,
    });

  export const useSubmitTicket = (formData: formData) => {
    const deviceInfo = Device.getInfo();
    const { user } = User.use();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return ReactQuery.useMutation(async (): Promise<any> => {
      //regex check formData fields for empty strings
      const validEmailRegex = new RegExp(
        '^(?:(?:[^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,})$'
      );

      if (
        formData?.name?.length === 0 ||
        formData.name === undefined ||
        formData.name.trim().length === 0
      ) {
        throw new Error("Name is required");
      }
      if (
        !validEmailRegex.test(formData?.email as string) ||
        formData.email === undefined
      ) {
        throw new Error("Valid Email is required");
      }
      if (formData.subject.length === 0) {
        throw new Error("Subject is required");
      }
      if (formData.description.length === 0) {
        throw new Error("Message is required");
      }

      // Make a post request to the autocode interface to create a new ticket
      const ticket = await fetch(
        "https://freshdesk.stability.workers.dev/tickets",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            description: formData.description,
            type: formData.type,
            priority: formData.priority,
            status: formData.status,
            source: formData.source,
            custom_fields: {
              cf_os: deviceInfo.operatingSystem,
              cf_web_browser: deviceInfo.browserName,
              cf_device_type: deviceInfo.deviceType,
              cf_org_id: user?.organizationID,
              cf_build: "platform",
            },
          }),
        }
      );

      if (ticket instanceof Error) throw ticket;

      // If the request is successful, return the ticket number
      if (ticket.status === 200) {
        return ticket.json();
      }
      // If the request fails, throw an error
      throw new Error(`Failed to submit ticket: ${ticket.status}`);
    });
  };
}
