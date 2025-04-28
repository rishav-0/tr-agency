import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  GlobeAltIcon,
  MapIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";


import { Link } from "react-router";

export function MultiLevelSidebar() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className="h-[100vh] w-[250px] max-w-[20rem] p-4 ">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Travel Agency
        </Typography>
      </div>
      <List>
        <Link to="/managecountry">
          <ListItem>
            <ListItemPrefix>
              <GlobeAltIcon className="h-5 w-5" />
            </ListItemPrefix>
            Manage Country
          </ListItem>
        </Link>
        <Link to="/managestate">
          <ListItem>
            <ListItemPrefix>
              <MapIcon className="h-5 w-5" />
            </ListItemPrefix>
            Manage State
          </ListItem>
        </Link>
        <Link to="/manageplace">
          <ListItem>
            <ListItemPrefix>
              <MapPinIcon className="h-5 w-5" />
            </ListItemPrefix>
            Manage Place
          </ListItem>
        </Link>
        <Link to="/managedestination">
          <ListItem>
            <ListItemPrefix>
              <PaperAirplaneIcon className="h-5 w-5" />
            </ListItemPrefix>
            Manage Destination
          </ListItem>
        </Link>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}
