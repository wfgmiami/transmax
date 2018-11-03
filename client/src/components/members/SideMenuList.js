import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import Brokers from "@material-ui/icons/ViewList";
import SendIcon from "@material-ui/icons/Send";
import TruckIcon from "@material-ui/icons/LocalShipping";
import Drivers from "@material-ui/icons/Person";
import Financials from "@material-ui/icons/AccountBalance";
import Logout from "@material-ui/icons/NetworkLocked";
import Functions from "@material-ui/icons/Functions";
import FixedCost from "@material-ui/icons/AccountBalanceWallet";

export const viewItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="Loads Data" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Functions />
      </ListItemIcon>
      <ListItemText primary="Earnings" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Brokers />
      </ListItemIcon>
      <ListItemText primary="Brokers" />
    </ListItem>
  </div>
);

export const otherViewItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
      <ListItemText primary="Companies" />
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
    <ListItem button>
      <ListItemIcon>
        <FixedCost />
      </ListItemIcon>
      <ListItemText primary="Fixed Cost" />
    </ListItem>
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
