/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { AspectRatio, Box, Card, CardOverflow, Container, Typography } from "@mui/joy";
import CardMedia from '@mui/material/CardMedia';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../core/firebase";
import { usePageEffect } from "../core/page";

async function getLinks(){
  const querySnapshot = await getDocs(collection(db, 'imagelinks'));
  // @ts-ignore: Object is possibly 'null'.
  const links = []
  // @ts-ignore: Object is possibly 'null'.
  querySnapshot.forEach((doc) => {
    if(doc.data().link.includes('.jpg')){
      links.push(
        <Card sx={{ display: 'flex'}}>
          <CardOverflow >
            <AspectRatio  objectFit='contain'>
              <CardMedia
                src= {doc.data().link}
                component= 'img'
              />
            </AspectRatio>
          </CardOverflow>
        </Card>
      )
    }
    else if(doc.data().link.includes('.pdf')){
      links.push(
        <Card sx={{ display: 'flex'}}>
          <CardOverflow >
            <AspectRatio>
              <CardMedia
                src= {doc.data().link}
                component= 'iframe'
              />
            </AspectRatio>
          </CardOverflow>
        </Card>
      )
    }
    console.log(doc.id, " => ", doc.data().link);
  });
  // @ts-ignore: Object is possibly 'null'.
  return links
 }

const output = await getLinks()

export const Component = function Resources(): JSX.Element {
  usePageEffect({ title: "Resources" });

  return (
    <Container sx={{ py: 2 }}>
      <Typography level="h2" gutterBottom>
        Resources
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: 'repeat(3, 2fr)',
          gridTemplateRows: 'repeat(3, 2fr)',
          gap: 2
        }}
      >
      {output}
      </Box>
    </Container>
  );
};

// # <Card sx={{ gridArea: "1 / 1 / 2 / -1" }}>
// <CardContent sx={{ minHeight: 300 }}>
//   <Typography level="h3">Card title</Typography>
//   <Typography>Card content</Typography>
// </CardContent>
// </Card>

// <Card>
// <CardContent sx={{ minHeight: 150 }}>
//   <Typography level="h3">Card title</Typography>
//   <Typography>Card content</Typography>
// </CardContent>
// </Card>

// <Card>
// <CardContent sx={{ minHeight: 150 }}>
//   <Typography level="h3">Card title</Typography>
//   <Typography>Card content</Typography>
// </CardContent>
// </Card>
