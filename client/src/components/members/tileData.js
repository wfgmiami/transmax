import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import Brokers from "@material-ui/icons/ViewList";
// import StarIcon from "@material-ui/icons/Star";
import SendIcon from "@material-ui/icons/Send";
import TruckIcon from "@material-ui/icons/LocalShipping";
import Drivers from "@material-ui/icons/Person";
import Financials from "@material-ui/icons/AccountBalance";
import Logout from "@material-ui/icons/NetworkLocked";

export const viewItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="Trips" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
      <ListItemText primary="Companies" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Brokers />
      </ListItemIcon>
      <ListItemText primary="Brokers" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <TruckIcon />
      </ListItemIcon>
      <ListItemText primary="Trucks" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Drivers />
      </ListItemIcon>
      <ListItemText primary="Drivers" />
    </ListItem>
  </div>
);

export const otherViewItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <Financials />
      </ListItemIcon>
      <ListItemText primary="Financials" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Logout />
      </ListItemIcon>
      <ListItemText primary="Log Out" />
    </ListItem>
  </div>
);
