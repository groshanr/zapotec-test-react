/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { AssignmentTurnedInRounded, ChatRounded } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  ListProps,
} from "@mui/joy";
import { ReactNode, memo } from "react";
import { Link, useMatch } from "react-router-dom";

export const Navigation = memo(function Navigation(
  props: NavigationProps,
): JSX.Element {
  const { sx, ...other } = props;

  return (
    <List
      sx={{ "--ListItem-radius": "4px", ...sx }}
      size="sm"
      role="navigation"
      orientation="horizontal"
      {...other}
    >
      <NavItem
        path="/about"
        label="About"
        icon={<AssignmentTurnedInRounded />}
      />
      <NavItem path="/resources" label="Resources" icon={<ChatRounded />} />
      <NavItem path="/contact" label="Contact" icon={<ChatRounded />} />
    </List>
  );
});

function NavItem(props: NavItemProps): JSX.Element {
  return (
    <ListItem>
      <ListItemButton
        component={Link}
        selected={!!useMatch(props.path)}
        to={props.path}
        aria-current="page"
      >
        <ListItemDecorator children={props.icon} />
        <ListItemContent>{props.label}</ListItemContent>
      </ListItemButton>
    </ListItem>
  );
}

type NavigationProps = Omit<ListProps, "children">;
type NavItemProps = {
  path: string;
  label: string;
  icon: ReactNode;
};
