import React from "react";
import AccountIcon from "../../assets/icons/account.svg";
import AddDateIcon from "../../assets/icons/add_date.svg";
import AllResourcesIcon from "../../assets/icons/all_resources.svg";
import ApiIcon from "../../assets/icons/api.svg";
import BooleanIcon from "../../assets/icons/boolean.svg"
import ContactIcon from "../../assets/icons/contact.svg";
import HierarchyIcon from "../../assets/icons/hierarchy.svg";
import MasterRecordIcon from "../../assets/icons/master_record.svg";
import ModifiedIcon from "../../assets/icons/modified.svg";
import DefaultIcon from "../../assets/icons/default.svg";


const Icon = ({ name, ...props }) => {
  const iconTypes = {
  account: AccountIcon,
  addDate: AddDateIcon,
  allResources: AllResourcesIcon,
  api: ApiIcon,
  boolean: BooleanIcon,
  contact: ContactIcon,
  hierarchy: HierarchyIcon,
  masterRecord: MasterRecordIcon,
  modified: ModifiedIcon,
  default: DefaultIcon
};

  const IconSvg = iconTypes[name] ?? iconTypes.default;
  return <IconSvg {...props} />;
};

export default Icon;