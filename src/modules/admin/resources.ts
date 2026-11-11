import { blogResources } from "../blog/resources";
import { crmResources } from "../crm/resources";
import { travelResources } from "../travel/resources";
import { supportResources } from "../support/resources";
import { settingsResources } from "../settings/resources";
export const resources = {
  ...blogResources,
  ...crmResources,
  ...travelResources,
  ...supportResources,
  ...settingsResources,
};
