/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Container, Typography } from "@mui/joy";
import { usePageEffect } from "../core/page";

export const Component = function Home(): JSX.Element {
  usePageEffect({ title: "Home" });

  return (
    <Container sx={{ py: 2 }}>
      <Typography level="h2" gutterBottom>
        Home
        More text
      </Typography>
      <Typography>Coming soon...</Typography>
    </Container>
  );
};
