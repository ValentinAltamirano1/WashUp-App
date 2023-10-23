import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function ServiceCard({ title, description, image }) {
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="Service Image"
        height="140"
        image={image}
      />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        {showDescription ? (
          <>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
            <Button onClick={toggleDescription}>Ver menos</Button>
          </>
        ) : (
          <Button onClick={toggleDescription}>Ver más</Button>
        )}
      </CardContent>
    </Card>
  );
}

